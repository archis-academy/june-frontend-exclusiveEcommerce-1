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

  bestSellingProducts.map((bsproducts) => {
    return `<div class="homepage-best-selling-products-container-goods">
              <div class="homepage-best-selling-products-container-goods-img">
                <img src="${product.image}" alt="${product.title}">
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
                  <h3 class="base-price">$${product.price}</h3>
                </div>
                <div class="goods-rating-container">
                  <i class="fa-solid fa-star fa-xs" style="color: #FFD43B;"></i>
                  <div class="transparent-stars-container"></div>
                  <h4 class="goods-amount">(${product.rating.count})</h4>
                </div>
              </div>
            </div>`
  })
}

function discount(all_products) {
  return all_products.price - (all_products.price * 30) / 100;
}

function ratingMaker(star_rating) {
  return Math.ceil((star_rating / 5) * 100);
}

function hideStars(product) {
  const starRatio = ratingMaker(product.rating.rate);
  return starRatio;
}

function getStarRating(rating) {
  const fullStar = '<i class="fas fa-star"></i>';
  const emptyStar = '<i class="far fa-star"></i>';
  const maxStars = 5;
  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = maxStars - fullStarsCount;
  return fullStar.repeat(fullStarsCount) + emptyStar.repeat(emptyStarsCount);
}