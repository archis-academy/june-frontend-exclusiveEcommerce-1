async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}

// Browse By Category Section Start
const categories = Array.from(document.querySelectorAll(".bbc-category"));
const leftArrow = document.querySelector(".bbc-left-arrow");
const rightArrow = document.querySelector(".bbc-right-arrow");
  
leftArrow.addEventListener("click", () => {
  const activeCat = document.querySelector(".active-category");
  if(activeCat){
    activeCat.classList.remove('active-category');
    const currentIndex = categories.indexOf(activeCat);
    const newIndex = (currentIndex > 0) ? currentIndex - 1 : categories.length - 1;
    categories[newIndex].classList.add('active-category');
  } else {
    categories[categories.length - 1].classList.add('active-category');
  };
});

rightArrow.addEventListener("click", () => {
  const activeCat = document.querySelector(".active-category");
  if(activeCat){
    activeCat.classList.remove('active-category');
    const currentIndex = categories.indexOf(activeCat);
    const newIndex = (currentIndex < categories.length - 1) ? currentIndex + 1 : 0;
    categories[newIndex].classList.add('active-category');
  } else {
    categories[0].classList.add('active-category');
  };
});  
  
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    categories.forEach((cat2) => {
      if(cat == cat2){
        cat.classList.toggle('active-category');
      } else {
        if (cat2.classList.contains('active-category')){
          cat2.classList.remove('active-category');
        };
      };
    });
  });
});  
// Browse By Category Section End
// Best Selling Products Section Start
const bestSellingProductsContainer = document.getElementById("best-selling-products-api");
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

    bestSellingProductsContainer.innerHTML = bestSellingProducts.map((product) => {
      return `<div class="homepage-best-selling-products-container-goods">
                <div class="homepage-best-selling-products-container-goods-img">
                  <div class="homepage-best-selling-products-img-container">
                    <img src="${product.image}" alt="${product.title}">
                  </div>
                  <div class="icon-container">
                    <div class="icon-wishlist">
                      <i class="fa-regular fa-heart" id="icon-wishlist-${product.id}" onclick="toggleItem(${product.id}, 'wishlist', allBestSellingProducts)"></i>
                      <span class="tooltip">Add to wishlist</span>
                    </div>
                    <div class="icon-cart">
                      <i class="fa-solid fa-cart-shopping" id="icon-cart-${product.id}" onclick="toggleItem(${product.id}, 'cart', allBestSellingProducts)"></i>
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
              </div>`
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
  const wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  allBestSellingProducts.forEach(product => {
    const wishlistIcon = document.getElementById(`icon-wishlist-${product.id}`);
    const cartIcon = document.getElementById(`icon-cart-${product.id}`);

    if (wishlistIcon) {
      const inWishlist = wishlistProducts.some(item => item.id === product.id);
      toggleIconState(wishlistIcon, 'wishlist', inWishlist);
    }
    
    if (cartIcon) {
      const inCart = cartProducts.some(item => item.id === product.id);
      toggleIconState(cartIcon, 'cart', inCart);
    }
  });
}

function toggleIconState(iconType, listType, inList) {
  iconType.classList.toggle('active', inList);
  if (inList) {
    iconType.classList.remove(listType === 'wishlist' ? 'fa-regular' : 'fa-cart-shopping');
    iconType.classList.add(listType === 'wishlist' ? 'fa-solid' : 'fa-check');
    iconType.style.color = listType === 'wishlist' ? '#C20000' : '#1A9900';
  } else {
    iconType.classList.remove(listType === 'wishlist' ? 'fa-solid' : 'fa-check');
    iconType.classList.add(listType === 'wishlist' ? 'fa-regular' : 'fa-cart-shopping');
    iconType.style.color = '';
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
  function timer () {
    let diff = duration - (((Date.now() - start) / 1000) | 0);
    let days = 5 - (diff / (60 * 60 * 24)) | 0; 
    let hours = ((diff % (60 * 60 * 24)) / (60 * 60)) | 0;
    let minutes = ((diff % (60 * 60)) / 60) | 0;
    let seconds = (diff % 60) | 0;  
    hours = hours.toString().padStart(2, '0');
    days = days.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');  
    document.getElementById("hoursValue").textContent = hours;
    document.getElementById("daysValue").textContent = days;
    document.getElementById("minutesValue").textContent = minutes;
    document.getElementById("secondsValue").textContent = seconds;  
    if (diff <= 0) {
      clearInterval(interval);
    }
  };
  
  timer();
  
  const interval = setInterval(timer, 1000);
}
  
window.onload = function () {
  startCountdown(60 * 60 * 24);
};
// Featured Product Section End

productsRender();