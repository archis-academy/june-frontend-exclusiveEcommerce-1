async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
  return products
}







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

document.addEventListener(
  
)
/* Homepage Header Section End */


/* Homepage Browse By Category Section Start */
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

/* Homepage Browse By Category Section End */
/* hompage profile menu start */
function toggleMenu(){
  const subMenu = document.getElementById("subMenu");
  const userIcon = document.getElementById("profil-fotoğrafı");
  subMenu.classList.toggle("open-menu");
  userIcon.classList.toggle("convert-img");
};
function toggleBottomMenu() {
  const bottomSubMenu = document.getElementById("bottom-subMenu");
  bottomSubMenu.classList.toggle("open");
}
function navigationBar(){
  const menu = document.querySelector('#home-bars-menu-icon');
  const itemsMiddle = document.querySelector('.items-middle');
  menu.classList.toggle('fa-x');
  itemsMiddle.classList.toggle('open');
  
};
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



/*Buse/JU-5 Homepage Featured Product START*/
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
/*Buse/JU-5 Homepage Featured Product End*/
