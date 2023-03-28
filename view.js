const container = document.getElementById("main-container");

const formName = document.getElementById("productName");

const formDescription = document.getElementById("productDescription");

const formPrice = document.getElementById("productPrice");

const formImage = document.getElementById("productImage");

const modal = document.querySelector(".modal");

let id = window.location.href.split("=")[1];

let products = JSON.parse(localStorage.getItem("products")) || [];

let card = products.filter(product => product.ID == id)[0];




function validateForm() {

    let validateValue = true;
    let alertMsg = "";

    if (!formName.value) {
        alertMsg += "Name is Required \n";
        validateValue = false;
    }
    else if (!formImage.files[0]) {
        alertMsg += "Please Upload Image\n";
        validateValue = false;
    }
    else if (formPrice.value < 0 || !formPrice.value) {
        alertMsg += "Price must not be Zero or less than Zero\n";
        validateValue = false;
    }
    else if (!formDescription.value) {
        alertMsg += "Description is required\n";
        validateValue = false;
    }

    if (!validateValue) alert(alertMsg);

    return validateValue;

}


function editProduct() {

    formName.value = card.name;
    formDescription.value = card.description;
    formPrice.value = card.price;

}


const editBtn = document.getElementById("editProductButton");

editBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    if (validateForm()) {

        let index = products.findIndex(product => product.ID == id);

        // change product values
        products[index].name = formName.value;
        products[index].description = formDescription.value;
        products[index].price = formPrice.value;
        products[index].image = await getBlob(formImage.files[0]) || card.image;

        localStorage.setItem("products", JSON.stringify(products));

        showProduct();

        closeModal();
    }


})


function showProduct() {


    let html = `<div class="card d-flex flex-row w-50 m-auto mt-5" >
            <div class="card-header col-4 align-self-center">
                    <img src=${card.image} alt="camera" id="card-Image" class="card-img"  >
            </div>
            <div class="card-body">
                <p class="card-title">${card.ID}</p>
                <h4 class="card-title" id="card-name">${card.name}</h4>
                <p class="card-text" id="card-description">${card.description}</p>
                <p class="card-text" id="card-price">${card.price}</p>
                <button type="button" onClick="editProduct()" id="edit-btn" class="btn btn-primary text-nowrap" data-toggle="modal" data-target="#editProduct">
                    Edit Product
                </button>
            </div>
        </div>`

    container.innerHTML = html;

}
showProduct();






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

