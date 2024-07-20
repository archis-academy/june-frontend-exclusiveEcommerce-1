const wishlistcard=document.getElementById("wishlist-card");

 async function getProducts(){
    const productsResponse = await fetch("https://fakestoreapi.com/products");
    const productsData = await productsResponse.json();
    localStorage.setItem('wishlistProducts', JSON.stringify(productsData));
}
getProducts();

function renderProducts(){
 let products=JSON.parse(localStorage.getItem("wishlistProducts"));
   if(products){
    displayWishList(products);
   }

}

function displayWishList(products){
    wishlistcard.innerHTML=products.map(product =>createProductCard(product)).join("");
}

function createProductCard(product){
    return `
            <div class="container-card">
                <img onclick="deleteProduct(${product.id})" class="icons" src="images/wishlist-icon-svg/>
                <img class="img-product" src="${product.image}" alt="${product.title}" />
                <p onclick="addProductToCart(${product.id})" class="product-paragraph">Add To Cart</p>
                <div>
                    <p class="explanation-product">${truncateText(product.title, 20)}</p>
                </div>
                <div class="prices">
                    <p>${product.price}₺</p>
                </div>
            </div>
        `;
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + " ..." : text;
}

function addProductToCart(productID){
    const newCartProduct=wishlistProducts.find((product)=>product.id===productID);
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    if (!cartProducts.some(product => product.id === newCartProduct.id)) {
        cartProducts.push(newCartProduct);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }
    

}

function deleteProduct(productID){
    const wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    const kalanUrunler = wishlistProducts.filter(product => product.id !== productID);
    localStorage.setItem("wishlistProducts",JSON.stringify(kalanUrunler));
    renderProducts();
}