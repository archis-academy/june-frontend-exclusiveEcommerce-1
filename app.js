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

function startCountdown(duration) {
  let start = Date.now();

  function timer () {
    let diff = duration - (((Date.now() - start) / 1000) | 0);
    let days = (diff / (60 * 60 * 24)) | 0; 
    let hours = ((diff % (60 * 60 * 24)) / (60 * 60)) | 0;
    let minutes = ((diff % (60 * 60)) / 60) | 0;
    let seconds = (diff % 60) | 0;

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