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
      <div onclick = "toggleWhislist(${product.id})" >
      <svg  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="white"/>
<path d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </div>
      <div class="img-box" onmouseenter="showAddToCart(this)" onmouseleave="hideAddToCart(this)">
        <img class="products-images" src="${product.image}" alt="${
      product.title
    }">
        <button onclick="addCartProduct(${product.id})" id="cart-${
      product.id
    }" class="add-to-cart">Add To Cart</button>
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

function showAddToCart(show) {
  show.querySelector(".add-to-cart").style.display = "block";
}

function hideAddToCart(hidden) {
  hidden.querySelector(".add-to-cart").style.display = "none";
}

async function toggleWhislist(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  if (wishlistProducts && !wishlistProducts.includes(productId)) {
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productId])
    );
  } else {
    const newWishlistProducts = wishlistProducts.filter(
      (productWishId) => productWishId !== productId
    );
    console.log(wishlistProducts);
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify(newWishlistProducts)
    );
  }
}

async function addCartProduct(productId) {
  const products = await getProducts();
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const product = products.find((product) => product.id == productId);
  const isProductInCart = cartProducts.some(
    (product) => product.id == productId
  );
  if (!isProductInCart) {
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, product])
    );
    document.getElementById(`cart-${productId}`).innerHTML = "Go To Cart";
  } else {
    alert("Ürün zaten sepetinizde!");
  }
}
