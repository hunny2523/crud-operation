// Get Products form local storge and store in products. If no products are there then create empty array
const products = JSON.parse(localStorage.getItem("products")) || [];

//  form for create and edit element
const form = document.getElementById("createProductForm");

// product name input
const productName = document.getElementById("productName");

// product description input
const productDescription = document.getElementById("productDescription");

// product price input
const productPrice = document.getElementById("productPrice");

// modal for create and edit element
const modal=document.querySelector(".modal");

// create product button inside form
const CreateProductbtn=document.getElementById("createProductButton");




// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const name = productName.value;
//     const description = productDescription.value;
//     const price = productPrice.value;
//     addCard(name, description, price);
// })




const productCards = document.getElementById("productsCards");





function makeCard(ID,name, description, price) {
    let card = document.createElement("div");
    card.classList = "card me-2";
    card.setAttribute("style", "width: 18rem");
    card.setAttribute("data-id", ID);
    console.log("make card");
    card.innerHTML = `<img class=\"card-img-top\" id="card-img" src=\"./camera.jpg\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\" id="card-ID">${ID}</p><h5 class=\"card-title\" id="card-name">${name}</h5><p class=\"card-text\" id="card-description">${description}</p><p class=\"card-text\" id="card-price">${price}</p><button onClick=\"deleteProduct(this)\" class=\"material-symbols-outlined btn text-danger btn-sm p-1\" data-id=\"${ID}\">delete</button><button data-id=\"${ID}\" class=\"material-symbols-outlined btn text-primary btn-sm p-1 edit-btn\" data-toggle="modal" data-target="#createProduct" >edit</button></div><a href="./productID:${ID}">VIEW</a>`
    console.log(card);
    productCards.appendChild(card);

}





function closeModal(){
    modal.classList.remove("show");
    modal.classList.add("fade");
    modal.style.display = "none";
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove("modal-open");
    document.body.removeAttribute("style");
}


// close modal when you create product
CreateProductbtn.addEventListener("click", function(event) {
    event.preventDefault();
    const name = productName.value;
    const description = productDescription.value;
    const price = productPrice.value;
    addCard(name, description, price);
    closeModal();
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
        
        makeCard(products[i].ID,products[i].name, products[i].description, products[i].price);
    }
}
showProducts();


const editButtons=document.querySelectorAll(".edit-btn");
const editProductBtn=document.getElementById("editProductButton");


editProductBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const name = productName.value;
    const description = productDescription.value;
    const price = productPrice.value;
    const id=window.location.pathname.match(/[0-9]+/);
    console.log(id);

    const product=products.filter(product=>product.ID==id[0])[0];
    // console.log(productIndex);
    product.name=name;
    product.description=description;
    product.price=price;
    // products.splice(productIndex,1,n);
    // addCard(name, description, price);
    saveProduct();
    console.log(id[0]);
    // let card=document.querySelector(`[data-id="${id[0]}"]`);
    // console.log(card.children);
    closeModal();
  });


editButtons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        console.log("here");
        // editProduct(e.target.dataset.id,button);
        CreateProductbtn.style.display="none";
        
        const product=products.filter(product=>product.ID==e.target.dataset.id)[0];
        console.log(product);
        productName.value=product.name;
        productDescription.value=product.description;
        productPrice.value=product.price;
    })
})



function generateProductID(){
    return Math.floor(Math.random()*1000);
}


function deleteProduct(temp){
    const productIndex=products.findIndex(product=>product.ID===temp.dataset.id);
    console.log(productIndex);
    products.splice(productIndex,1);
    saveProduct();
    const element=temp.closest(".card");
    element.remove();
}

const links=document.querySelectorAll("a");
links.forEach((a)=>{
    a.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log(e.target.href);
        window.history.pushState(null,null,e.target.href);
        urlLocationHandler();
    })
})


function abc(){
   console.log("here");
    if(window.location.pathname.match(/[0-9]+/)){
        id=window.location.match(/[0-9]+/);
        console.log(id);
        alert(id);
    }
    else{
        console.log("doesn't match");
    }
}
window.onpopstate=abc();



const urlLocationHandler=async()=>{

    const location=window.location.pathname;
    console.log(location);
    if(location==="/"){
        showProducts();
        console.log("here");
      
    }
    else{

        console.log(location);
        const id=location.match(/[0-9]+/);
        console.log(id);
        if(id){
            console.log(id[0]);
            const product=products.filter(product=>product.ID==id[0])[0];
            
            console.log(products);
            // let card=viewCard(product.ID,product.name,product.description,product.price);
        let card = document.createElement("div");
        card.classList = "card me-2";
        card.setAttribute("style", "width: 18rem");
        console.log("make card");
          card.innerHTML = `<div class="card me-2" style="width:18rem"><img class=\"card-img-top\" id="card-img" src=\"./camera.jpg\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\" id="card-ID">${product.ID}</p><h5 class=\"card-title\" id="card-name">${product.name}</h5><p class=\"card-text\" id="card-description">${product.description}</p><p class=\"card-text\" id="card-price">${product.price}</p><button onClick=\"deleteProduct(this)\" class=\"material-symbols-outlined btn text-danger btn-sm p-1\" data-id=\"${product.ID}\">delete</button><button data-id=\"${product.ID}\" class=\"material-symbols-outlined btn text-primary btn-sm p-1 edit-btn\" data-toggle="modal" data-target="#createProduct" >edit</button></div><a href="./productID:${product.ID}">VIEW</a> </div>`
            console.log(card);
    
            productCards.innerHTML=card.innerHTML;
    }
        // let product=products[index];
        // console.log(product);
   }
    // const route=urlRoutes[location] || urlRoutes[404];
    // // html content of file
    // const html=await fetch(route.page).then((Response)=> Response.text());
    // // change middle content of main file
    // document.getElementById("content").innerHTML=html;
    // // change title
    // document.title = route.title;

};


window.onpopstate=urlLocationHandler();

function viewCard(ID,name, description, price) {
    let card = document.createElement("div");
    card.classList = "card me-2";
    card.setAttribute("style", "width: 18rem");
    console.log("make card");
      card.innerHTML = `<img class=\"card-img-top\" id="card-img" src=\"./camera.jpg\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\" id="card-ID">${ID}</p><h5 class=\"card-title\" id="card-name">${name}</h5><p class=\"card-text\" id="card-description">${description}</p><p class=\"card-text\" id="card-price">${price}</p><button onClick=\"deleteProduct(this)\" class=\"material-symbols-outlined btn text-danger btn-sm p-1\" data-id=\"${ID}\">delete</button><button data-id=\"${ID}\" class=\"material-symbols-outlined btn text-primary btn-sm p-1 edit-btn\" data-toggle="modal" data-target="#createProduct" >edit</button></div><a href="./productID:${ID}">VIEW</a>`
return card;

}




