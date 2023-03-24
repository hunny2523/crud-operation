
const products = JSON.parse(localStorage.getItem("products")) || [];


const form = document.getElementById("createProductForm");

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const modal=document.querySelector(".modal");
const btn=document.getElementById("createProductButton");




form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = productName.value;
    const description = productDescription.value;
    const price = productPrice.value;
    addCard(name, description, price);
})




const productCards = document.getElementById("productsCards");





function makeCard(ID,name, description, price) {
    let card = document.createElement("div");
    card.classList = "card me-2";
    card.setAttribute("style", "width: 18rem");
    console.log("make card");
    card.innerHTML = `<img class=\"card-img-top\" id="card-img" src=\"./camera.jpg\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\" id="card-ID">${ID}</p><h5 class=\"card-title\" id="card-name">${name}</h5><p class=\"card-text\" id="card-description">${description}</p><p class=\"card-text\" id="card-price">${price}</p><button onClick=\"deleteProduct(this)\" class=\"material-symbols-outlined btn text-danger btn-sm p-1\" data-id=\"${ID}\">delete</button><button data-id=\"${ID}\" class=\"material-symbols-outlined btn text-primary btn-sm p-1 edit-btn\" data-toggle="modal" data-target="#createProduct" >edit</button></div>`

    productCards.appendChild(card);

}


// close modal when you create product
btn.addEventListener("click", function() {
    modal.classList.remove("show");
    modal.classList.add("fade");
    modal.style.display = "none";
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove("modal-open");
    document.body.removeAttribute("style");
   
  });


function addCard(...args) {
    const newCard = {
        ID:generateProductID(),
        name: args[0],
        description: args[1],
        price: args[2]
    }
    products.push(newCard);
    saveProduct();
    makeCard(newCard.ID,...args);
    form.reset();
}

function saveProduct() {
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
}

console.log(products);

function showProducts() {
    for (i in products) {
        console.log(i);
        makeCard(products[i].ID,products[i].name, products[i].description, products[i].price);
    }
}
showProducts();

const editButtons=document.querySelectorAll(".edit-btn");


editButtons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        editProduct(e.target.dataset.id,button);
    })
})



function generateProductID(){
    return Math.floor(Math.random()*1000);
}


function deleteProduct(temp){
    const productIndex=products.findIndex(product=>product.id===temp.dataset.id);
    console.log(productIndex);
    products.splice(productIndex,1);
    saveProduct();
    const element=temp.closest(".card");
    element.remove();
}





