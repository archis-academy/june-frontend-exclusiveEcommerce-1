async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
}

productsRender();

// Best Selling Products Section Start
const bestSellingProductsContainer = document.getElementById("best-selling-products-api");

let bestSellingProducts = [];

async function productsRender() {
  const products = await getProducts();

  for (let i = 0; i < products.length; i++) {
    bestSellingProducts[i] = products[i];
  }

  bestSellingProductsContainer.innerHTML = bestSellingProducts.map((product) => {
    return `<div class="homepage-best-selling-products-container-goods">
              <div class="homepage-best-selling-products-container-goods-img">
                <div class="homepage-best-selling-products-img-container">
                  <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="icon-heart">
                  <i class="fa-regular fa-heart fa-sm"></i>
                  <span class="tooltip">Add to favourite</span>
                </div>
                <div class="icon-eye">
                  <i class="fa-regular fa-eye fa-sm"></i>
                  <span class="tooltip">Add to wishlist</span>
                </div>
              </div>
              <div class="goods-info">
                <h3>${product.title}</h3>
                <div class="goods-price">
                  <h3>$${discount(product).toFixed(2)}</h3>
                  <h3 class="base-price"><s>$${product.price}</s></h3>
                </div>
                <div class="goods-rating-container">
                  <i class="fa-solid fa-star fa-xs" style="color: #FFD43B;"></i>
                  <div class="filled-stars-container" style="width:${hideTransStars(product)}%"></div>
                  <div class="transparent-stars-container"></div>
                  <h4 class="goods-amount">(${product.rating.count})</h4>
                </div>
              </div>
            </div>`
  })
  .join("");
}

function discount(all_products) {
  return all_products.price - (all_products.price * 30) / 100;
}

function starRatingMaker(star_rating) {
  return Math.ceil((star_rating / 5) * 100);
}

function hideTransStars(product) {
  const starRatio = starRatingMaker(product.rating.rate);
  return starRatio;
}

productsRender();
