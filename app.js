let allProducts = [];
let start = 0;
let end = 8;
const productsPerPage = 8;

async function getProducts() {
  if (allProducts.length > 0) return allProducts;

  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  allProducts = productsData;
  return productsData;
}

function updateWishlistStorage(productId, add) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (add) {
    if (!wishlist.includes(productId)) wishlist.push(productId);
  } else {
    wishlist = wishlist.filter(id => id !== productId);
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateCartStorage(productId, add) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (add) {
    if (!cart.includes(productId)) cart.push(productId);
  } else {
    cart = cart.filter(id => id !== productId);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadInitialStates() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.forEach(productId => {
    const heartIcon = document.getElementById(`wishlist-${productId}`);
    if (heartIcon) {
      heartIcon.classList.replace('far', 'fas');
      heartIcon.style.color = 'red';
    }
  });

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(productId => {
    const cartIcon = document.getElementById(`cart-${productId}`);
    if (cartIcon) {
      cartIcon.classList.add('fa-check');
      cartIcon.style.color = 'green';
    }
  });
}

function toggleWishlistIcon(productId) {
  const wishlistIcon = document.getElementById(`wishlist-${productId}`);
  const isAdded = wishlistIcon.classList.contains('fas');
  wishlistIcon.classList.toggle('fas');
  wishlistIcon.classList.toggle('far');
  wishlistIcon.style.color = isAdded ? '' : 'red';
  updateWishlistStorage(productId, !isAdded);
}

function toggleCartIcon(productId) {
  const cartIcon = document.getElementById(`cart-${productId}`);
  const isAdded = cartIcon.classList.contains('fa-check');
  cartIcon.classList.toggle('fa-check');
  cartIcon.style.color = isAdded ? '' : 'green';
  updateCartStorage(productId, !isAdded);
}

const preProductsBtn = document.querySelector(".pre-button");
const nextProductsBtn = document.querySelector(".next-button");
const viewAllProductsBtn = document.querySelector(".btn-view-prd");

preProductsBtn.addEventListener("click", () => {
  if (start > 0) {
    start -= 1;
    end -= 1;
    productsRender();
    nextProductsBtn.disabled = false;
  }
  if (start <= 0) preProductsBtn.disabled = true;
});

nextProductsBtn.addEventListener("click", async () => {
  if (end < allProducts.length) {
    start += 1;
    end += 1;
    productsRender();
    preProductsBtn.disabled = false;
  }
  if (end >= allProducts.length) nextProductsBtn.disabled = true;
});

viewAllProductsBtn.addEventListener("click", async () => {
  if (viewAllProductsBtn.textContent === "View All Products") {
    viewAllProductsBtn.textContent = "View Less Products";
    start = 0;
    end = allProducts.length;
    productsRender();
    preProductsBtn.disabled = true;
    nextProductsBtn.disabled = true;
  } else {
    start = 0;
    end = productsPerPage;
    viewAllProductsBtn.textContent = "View All Products";
    productsRender();
    preProductsBtn.disabled = false;
    nextProductsBtn.disabled = false;
  }
});

async function productsRender() {
  const loader = document.getElementById("loader");
  const container = document.getElementById("exprocontainer");

  loader.classList.remove("hidden");
  container.classList.add("hidden");

  const products = await getProducts();
  let slicedProducts = products.slice(start, end);

  function truncateTitle(title, maxLength) {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  }

  function getStarRating(rating) {
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
            <img class="exproimg" src=${product.image} alt="Product Image">
            <span class="exp-pro-icons">
              <div class="exprowhistlist"><i onclick="toggleWishlistIcon(${product.id})" id="wishlist-${product.id}" class="far fa-heart"></i></div>
              <div class="exproshopingi"><i onclick="toggleCartIcon(${product.id})" id="cart-${product.id}" class="fas fa-cart-plus"></i></div>
            </span>
          </div>
          <div class="exprotitle"><h3>${truncateTitle(product.title, 20)}</h3></div>
          <div class="expdattotaly">
            <div class="exproprice"><span>$${product.price}</span></div>
            <div class="exprorate"><span>${getStarRating(product.rating.rate)}</span></div>
            <div class="exprocount"><span>(${product.rating.count})</span></div>
          </div>
        </div>`;
    })
    .join("");

  loadInitialStates();

  loader.classList.add("hidden");
  container.classList.remove("hidden");
}

productsRender();

