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

function expupdateWishlistStorage(productId, add) {
  let wishlist = JSON.parse(localStorage.getItem('expwishlist')) || [];
  if (add) {
    if (!wishlist.includes(productId)) wishlist.push(productId);
  } else {
    wishlist = wishlist.filter(id => id !== productId);
  }
  localStorage.setItem('expwishlist', JSON.stringify(wishlist));
}

function expupdateCartStorage(productId, add) {
  let expcart = JSON.parse(localStorage.getItem('expcart')) || [];
  if (add) {
    if (!expcart.includes(productId)) expcart.push(productId);
  } else {
    expcart = expcart.filter(id => id !== productId);
  }
  localStorage.setItem('expcart', JSON.stringify(expcart));
}

function exploadInitialStates() {
  const wishlist = JSON.parse(localStorage.getItem('expwishlist')) || [];
  wishlist.forEach(productId => {
    const heartIcon = document.getElementById(`expwishlist-${productId}`);
    if (heartIcon) {
      heartIcon.classList.replace('far', 'fas');
      heartIcon.style.color = 'red';
    }
  });

  const expcart = JSON.parse(localStorage.getItem('expcart')) || [];
  expcart.forEach(productId => {
    const expcartIcon = document.getElementById(`expcart-${productId}`);
    if (expcartIcon) {
      expcartIcon.classList.add('fa-check');
      expcartIcon.style.color = 'green';
    }
  });
}

function exprotoggleWishlistIcon(productId) {
  const wishlistIcon = document.getElementById(`expwishlist-${productId}`);
  const isAdded = wishlistIcon.classList.contains('fas');
  wishlistIcon.classList.toggle('fas');
  wishlistIcon.classList.toggle('far');
  wishlistIcon.style.color = isAdded ? '' : 'red';
  expupdateWishlistStorage(productId, !isAdded);
}

function exprotoggleCartIcon(productId) {
  const expcart = document.getElementById(`expcart-${productId}`);
  const isAdded = expcart.classList.contains('fa-check');
  expcart.classList.toggle('fa-check');
  expcart.style.color = isAdded ? '' : 'green';
  expupdateCartStorage(productId, !isAdded);
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
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
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
            <img class="exproimg" src=${product.image} alt="Product Image">
            <span class="exp-pro-icons">
              <div class="exprowhistlist"><i onclick="exprotoggleWishlistIcon(${product.id})" id="expwishlist-${product.id}" class="far fa-heart"></i></div>
              <div class="exproshopingi"><i onclick="exprotoggleCartIcon(${product.id})" id="expcart-${product.id}" class="fas fa-cart-plus"></i></div>
            </span>
          </div>
          <div class="exprotitle"><h3>${truncateTitle(product.title, 20)}</h3></div>
          <div class="expdattotaly">
            <div class="exproprice"><span>$${product.price}</span></div>
            <div class="exprorate"><span>${ExpgetStarRating(product.rating.rate)}</span></div>
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

