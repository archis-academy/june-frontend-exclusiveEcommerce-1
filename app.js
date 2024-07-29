// tahir homepage explore products start
let ExpallProducts = [];
let exprostart = 0;
let exproend = 8;
const exproductsPerPage = 8;

async function getProducts() {
  if (ExpallProducts.length > 0) return ExpallProducts;

  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  ExpallProducts = productsData;
  return productsData;
}

function expupdateWishlistStorage(product, add) {
  let wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  if (add) {
    if (!wishlist.some((item) => item.id === product.id))
      wishlist.push(product);
  } else {
    wishlist = wishlist.filter((item) => item.id !== product.id);
  }
  localStorage.setItem("wishlistProducts", JSON.stringify(wishlist));
  console.log("Updated Wishlist:", wishlist); // Konsola yazdırma
}

function expupdateCartStorage(product, add) {
  let expcart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  if (add) {
    if (!expcart.some((item) => item.id === product.id)) expcart.push(product);
  } else {
    expcart = expcart.filter((item) => item.id !== product.id);
  }
  localStorage.setItem("cartProducts", JSON.stringify(expcart));
  console.log("Updated Cart:", expcart); // Konsola yazdırma
}

function exploadInitialStates() {
  const wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlist.forEach((product) => {
    const heartIcon = document.getElementById(`wishlistProducts-${product.id}`);
    if (heartIcon) {
      heartIcon.classList.replace("far", "fas");
      heartIcon.style.color = "red";
    }
  });

  const expcart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  expcart.forEach((product) => {
    const cartIcon = document.getElementById(`cartProducts-${product.id}`);
    if (cartIcon) {
      cartIcon.classList.add("fa-check");
      cartIcon.style.color = "green";
    }
  });
}
// Browse By Category Section Start
const categories = Array.from(document.querySelectorAll(".bbc-category"));
const leftArrow = document.querySelector(".bbc-left-arrow");
const rightArrow = document.querySelector(".bbc-right-arrow");

leftArrow.addEventListener("click", () => {
  const activeCat = document.querySelector(".active-category");
  if (activeCat) {
    activeCat.classList.remove("active-category");
    const currentIndex = categories.indexOf(activeCat);
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    categories[newIndex].classList.add("active-category");
  } else {
    categories[categories.length - 1].classList.add("active-category");
  }
});

rightArrow.addEventListener("click", () => {
  const activeCat = document.querySelector(".active-category");
  if (activeCat) {
    activeCat.classList.remove("active-category");
    const currentIndex = categories.indexOf(activeCat);
    const newIndex =
      currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    categories[newIndex].classList.add("active-category");
  } else {
    categories[0].classList.add("active-category");
  }
});

categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    categories.forEach((cat2) => cat2.classList.remove("active-category"));
    cat.classList.add("active-category");
  });
});

if (categories.length > 0) {
  categories[0].classList.add("active-category");
}
// Browse By Category Section End
// Best Selling Products Section Start
const bestSellingProductsContainer = document.getElementById(
  "best-selling-products-api"
);
const toggleBtnText = document.getElementById("best-selling-products-btn");

let bestSellingProducts = [];
let allBestSellingProducts = [];

async function productsRender() {
  try {
    if (allBestSellingProducts.length === 0) {
      allBestSellingProducts = await getProducts();
    }

    if (bestSellingProducts.length === 0) {
      bestSellingProducts = allBestSellingProducts.slice(0, 4);
    }

    bestSellingProductsContainer.innerHTML = bestSellingProducts
      .map((product) => {
        return `<div class="homepage-best-selling-products-container-goods">
                <div class="homepage-best-selling-products-container-goods-img">
                  <div class="homepage-best-selling-products-img-container">
                    <img src="${product.image}" alt="${product.title}">
                  </div>
                  <div class="icon-container">
                    <div class="icon-wishlist">
                      <i class="fa-regular fa-heart" id="icon-wishlist-${
                        product.id
                      }" onclick="toggleItem(${
          product.id
        }, 'wishlist', allBestSellingProducts)"></i>
                      <span class="tooltip">Add to wishlist</span>
                    </div>
                    <div class="icon-cart">
                      <i class="fa-solid fa-cart-shopping" id="icon-cart-${
                        product.id
                      }" onclick="toggleItem(${
          product.id
        }, 'cart', allBestSellingProducts)"></i>
                      <span class="tooltip">Add to cart</span>
                    </div>
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
              </div>`;
      })
      .join("");

    updateIconState();
  } catch (error) {
    console.error("Couldn't render products:", error);
  }
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

  if (inList) {
    allItems = allItems.filter((product) => product.id !== productId);
  } else {
    allItems.push(addedProduct);
  }
  localStorage.setItem(storageKey, JSON.stringify(allItems));

  toggleIconState(icon, listType, !inList);
}

function updateIconState() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  allBestSellingProducts.forEach((product) => {
    const wishlistIcon = document.getElementById(`icon-wishlist-${product.id}`);
    const cartIcon = document.getElementById(`icon-cart-${product.id}`);

    if (wishlistIcon) {
      const inWishlist = wishlistProducts.some(
        (item) => item.id === product.id
      );
      toggleIconState(wishlistIcon, "wishlist", inWishlist);
    }

    if (cartIcon) {
      const inCart = cartProducts.some((item) => item.id === product.id);
      toggleIconState(cartIcon, "cart", inCart);
    }
  });
}

function exprotoggleWishlistIcon(productId) {
  const product = ExpallProducts.find((item) => item.id === productId);
  const wishlistIcon = document.getElementById(
    `wishlistProducts-${product.id}`
  );
  const isAdded = wishlistIcon.classList.contains("fas");
  wishlistIcon.classList.toggle("fas");
  wishlistIcon.classList.toggle("far");
  wishlistIcon.style.color = isAdded ? "" : "red";
  expupdateWishlistStorage(product, !isAdded);
}

