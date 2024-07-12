async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
}

// Best Selling Products Section Start
const bestSellingProductsContainer = document.getElementById("best-selling-products-api");
const toggleBtnText = document.getElementById("best-selling-products-btn");

let bestSellingProducts = [];
let allBestSellingProducts = [];

async function productsRender() {
  if (allBestSellingProducts.length === 0) {
    allBestSellingProducts = await getProducts();
  }

  if (bestSellingProducts.length === 0) {
    bestSellingProducts = allBestSellingProducts.slice(0, 4);
  }

  bestSellingProductsContainer.innerHTML = bestSellingProducts.map((product) => {
    return `<div class="homepage-best-selling-products-container-goods">
              <div class="homepage-best-selling-products-container-goods-img">
                <div class="homepage-best-selling-products-img-container">
                  <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="icon-heart">
                  <i class="fa-regular fa-heart fa-sm"></i>
                  <span class="tooltip">Add to wishlist</span>
                </div>
                <div class="icon-eye">
                  <i class="fas bla fa-solid fa-cart-shopping"></i>
                  <span class="tooltip">Add to cart</span>
                </div>
              </div>
              <div class="goods-info">
                <h3>${maxTitleCharacter(product.title, 28)}</h3>
                <div class="goods-price">
                  <h3>$${discount(product).toFixed(2)}</h3>
                  <h3 class="base-price"><s>$${product.price}</s></h3>
                </div>
                <div class="goods-rating-container">
                  ${generateStars(product.rating.rate)}
                  <h4 class="goods-amount">(${product.rating.count})</h4>
                </div>
              </div>
            </div>`
  })
  .join("");
}

function toggleProductsView() {
  if (bestSellingProducts.length === allBestSellingProducts.length) {
    bestSellingProducts = allBestSellingProducts.slice(0, 4);
    toggleBtnText.textContent = "View All";
  } else {
    bestSellingProducts = allBestSellingProducts;
    toggleBtnText.textContent = "View Less";
  }
}

function discount(all_products) {
  return all_products.price - (all_products.price * 30) / 100;
}

function maxTitleCharacter(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}

function generateStars(starRating) {
  const filledStars = Math.round(starRating);
  const emptyStars = 5 - filledStars;
  return `
    ${'<i class="fa-solid fa-star star filled"></i>'.repeat(filledStars)}
    ${'<i class="fa-solid fa-star star"></i>'.repeat(emptyStars)}
  `;
}

productsRender();
