async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}

async function productsRender() {
  // Gelen datayı burada düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();

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

  // Products array'ini burada oluşturuyoruz
  document.querySelector("#exploreproducts").innerHTML = products.map((product) => {
    return `
    <div class="exploreprocontainer">
      <div class="exproducts"><img class="exproimg" src=${product.image} alt="Product Image" ></div>
      <div class="exprotitle"><h3>${truncateTitle(product.title, 25)}</h3></div>
      <div class="expdattotaly">
      <div class="exproprice"><p>$${product.price}</p></div>
      <div class="exprorate"><p>${getStarRating(product.rating.rate)}</p></div>
      <div class="exprocount"><p>(${product.rating.count})</p></div>
       </div>
    </div>`;
  }).join("");
}
 productsRender();
