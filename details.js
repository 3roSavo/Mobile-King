const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get("eventId")
console.log(eventId)

const row = document.getElementsByClassName("row")[1]
const spinner = document.getElementById('spinner')


const deleteButton = () => {

    const confirmation = confirm("Confermare eliminazione?");

    if (confirmation) {

        fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MTdhNDY0NGYxYjAwMTk1MmRmNGMiLCJpYXQiOjE3MTA2OTIyNjAsImV4cCI6MTcxMTkwMTg2MH0.07uMRv-w4wVmhBV6H_vzxboffrY76ZhmtT-CgDHbAuE"
            }
        })

            .then((response) => {

                if (response.ok) {
                    alert("Eliminazione avvenuta con successo")
                    location.assign("index.html")
                } else {
                    alert("Problema nell'eliminazione")
                    throw new Error()
                }

            })

            .catch((err) => {
                console.log(err)
            })
    }
}


const generateCardProduct = (object) => {
    const newColumn = document.createElement("div")
    newColumn.classList.add("col-9", "col-sm-8", "col-md-6", "col-lg-5", "mb-5")
    newColumn.innerHTML =
        `<div class="card">
        <img src="${object.imageUrl}" class="card-img-top mt-3 mx-auto" alt="phone-image" style="max-width:250px">
        <div class="card-body">
        <h5 class="card-title">${object.name}</h5>
        <p class="card-text">${object.brand}</p>
        <p class="card-text">${object.description}</p>
        <p class="card-text">Prezzo: ${object.price}€</p>

        <div class="d-flex justify-content-between ">
        <a href="backOffice.html?eventId=${object._id}" class="btn btn-primary my-1">Modifica</a>
        <a href="#" class="btn btn-danger my-1" onclick="deleteButton()">Elimina</a>
        </div>

        </div>
        </div>`
    row.appendChild(newColumn)
}







const getSingleProductDetails = () => {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MTdhNDY0NGYxYjAwMTk1MmRmNGMiLCJpYXQiOjE3MTA2OTIyNjAsImV4cCI6MTcxMTkwMTg2MH0.07uMRv-w4wVmhBV6H_vzxboffrY76ZhmtT-CgDHbAuE"
        }
    })

        .then((response) => {
            if (response.ok) {
                return response.json()



            } else {
                throw new Error()
            }
        })
        .then((obj) => {
            setTimeout(() => {
                console.log(obj)
                generateCardProduct(obj)
                spinner.classList.add('d-none')
            }, 1000)
        })






        .catch((err) => {
            console.log(err)
        })
}

getSingleProductDetails()