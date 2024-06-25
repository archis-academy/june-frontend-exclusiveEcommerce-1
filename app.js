async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
}

productsRender();

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


