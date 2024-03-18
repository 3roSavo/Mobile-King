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
            console.log(obj)

            inputName.value = obj.name
            inputDescription.value = obj.description
            inputBrand.value = obj.brand
            inputImageURL.value = obj.imageUrl
            inputPrice.value = obj.price

        })

        .catch((err) => {
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


    fetch(urlGeneric, {
        method: methodUsed,
        body: JSON.stringify(newObj),
        headers: {
            "Authorization": TOKEN,
            "content-Type": "application/json"
        }
    })

        .then((response) => {

            if (response.ok) {
                if (eventId) {
                    alert("Inserzione modificata con successo")
                } else {
                    alert("Inserzione aggiunta con successo")
                    return response.json()
                }
                inputName.value = ""
                inputDescription.value = ""
                inputBrand.value = ""
                inputImageURL.value = ""
                inputPrice.value = ""
            } else {

                return response.json()
                    .then((errorData) => {
                        throw new Error(errorData.message)
                    })

            }
        })
        .then((data) => {
            console.log(data)

            window.location.href = "http://127.0.0.1:5500/details.html?eventId=" + (eventId != null ? eventId : data._id)
        })

        .catch((err) => {
            alert("ERRORE, IL BACK-END DICE --> " + err)
            console.log(err)
        })

})


