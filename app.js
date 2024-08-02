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
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
  return products
}

const whislistNotice = () => {
  const wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts"));
  if(wishlistProducts.length > 0) {
    document.querySelector(".bottom").style.backgroundColor = "red";
    document.querySelector(".bottom").innerHTML = wishlistProducts.length
    document.querySelector(".whistlist-quantity").style.backgroundColor = "red";
    document.querySelector(".whistlist-quantity").innerHTML = 
    wishlistProducts.length;
  }else{
    document.querySelector(".whistlist-quantity").style.backgroundColor = "transparent";
    document.querySelector(".bottom").style.backgroundColor = "transparent";
  }
};
const cartNotice = () => {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  if(cartProducts.length > 0) {
    document.querySelector(".quantity").style.backgroundColor = "red";
    document.querySelector(".quantity").innerHTML = cartProducts.length;
    document.querySelector(".bottom-quantity").style.backgroundColor = "red"
    document.querySelector(".bottom-quantity").innerHTML = 
    cartProducts.length;
  }else{
    document.querySelector(".quantity").style.backgroundColor = "transparent";
    document.querySelector(".bottom-quantity").style.backgroundColor = "transparent"
  }
};




/* Homepage Header Section Start */
document.getElementById("dropdownButton").addEventListener("click", function() {
  const content = document.getElementById("dropdownContent");
  const arrow = document.querySelector(".dropdown-arrow");
  content.classList.toggle("show");
  arrow.classList.toggle("rotate");
});

function changeLang (content) {
  const button = document.getElementById("dropdownButton");
  const newButtonText = content.textContent
  button.innerHTML = `${newButtonText} <span class="dropdown-arrow">&#9662;</span>
          <div id="dropdownContent" class="black-dropdown-content">
            <a href="#" class="dropdown-content" onclick="changeLang(this)">English</a>
            <a href="#" class="dropdown-content" onclick="changeLang(this)">Turkish</a>
            <a href="#" class="dropdown-content" onclick="changeLang(this)">Arabic</a>
          </div>`;
  button.click();

}


document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchContainer = document.getElementById('search-results');
  let products = [];

  productsRender().then(products2 => {
    products = products2
    console.log(products)
  });
  
  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();

    if (query.length > 0) {
      searchContainer.style.display = "block";
      const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)).slice(0, 3);

      displayResults(filteredProducts);
    } else {
      searchContainer.style.display = "none";
      searchResults.innerHTML = '';
      searchContainer.classList.tog
    }
  });

  function displayResults(products) {
    searchResults.innerHTML = products.map(product => `<div>${product.title.substring(0, 20)}</div>`).join('');
  }
});
/* Homepage Header Section End */

/* Homepage Resume Category Section Start */
async function getWomenProductsTitles() {
  const products = await getProducts();
  const womenProducts = products.filter(product => product.category === "women's clothing");
  return womenProducts.map(product => ({ title: product.title, image: product.image }));

}

async function getMenProductsTitles() {
  const products = await getProducts();
  const menProducts = products.filter(product => product.category === "men's clothing");
  return menProducts.map(product => ({ title: product.title, image: product.image }));
}

async function productsTitleRender() {
  const womenClothingTitles = await getWomenProductsTitles();
  const womenDropdown = document.getElementById("womenDropdown");
  const womenDropdownSmall = document.getElementById("womenDropdown-small");

  womenClothingTitles.forEach(product => {
    const aTag = document.createElement("a");
    const limitedTitle = product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title;
    aTag.textContent = limitedTitle;
    aTag.className = "women-category-title";
    aTag.href = "#";

    const womenimgTag = document.createElement("img");
    womenimgTag.src = product.image;
    womenimgTag.className = "women-category-img";

    const womenContainerDiv = document.createElement("div");
    womenContainerDiv.className = "women-category-row";

    womenContainerDiv.appendChild(womenimgTag);
    womenContainerDiv.appendChild(aTag);
    womenDropdown.appendChild(womenContainerDiv);

    womenDropdownSmall.appendChild(womenContainerDiv.cloneNode(true));


  });

  const menClothingTitles = await getMenProductsTitles();
  const menDropdown = document.getElementById("menDropdown");
  const menDropdownSmall = document.getElementById("menDropdown-small");

  menClothingTitles.forEach(product => {
    const aTag = document.createElement("a");
    const limitedTitle = product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title;
    aTag.className = "men-category-title";
    aTag.href = "#";
    aTag.textContent = limitedTitle;
    
    const menimgTag = document.createElement("img");
    menimgTag.src = product.image;
    menimgTag.className = "men-category-img";

    const menContainerDiv = document.createElement("div");
    menContainerDiv.className = "men-category-row";

    menContainerDiv.appendChild(menimgTag);
    menContainerDiv.appendChild(aTag);
    menDropdown.appendChild(menContainerDiv);
    menDropdownSmall.appendChild(menContainerDiv.cloneNode(true));
  });
}

