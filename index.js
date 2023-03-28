// Get Products form local storge and store in products. If no products are there then create empty array
const products = JSON.parse(localStorage.getItem("products")) || [];

//  form for create element
const form = document.getElementById("createProductForm");

// product name input inside form
const productNameInput = document.getElementById("productName");

// product description input inside form
const productDescriptionInput = document.getElementById("productDescription");

// product image input inside form
const productImageInput = document.getElementById("productImage");

// product price input inside form
const productPriceInput = document.getElementById("productPrice");

// modal for create element
const modal = document.querySelector(".modal");

// create product button inside form
const CreateProductbtn = document.getElementById("createProductButton");

// Html div where cards will be shown
const productCards = document.getElementById("productsCards");

// filter product Dropdown
const filterProducts = document.getElementById("filterProducts");

// ID input for filter products
const filterIDInput = document.getElementById("filterByID");



// form validations
function validateForm() {

  let validateValue = true;
  let alertMsg = "";

  if (!productNameInput.value) {
    alertMsg += "Name is Required \n";
    validateValue = false;
  } 
  else if (!productImageInput.files[0]) {
    alertMsg += "Please Upload Image\n";
    validateValue = false;
  } 
  else if (productPriceInput.value < 0 || !productPriceInput.value) {
    alertMsg += "Price must not be Zero or less than Zero\n";
    validateValue = false;
  }
   else if (!productDescriptionInput.value) {
    alertMsg += "Description is required\n";
    validateValue = false;
  }

  if (!validateValue) alert(alertMsg);

  return validateValue;

}



// Take information and return product card 
function makeCard(ID, name, image, description, price) {

  let card = document.createElement("div");

  card.classList = "card m-3 p-0";
  card.setAttribute("style", "width: 16rem");
  card.setAttribute("data-id", ID);
  
  let html = `<div class="card-header mx-auto rounded " style="height:10rem;width:100% " ><img class=\"mx-auto \" id="card-img" src=\"${image}" alt=\"Card image\" height="100%" width="150px"></div>
    <div class=\"card-body\">
      <p class=\"card-title\" id="card-ID">ID: ${ID}</p>
      <h5 class=\"card-title\" id="card-name">${name}</h5>
      <p class=\"card-text\" id="card-description">${description}</p>
      <p class=\"card-text\" id="card-price"> &#8377; ${price}</p>
      <button onClick=\"deleteProduct(this)\" class=\" btn btn-danger btn-sm \" data-id=\"${ID}\">Delete</button>
      <button class="btn btn-primary btn-sm">
        <a href="./view.html?productID=${ID}" class="text-light text-decoration-none">VIEW</a>
      </button>
    </div>`

  card.innerHTML = html;
  return card;

}



// close modal after you save changes in form(inside modal)
function closeModal() {

  modal.classList.remove("show");
  modal.classList.add("fade");
  modal.style.display = "none";
  document.querySelector('.modal-backdrop').remove();
  document.body.classList.remove("modal-open");
  document.body.removeAttribute("style");

}

// when product is created by form , add product
CreateProductbtn.addEventListener("click", async function (event) {
 
  if(validateForm()){

    event.preventDefault();

    const name = productNameInput.value;
    const description = productDescriptionInput.value;
    const price = productPriceInput.value;
    let image = productImageInput.files[0];

    image = await getBlob(image);
  
    addCard(name, image, description, price);
    closeModal();

  }
 
});


async function getBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.readAsDataURL(file);
  });
}



function addCard(...args) {

  const newCard = {
    ID: generateProductID(),
    name: args[0],
    image: args[1],
    description: args[2],
    price: args[3]
  }

  products.push(newCard);

  saveProduct();
  showProducts();
  form.reset();

}

// save products to localstorage
function saveProduct() {
  localStorage.setItem("products", JSON.stringify(products));
}


// show products on screen from products array
function showProducts(elements = products) {

  const innerDiv = document.createElement("div");

  if(elements.length==0){
    productCards.innerHTML = '<h1 class="text-secondary text-center">No Products available</h1>';
  }

  else{
    for (i in elements) {
      innerDiv.appendChild(makeCard(elements[i].ID, elements[i].name, elements[i].image, elements[i].description, elements[i].price));
    }
    productCards.innerHTML = innerDiv.innerHTML;
  }
}

// show products when page loaded
showProducts();


// generate random product ID
function generateProductID() {
  return Math.floor(Math.random() * 1000);
}

// delete product
function deleteProduct(temp) {

  let id = temp.dataset.id;
  const productIndex = products.findIndex(product => product.ID == id);
  if (productIndex >= 0) {
    products.splice(productIndex, 1);
    saveProduct();
   showProducts();
  }
  
}

// filter Products by name, price
filterProducts.addEventListener("click", (e) => {

  const sortedProductsByName = products.slice().sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const sortedProductsByPrice = products.slice().sort((a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  });

  switch (e.target.value) {
    case "productName": showProducts(sortedProductsByName); break;
    case "All Products": showProducts(); break;
    case "productPrice": showProducts(sortedProductsByPrice); break;
  }

})


// search product by given product ID
function searchProductByID() {
  let id = filterIDInput.value;
  if (id) {
    let product = products.find((product) => product.ID == id);
  
    if (product) {
      showProducts([product]);
    }
    else {
      alert("not exsits");
    }
  }
  else {
    showProducts();
  }
}


