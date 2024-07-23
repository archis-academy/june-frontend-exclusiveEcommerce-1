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
let wishlistProducts = [];
let cartProducts = [];

async function productsRender() {
  try {
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
                  <div class="icon-wishlist">
                    <i class="fa-regular fa-heart" id="icon-wishlist-${product.id}" onclick="toggleItem(${product.id}, 'wishlist', allBestSellingProducts)"></i>
                    <span class="tooltip">Add to wishlist</span>
                  </div>
                  <div class="icon-cart">
                    <i class="fa-solid fa-cart-shopping" id="icon-cart-${product.id}" onclick="toggleItem(${product.id}, 'cart', allBestSellingProducts)"></i>
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
  } catch (error) {
    console.error("Couldn't render products:", error);
  }

  updateIconsState();
}

function toggleProductsView() {
  if (bestSellingProducts.length === allBestSellingProducts.length) {
    bestSellingProducts = allBestSellingProducts.slice(0, 4);
    toggleBtnText.textContent = "View All";
  } else {
    bestSellingProducts = allBestSellingProducts;
    toggleBtnText.textContent = "View Less";
  }
  productsRender();
}

function toggleItem(productId, listType, products) {
  const icon = document.getElementById(`icon-${listType}-${productId}`);
  if (!icon) return;
  const storageKey = `${listType}Products`;
  let allItems = JSON.parse(localStorage.getItem(storageKey)) || [];
  const addedProduct = products.find((product) => product.id === productId);
  if (!addedProduct) return;
  const inList = allItems.some((product) => product.id === productId);

  icon.classList.toggle('active');
  if (icon.classList.contains('active')) {
    icon.classList.remove(listType === 'wishlist' ? 'fa-regular' : 'fa-cart-shopping');
    icon.classList.add(listType === 'wishlist' ? 'fa-solid' : 'fa-check');
    icon.style.color = listType === 'wishlist' ? '#C20000' : '#1A9900';
  } else {
    icon.classList.remove(listType === 'wishlist' ? 'fa-solid' : 'fa-check');
    icon.classList.add(listType === 'wishlist' ? 'fa-regular' : 'fa-cart-shopping');
    icon.style.color = '';
  }

  if (inList) {
    allItems = allItems.filter((product) => product.id !== productId);
    alert(`Product removed from ${listType}`);
  } else {
    allItems.push(addedProduct);
    alert(`Product added to ${listType}`);
  }
  localStorage.setItem(storageKey, JSON.stringify(allItems));
}

function updateIconsState() {
  const wishlistIcons = document.querySelectorAll(".icon-wishlist i");
  const cartIcons = document.querySelectorAll(".icon-cart i");

  wishlistProducts = JSON.parse(localStorage.getItem("wishlist-products")) || [];
  cartIcons = JSON.parse(localStorage.getItem("cart-products")) || [];

  wishlistIcons.forEach((icon) => {
    const productId = icon.id.split("-")[2];
    const inWishlist = wishlistProducts.some((product) => product.id === productId);
    icon.classList.toggle("active", inWishlist);
    if (inWishlist) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "#C20000";
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = "";
    }
  });

  cartIcons.forEach((icon) => {
    const productId = icon.id.split("-")[2];
    const inCart = cartProducts.some((product) => product.id === productId);
    icon.classList.toggle("active", inCart);
    if (inCart) {
      icon.classList.remove("fa-cart-shopping");
      icon.classList.add("fa-check");
      icon.style.color = "#1A9900";
    } else {
      icon.classList.remove("fa-check");
      icon.classList.add("fa-cart-shopping");
      icon.style.color = "";
    }
  });
}

function discount(product) {
  return product.price - (product.price * 30) / 100;
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
// Best Selling Products Section End
