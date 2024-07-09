async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
function Likexprohearth(productId) {
  const exproheart = document.getElementById(`exproheart-${productId}`);
  if (exproheart.classList.contains("far")) {
    exproheart.classList.remove("far");
    exproheart.classList.add("fas");
    exproheart.style.color = "red"
  }
  else {
    exproheart.classList.remove("fas");
    exproheart.classList.add("far");
    exproheart.style.color = ""
  }
}

const ChangeIconExproShop = function(expshop) {
  expshop.classList.toggle('fa-check')
  if
    (expshop.classList.contains("fa-check")){
      expshop.style.color = "blue"
      
  }
  else {
    expshop.classList.remove("fa-check");
    expshop.style.color = ""
  }
}

const preProductsBtn = document.querySelector(".pre-button");
const nextProductsBtn = document.querySelector(".next-button");
const viewAllProductsBtn = document.querySelector(".btn-view-prd");

let start = 0;
let end = 8;

preProductsBtn.addEventListener("click", () => {
  if (start > 0) {
    start -= 1;
    end -= 1;
    productsRender(start, end);
    nextProductsBtn.disabled = false;
  }
  if (start === 0) {
    preProductsBtn.disabled = true;
  }
});

nextProductsBtn.addEventListener("click", () => {
  if (end < 20) {
    start += 1;
    end += 1;
    productsRender(start, end);
    preProductsBtn.disabled = false;
  }
  if (end === 20) {
    nextProductsBtn.disabled = true;
  }
});


viewAllProductsBtn.addEventListener("click", () => {
  if (viewAllProductsBtn.textContent === "View All Products") {
    viewAllProductsBtn.textContent = "View Less Products";
    productsRender(0, 20);
    preProductsBtn.disabled = true;
    nextProductsBtn.disabled = true;
  } else {
    productsRender(0, 8);
    viewAllProductsBtn.textContent = "View All Products";
    preProductsBtn.disabled = false;
    nextProductsBtn.disabled = false;
  }
});

async function productsRender(start, end) {
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
              <div class="likeproduct"><i onclick="Likexprohearth(${product.id})" id="exproheart-${product.id}" class="far bla fa-regular fa-heart"></i></div>
              <div class="exproshoping"><i onclick="ChangeIconExproShop(this)" id="exproshop-${product.id}" class="fas bla fa-solid fa-cart-shopping"></i></div>
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
}

productsRender(start, end);
