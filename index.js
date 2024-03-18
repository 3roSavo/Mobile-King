const row = document.getElementsByClassName("row")[1] // perchè ho creato un altro div con classe row
const spinner = document.getElementById('spinner')

const renderProducts = (array) => {

    array.forEach((obj) => {
        const newColumn = document.createElement("div")
        newColumn.classList.add("col", "col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-2")
        newColumn.innerHTML =
            `<div class="card">
  <img src="${obj.imageUrl}" style="width:200px; height:200px" class="card-img-top mx-auto mt-2" alt="phone-image">
  <div class="card-body">
    <h5 class="card-title">${obj.name}</h5>
    <p class="card-text">${obj.brand}</p>
    <p class="card-text">${obj.description.slice(0, 15)}...</p>
    <p class="card-text">Prezzo: ${obj.price}€</p>
    <div class="text-center">
    <a href="details.html?eventId=${obj._id}" class="btn btn-primary">Dettagli</a>
    </div>
  </div>
</div>`

        row.appendChild(newColumn)

    })
}

const hideSpinner = function () {

}


const getProducts = () => {

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "GET",
        headers: {
            "Authorization": TOKEN // ho semplicemente importato config.js nell'html e richiamata la variabile
        }
    })


        .then((response) => {

            if (response.ok) {
                return response.json()

            } else {
                alert("problema nella lettura")
                throw new Error()
            }
        })

        .then((array) => {
            setTimeout(() => {
                spinner.classList.add('d-none')
                console.log(array)
                renderProducts(array)
            }, 1000)
        })


        .catch((err) => {
            console.log(err)
        })

}
getProducts()