function exprotoggleCartIcon(productId) {
  const product = ExpallProducts.find((item) => item.id === productId);
  const cartIcon = document.getElementById(`cartProducts-${product.id}`);
  const isAdded = cartIcon.classList.contains("fa-check");
  cartIcon.classList.toggle("fa-check");
  cartIcon.style.color = isAdded ? "" : "green";
  expupdateCartStorage(product, !isAdded);
}

const expreProductsBtn = document.querySelector(".exp-pre-button");
const expnextProductsBtn = document.querySelector(".exp-next-button");
const expviewExpallProductsBtn = document.querySelector(".exp-btn-view-prd");

expreProductsBtn.addEventListener("click", () => {
  if (exprostart > 0) {
    exprostart -= 1;
    exproend -= 1;
    expproductsRender();
    expnextProductsBtn.disabled = false;
  }
  if (exprostart <= 0) expreProductsBtn.disabled = true;
});

expnextProductsBtn.addEventListener("click", async () => {
  if (exproend < ExpallProducts.length) {
    exprostart += 1;
    exproend += 1;
    expproductsRender();
    expreProductsBtn.disabled = false;
  }
  if (exproend >= ExpallProducts.length) expnextProductsBtn.disabled = true;
});

expviewExpallProductsBtn.addEventListener("click", async () => {
  if (expviewExpallProductsBtn.textContent === "View All Products") {
    expviewExpallProductsBtn.textContent = "View Less Products";
    exprostart = 0;
    exproend = ExpallProducts.length;
    expproductsRender();
    expreProductsBtn.disabled = true;
    expnextProductsBtn.disabled = true;
  } else {
    exprostart = 0;
    exproend = exproductsPerPage;
    expviewExpallProductsBtn.textContent = "View All Products";
    expproductsRender();
    expreProductsBtn.disabled = false;
    expnextProductsBtn.disabled = false;
  }
});

async function expproductsRender() {
  const loader = document.getElementById("exploader");
  const container = document.getElementById("exprocontainer");

  loader.classList.remove("hidden");
  container.classList.add("hidden");

  const products = await getProducts();
  let slicedProducts = products.slice(exprostart, exproend);

  function truncateTitle(title, maxLength) {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  }

  function ExpgetStarRating(rating) {
    const fullStar = '<i class="fas fa-star"></i>';
    const emptyStar = '<i class="far fa-star"></i>';
    const maxStars = 5;
    const fullStarsCount = Math.round(rating);
    const emptyStarsCount = maxStars - fullStarsCount;
    return fullStar.repeat(fullStarsCount) + emptyStar.repeat(emptyStarsCount);
  }

  document.querySelector("#exploreproducts").innerHTML = slicedProducts
    .map((product) => {
      return `
        <div class="exploreprocontainer">
          <div class="exproducts">
            <img class="exproimg" src="${product.image}" alt="Product Image">
            <span class="exp-pro-icons">
              <div class="exprowhistlist"><i onclick="exprotoggleWishlistIcon(${
                product.id
              })" id="wishlistProducts-${
        product.id
      }" class="far fa-heart"></i></div>
              <div class="exproshopingi"><i onclick="exprotoggleCartIcon(${
                product.id
              })" id="cartProducts-${
        product.id
      }" class="fas fa-cart-plus"></i></div>
            </span>
          </div>
          <div class="exprotitle"><h3>${truncateTitle(
            product.title,
            20
          )}</h3></div>
          <div class="expdattotaly">
            <div class="exproprice"><span>$${product.price}</span></div>
            <div class="exprorate"><span>${ExpgetStarRating(
              product.rating.rate
            )}</span></div>
            <div class="exprocount"><span>(${product.rating.count})</span></div>
          </div>
        </div>`;
    })
    .join("");

  exploadInitialStates();

  loader.classList.add("hidden");
  container.classList.remove("hidden");
}

expproductsRender();
// tahir homepage explore products end
function toggleIconState(iconType, listType, inList) {
  iconType.classList.toggle("active", inList);
  if (inList) {
    iconType.classList.remove(
      listType === "wishlist" ? "fa-regular" : "fa-cart-shopping"
    );
    iconType.classList.add(listType === "wishlist" ? "fa-solid" : "fa-check");
    iconType.style.color = listType === "wishlist" ? "#C20000" : "#1A9900";
  } else {
    iconType.classList.remove(
      listType === "wishlist" ? "fa-solid" : "fa-check"
    );
    iconType.classList.add(
      listType === "wishlist" ? "fa-regular" : "fa-cart-shopping"
    );
    iconType.style.color = "";
  }
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
// Best Selling Products Section End
// Featured Product Section Start
function startCountdown(duration) {
  let start = Date.now();
  function timer() {
    let diff = duration - (((Date.now() - start) / 1000) | 0);
    let days = (5 - diff / (60 * 60 * 24)) | 0;
    let hours = ((diff % (60 * 60 * 24)) / (60 * 60)) | 0;
    let minutes = ((diff % (60 * 60)) / 60) | 0;
    let seconds = diff % 60 | 0;
    hours = hours.toString().padStart(2, "0");
    days = days.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    document.getElementById("hoursValue").textContent = hours;
    document.getElementById("daysValue").textContent = days;
    document.getElementById("minutesValue").textContent = minutes;
    document.getElementById("secondsValue").textContent = seconds;
    if (diff <= 0) {
      clearInterval(interval);
    }
  }

  timer();

  const interval = setInterval(timer, 1000);
}

window.onload = function () {
  startCountdown(60 * 60 * 24);
};
// Featured Product Section End

productsRender();
