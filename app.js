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
  let wishlist = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
  if (add) {
    if (!wishlist.some(item => item.id === product.id)) wishlist.push(product);
  } else {
    wishlist = wishlist.filter(item => item.id !== product.id);
  }
  localStorage.setItem('wishlistProducts', JSON.stringify(wishlist));
  console.log("Updated Wishlist:", wishlist); // Konsola yazdırma
}

function expupdateCartStorage(product, add) {
  let expcart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  if (add) {
    if (!expcart.some(item => item.id === product.id)) expcart.push(product);
  } else {
    expcart = expcart.filter(item => item.id !== product.id);
  }
  localStorage.setItem('cartProducts', JSON.stringify(expcart));
  console.log("Updated Cart:", expcart); // Konsola yazdırma
}

function exploadInitialStates() {
  const wishlist = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
  wishlist.forEach(product => {
    const heartIcon = document.getElementById(`wishlistProducts-${product.id}`);
    if (heartIcon) {
      heartIcon.classList.replace('far', 'fas');
      heartIcon.style.color = 'red';
    }
  });

  const expcart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  expcart.forEach(product => {
    const cartIcon = document.getElementById(`cartProducts-${product.id}`);
    if (cartIcon) {
      cartIcon.classList.add('fa-check');
      cartIcon.style.color = 'green';
    }
  });
}

function exprotoggleWishlistIcon(productId) {
  const product = ExpallProducts.find(item => item.id === productId);
  const wishlistIcon = document.getElementById(`wishlistProducts-${product.id}`);
  const isAdded = wishlistIcon.classList.contains('fas');
  wishlistIcon.classList.toggle('fas');
  wishlistIcon.classList.toggle('far');
  wishlistIcon.style.color = isAdded ? '' : 'red';
  expupdateWishlistStorage(product, !isAdded);
}

function exprotoggleCartIcon(productId) {
  const product = ExpallProducts.find(item => item.id === productId);
  const cartIcon = document.getElementById(`cartProducts-${product.id}`);
  const isAdded = cartIcon.classList.contains('fa-check');
  cartIcon.classList.toggle('fa-check');
  cartIcon.style.color = isAdded ? '' : 'green';
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
            <img class="exproimg" src="${product.image}" alt="Product Image">
            <span class="exp-pro-icons">
              <div class="exprowhistlist"><i onclick="exprotoggleWishlistIcon(${product.id})" id="wishlistProducts-${product.id}" class="far fa-heart"></i></div>
              <div class="exproshopingi"><i onclick="exprotoggleCartIcon(${product.id})" id="cartProducts-${product.id}" class="fas fa-cart-plus"></i></div>
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
