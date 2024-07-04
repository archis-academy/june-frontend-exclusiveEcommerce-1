async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
document.addEventListener('DOMContentLoaded',  () =>{
  const exproheart = document.getElementById('exproheart');

  exproheart.addEventListener('click', () =>{
    exproheart.classList.toggle('liked');
    if(exproheart.classList.contains("far")){
      exproheart.classList.remove("far");
      exproheart.classList.add("fas");
    }
  })
})


const preProductsBtn = document.querySelector(".pre-button");
const nextProductsBtn = document.querySelector(".next-button");
const viewAllProductsBtn = document.querySelector(".btn-view-prd");

let start = 0;
let end = 8;

nextProductsBtn.addEventListener("click", () => {
  if (end <= 20) {
    start += 1;
    end += 1;
    productsRender(start, end);
  }
});

preProductsBtn.addEventListener("click", () => {
  if (start > 0) {
    start -= 1;
    end -= 1;
    productsRender(start, end);
  }
});

viewAllProductsBtn.addEventListener("click", () => {
  if (viewAllProductsBtn.textContent === "View All Products") {
    viewAllProductsBtn.textContent = "View Less Products";
    productsRender(0, 20);
  } else {
    productsRender(0, 8);
    viewAllProductsBtn.textContent = "View All Products";
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
            <span class="icons">
              <i onclick="Toggle" id=exproheart class="bla fa-regular fa-heart"></i>
              <i class="fa-solid fa-cart-shopping"></i>
            </span>
          </div>
          <div class="exprotitle"><h3>${truncateTitle(product.title, 20)}</h3></div>
          <div class="expdattotaly">
            <div class="exproprice"><p>$${product.price}</p></div>
            <div class="exprorate"><p>${getStarRating(product.rating.rate)}</p></div>
            <div class="exprocount"><p>(${product.rating.count})</p></div>
          </div>
        </div>`;
    })
    .join("");
}

productsRender(start, end);
