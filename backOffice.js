const inputName = document.getElementById("inputName")
const inputDescription = document.getElementById("inputDescription")
const inputBrand = document.getElementById("inputBrand")
const inputImageURL = document.getElementById("inputImage")
const inputPrice = document.getElementById("inputPrice")

const saveButton = document.getElementById("saveButton")


const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get("eventId")
console.log(eventId)


if (eventId) {

    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjIzZDEzOWM0MzAwMTg4MTQ1NmEiLCJpYXQiOjE2OTcxODIyNjksImV4cCI6MTY5ODM5MTg2OX0.cUXKy0VCWd8Mz9QXcUljY9B661LXfP9NFoj5FVLnkyw"
            }
        })

        .then( (response) => {

            if (response.ok) {
                return response.json()
            } else {
                throw new Error()
            }

        })
        .then( (obj) => {
            console.log(obj)

            inputName.value = obj.name
            inputDescription.value = obj.description
            inputBrand.value = obj.brand
            inputImageURL.value = obj.imageUrl
            inputPrice.value = obj.price

        })

        .catch( (err) => {
            console.log(err)
        })
}

let methodUsed = "POST"
let urlGeneric = "https://striveschool-api.herokuapp.com/api/product/"

if (eventId) {
    methodUsed = "PUT"
    urlGeneric += eventId
    console.log(urlGeneric)
}


saveButton.addEventListener("click", (event) => {
    event.preventDefault()

    const newObj = {
        name: inputName.value,
        description: inputDescription.value,
        brand: inputBrand.value,
        imageUrl: inputImageURL.value,
        price: inputPrice.value
    }

    console.log(newObj)


    fetch(urlGeneric, {
        method: methodUsed,
        body: JSON.stringify(newObj),
        headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjIzZDEzOWM0MzAwMTg4MTQ1NmEiLCJpYXQiOjE2OTcxODIyNjksImV4cCI6MTY5ODM5MTg2OX0.cUXKy0VCWd8Mz9QXcUljY9B661LXfP9NFoj5FVLnkyw",
            "content-Type" : "application/json"
        }
    })

    .then( (response) => {
        if (response.ok) {
            alert("Inserzione aggiunta con successo")
            inputName.value = ""
            inputDescription.value = ""
            inputBrand.value = ""
            inputImageURL.value = ""
            inputPrice.value = ""
        } else {
        alert("Errore nel salvataggio")
        throw new Error("Errore salvataggio")
        }
    })

    .catch( (err) => {
        console.log("Questo è l'errore: ", err)
    })

})


