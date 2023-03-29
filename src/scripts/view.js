// Products form local storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// main container in which card will be shown
const container = document.getElementById("main-container");

// name input in form
const formName = document.getElementById("productName");

// description input in form
const formDescription = document.getElementById("productDescription");

// price input in form
const formPrice = document.getElementById("productPrice");

// image input in form
const formImage = document.getElementById("productImage");

// modal for edit product
const modal = document.querySelector(".modal");

// product ID
let id = window.location.href.split("=")[1];

// card which is having above ID
let card = products.filter(product => product.ID == id)[0];

// form edit Button
const editBtn = document.getElementById("editProductButton");

// modal form
const form=document.getElementById("editProductForm")


   

// image input validation 
formImage.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const fileSize = file.size / 1000; // convert to KB
  
    if (fileSize > 200) {
      formImage.setCustomValidity('Image size must be less than 200 KB');
    }
    else {
      formImage.setCustomValidity('');
    }
    formImage.reportValidity()
  });
  



// if edit button is clicked then set product info to form
function editProduct() {

    formName.value = card.name;
    formDescription.value = card.description;
    formPrice.value = card.price;

}




// when product edit button is clicked the products array will be chnaged and the screen too
form.addEventListener("submit", async (e) => {

    e.preventDefault();
        let index = products.findIndex(product => product.ID == id);

        // change product values
        products[index].name = formName.value;
        products[index].description = formDescription.value;
        products[index].price = formPrice.value;
        products[index].image = await getBlob(formImage.files[0]) || card.image;

        localStorage.setItem("products", JSON.stringify(products));

        showProduct();

        closeModal();
   
})






// show card at main-container
function showProduct() {


    let html = `<div class="card d-flex flex-lg-row flex-column container m-auto mt-5 " >
            <div class="card-header col-lg-3 col-12 align-self-center">
                    <img src=${card.image} alt="camera" id="card-Image" class="card-img" style="max-height:400px;max-width:400px" >
            </div>
            <div class="card-body">
                <p class="card-title">ID: ${card.ID}</p>
                <h4 class="card-title" id="card-name">${card.name}</h4>
                <p class="card-text" id="card-description">${card.description}</p>
                <p class="card-text" id="card-price">&#8377;${card.price}</p>
                <button type="button" onClick="editProduct()" id="edit-btn" class="btn btn-primary text-nowrap" data-toggle="modal" data-target="#editProduct">
                    Edit Product
                </button>
            </div>
        </div>`

    container.innerHTML = html;

}
// run when page is loaded
showProduct();





// get image file
async function getBlob(file) {
    if (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };

            reader.readAsDataURL(file);
        });
    }
    else {
        alert("Image not valid")
    }
}




// close modal after making changes
function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("fade");
    modal.style.display = "none";
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove("modal-open");
    document.body.removeAttribute("style");
}

