const row = document.getElementsByClassName("row")[1] // perchè ho creato un altro div con classe row
const spinner = document.getElementById('spinner')



const renderProducts = (array) => {

    array.forEach((obj) => {
        const newColumn = document.createElement("div")
        newColumn.classList.add("col", "col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-2")
        newColumn.innerHTML =
            `<div class="card">
  <img src="${obj.imageUrl}" class="card-img-top" alt="phone-image">
  <div class="card-body">
    <h5 class="card-title">${obj.name}</h5>
    <p class="card-text">${obj.brand}</p>
    <p class="card-text">${obj.description}</p>
    <p class="card-text">Prezzo: ${obj.price}€</p>
    <a href="details.html?eventId=${obj._id}" class="btn btn-primary">Dettagli</a>
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MTdhNDY0NGYxYjAwMTk1MmRmNGMiLCJpYXQiOjE3MTA2OTIyNjAsImV4cCI6MTcxMTkwMTg2MH0.07uMRv-w4wVmhBV6H_vzxboffrY76ZhmtT-CgDHbAuE"
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