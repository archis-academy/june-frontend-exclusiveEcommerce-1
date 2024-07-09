async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}

const prevProductsBtn = document.getElementById("prev-products");
const nextProductsBtn = document.getElementById("next-products");
const productsList = document.getElementById("products-list");

let start = 0;
let end = 4;

nextProductsBtn.addEventListener("click", () => {
  if (end >= 20) {
    start = 0;
    end = 4;
  } else {
    start += 4;
    end += 4;
  }
  productsList.innerHTML = "";
  productsRender(start, end);
});

prevProductsBtn.addEventListener("click", () => {
  if (start <= 0) {
    start = 16;
    end = 20;
  } else {
    start -= 4;
    end -= 4;
  }
  productsList.innerHTML = "";
  productsRender(start, end);
});

async function productsRender(start, end) {
  const products = await getProducts();
  console.log(products);

  const selectedProducts = products.slice(start, end);

  function indirimYap(fiyat, indirimYuzdesi) {
    return fiyat - (fiyat * indirimYuzdesi) / 100;
  }

  selectedProducts.forEach((product) => {
    let starCounter = 0;
    if (product.rating.rate > 4) {
      starCounter = 5;
    } else if (product.rating.rate > 3) {
      starCounter = 4;
    } else if (product.rating.rate > 2) {
      starCounter = 3;
    } else if (product.rating.rate > 1) {
      starCounter = 2;
    } else if (product.rating.rate > 0) {
      starCounter = 1;
    } else {
      starCounter = 0;
    }

    const productsCard = `
      <div class="products-kart">
      <div class="img-box">
        <img class="products-images" src="${product.image}" alt="${
      product.title
    }">
      </div>
        <div><p class="products-information">${product.title
          .substring(0, 20)
          .concat(" ...")} </p>
    </div>
    <div class="prices">
      <p class="discounted-price">${indirimYap(product.price, 20).toFixed(
        2
      )}₺</p>
      <strike class="price">${product.price.toFixed(2)}₺</strike>
    </div>
    <div class="rating">
      ${starCounter * ""}
    </div>
      </div>
    `;

    productsList.innerHTML += productsCard;
  });
}

productsRender(start, end);

function startCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 4);

  setInterval(function () {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("todays-countdown-days").innerHTML = days + " :";
    document.getElementById("todays-countdown-hours").innerHTML = hours + " :";
    document.getElementById("todays-countdown-minutes").innerHTML =
      minutes + " :";
    document.getElementById("todays-countdown-seconds").innerHTML = seconds;
  });
}

startCountdown();
