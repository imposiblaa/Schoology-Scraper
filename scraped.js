function onload() {
    if (localStorage.getItem("summative") === null) {
        localStorage.setItem("summative", "5")
        localStorage.setItem("formative", "2")
    }
    var summativePeriod = document.getElementById("summative")
    var formativePeriod = document.getElementById("formative")
    summativePeriod.value = localStorage.getItem("summative")
    formativePeriod.value = localStorage.getItem("formative")
}

function openForm() {
    document.getElementById("myForm").style.display = "block"
}

function closeForm() {
    document.getElementById("myForm").style.display = "none"
}

function saveForm() {
    var summativePeriod = document.getElementById("summative").value
    var formativePeriod = document.getElementById("formative").value

    localStorage.setItem("summative", summativePeriod)
    localStorage.setItem("formative", formativePeriod)

    console.log(localStorage.getItem("summative"))
    console.log(localStorage.getItem("formative"))
}