productsTitleRender();

const adImgs = document.querySelector(".product-container-imgs");
const navButtons = document.querySelectorAll(".img-nav-button");
let currentIndex = 0;
let intervalId;

function showImg(index) {
  adImgs.style.transform = `translateX(-${index * 100}%)`;

  currentIndex = index;

  navButtons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentIndex);
  });
  resetInterval();
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % adImgs.children.length;
  showImg(currentIndex);
}

function resetInterval() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(autoSlide, 3000);
}

showImg(0);
intervalId = setInterval(autoSlide, 3000);

/* Homepage Resume Category Section End */
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
  renderProducts(start, end);
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
  renderProducts(start, end);
};

async function renderProducts(start, end) {
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
      <div class="img-box" onmouseenter="showAddToCart(this)" onmouseleave="hideAddToCart(this)">
        <img class="products-images" src="${product.image}" alt="${
      product.title
    }">
    <div class="heart-icon" onclick = "toggleWishlist(${product.id})" >
      <svg  id="product-${
        product.id
      }"  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="white"/>
<path d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </div>
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
    updateIcon();
    goToCard();
  });
}

renderProducts(start, end);

function countdownStart() {
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

countdownStart();

function showAddToCart(show) {
  show.querySelector(".add-to-cart").style.display = "block";
}

function hideAddToCart(hidden) {
  hidden.querySelector(".add-to-cart").style.display = "none";
}

async function toggleWishlist(productId) {
  const products = await getProducts();
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const product = products.find((product) => product.id == productId);
  const productIndex = wishlistProducts.some(
    (product) => product.id === productId
  );
  if (!productIndex) {
    if (product) {
      wishlistProducts.push(product);
      localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(wishlistProducts)
      );
      whislistNotice();
      document
        .querySelectorAll(`#product-${productId}`)
        .forEach((e) => (e.style.fill = "red"));
    }
  } else {
    const newWishlistProducts = wishlistProducts.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify(newWishlistProducts)
    );
    whislistNotice();
    document
      .querySelectorAll(`#product-${productId}`)
      .forEach((x) => (x.style.fill = "none"));
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
    cartNotice();
    document.getElementById(`cart-${productId}`).innerHTML = "Go To Cart";
  }
}

async function updateIcon(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlistProducts.forEach((e) => {
    productId = e.id;
    document
      .querySelectorAll(`#product-${productId}`)
      .forEach((e) => (e.style.fill = "red"));
  });
}

async function goToCard() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts.forEach((e) => {
    const productId = e.id;
    const cartElement = document.getElementById(`cart-${productId}`);
    if (cartElement) {
      cartElement.innerHTML = "Go To Cart";
    }
  });
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
  whislistNotice();
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
  cartNotice();
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

/* Homepage Browse By Category Section End */
/* hompage profile menu start */
function toggleMenu(){
  const subMenu = document.getElementById("subMenu");
  const userIcon = document.getElementById("profil-fotoğrafı");
  subMenu.classList.toggle("open-menu");
};
function navigationBar(){
  const menu = document.querySelector('#home-bars-menu-icon');
  const itemsMiddle = document.querySelector('.items-middle');
  menu.classList.toggle('fa-x');
  itemsMiddle.classList.toggle('open');
  
};
function toggleMenuBottom(){
  const BottomSubMenu = document.getElementById('bottom-subMenu');
  BottomSubMenu.classList.toggle("active")
}
document.addEventListener("DOMContentLoaded", function() {
  const originalTextElement = document.getElementById('black-discount');
  const shortenedTextElement = document.getElementById('short-black-discount');
  const originalText = originalTextElement.textContent;

  const words = originalText.split(' ');
  const wordLimit = 8; // Kısaltılmış metin için kelime sınırı

  if (words.length > wordLimit) {
      const shortenedText = words.slice(0, wordLimit).join(' ') + '...';
      shortenedTextElement.textContent = shortenedText;
  } else {
      shortenedTextElement.textContent = originalText;
  }
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
cartNotice();
whislistNotice();
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
whislistNotice();
cartNotice();
productsRender();
