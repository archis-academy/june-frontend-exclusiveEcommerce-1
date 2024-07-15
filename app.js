async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}

const productsList = document.getElementById("products-list");

let start = 0;
let end = 4;

const nextProductsBtn = () => {
  if (end >= 20) {
    start = 0;
    end = 4;
  } else {
    start += 4;
    end += 4;
  }
  productsList.innerHTML = "";
  productsRender(start, end);
};

const prevProductsBtn = () => {
  if (start <= 0) {
    start = 16;
    end = 20;
  } else {
    start -= 4;
    end -= 4;
  }
  productsList.innerHTML = "";
  productsRender(start, end);
};

async function productsRender(start, end) {
  const products = await getProducts();
  console.log(products);

  const selectedProducts = products.slice(start, end);

  function indirimYap(fiyat, indirimYuzdesi) {
    return fiyat - (fiyat * indirimYuzdesi) / 100;
  }

  function starsRating(rating) {
    const maxStar = Math.floor(rating);
    const emptyStar = 5 - maxStar;
    const maxStarimg = '<i class="fas fa-star"></i>';
    const emptyStarimg = '<i class="far fa-star"></i>';
    return maxStarimg.repeat(maxStar) + emptyStarimg.repeat(emptyStar);
  }

  selectedProducts.forEach((product) => {
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
    <div>
   <div>${starsRating(product.rating.rate)}</div>
    <div>(${product.rating.count})</div>
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
