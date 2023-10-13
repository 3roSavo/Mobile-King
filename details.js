const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get("eventId")
console.log(eventId)

const row = document.getElementsByClassName("row")[0]


const deleteButton = () => {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjIzZDEzOWM0MzAwMTg4MTQ1NmEiLCJpYXQiOjE2OTcxODIyNjksImV4cCI6MTY5ODM5MTg2OX0.cUXKy0VCWd8Mz9QXcUljY9B661LXfP9NFoj5FVLnkyw"
        }
    })

    .then( (response) => {

        if(response.ok) {
            confirm("Confermare eliminazione?")
            alert("Eliminazione avvenuta con successo")
            location.assign("index.html")
        } else {
            alert("Problema nell'eliminazione")
            throw new Error()
        }

    })

    .catch( (err) => {
        console.log(err)
    })
}


const generateCardProduct = (object) => {
    const newColumn = document.createElement("div")
    newColumn.classList.add("col", "col-8", "col-sm-6", "col-md-4", "col-lg-3")
    newColumn.innerHTML =
        `<div class="card">
        <img src="${object.imageUrl}" class="card-img-top" alt="phone-image">
        <div class="card-body">
        <h5 class="card-title">${object.name}</h5>
        <p class="card-text">${object.brand}</p>
        <p class="card-text">${object.description}</p>
        <p class="card-text">Prezzo: ${object.price}€</p>
        <a href="backOffice.html?eventId=${object._id}" class="btn btn-primary my-1">Modifica</a>
        <a href="#" class="btn btn-danger my-1" onclick="deleteButton()">Elimina</a>
        </div>
        </div>`
    row.appendChild(newColumn)
}







const getSingleProductDetails = () => {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjIzZDEzOWM0MzAwMTg4MTQ1NmEiLCJpYXQiOjE2OTcxODIyNjksImV4cCI6MTY5ODM5MTg2OX0.cUXKy0VCWd8Mz9QXcUljY9B661LXfP9NFoj5FVLnkyw"
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
            console.log(obj)
            generateCardProduct(obj)
        })






        .catch((err) => {
            console.log(err)
        })
}

getSingleProductDetails()