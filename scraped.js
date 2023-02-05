function openForm() {
    document.getElementById("myForm").style.display = "block"
}

function closeForm() {
    document.getElementById("myForm").style.display = "none"
}

// const schoology = require("./schoology.js");

//For demo puposes
var today = new Date(2023, 0, 9)
var todayDOW = today.getDay()

var daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

function onload() {
    if (localStorage.getItem("summative") === null) {
        localStorage.setItem("summative", "5")
        localStorage.setItem("formative", "2")
    }

    if (localStorage.getItem("cookie") === null) {
        alert("Enter cookie in the settings")
    }

    var summativePeriod = document.getElementById("summative")
    var formativePeriod = document.getElementById("formative")
    var cookie = document.getElementById("cookie")
    var workTime = document.getElementById("workTime")

    summativePeriod.value = localStorage.getItem("summative")
    formativePeriod.value = localStorage.getItem("formative")
    cookie.value = localStorage.getItem("cookie")
    workTime.value = localStorage.getItem("workTime")

    var todayDiv = document.getElementById(daysOfWeek[todayDOW])
    todayDiv.style.backgroundColor = "rgb(27, 60, 92)"
    
    var i = 0
    daysOfWeek.forEach((day)=>{
        var corrrectDivId = daysOfWeek[i] + "Here"
        i++
        console.log(corrrectDivId)
        var correctDiv = document.getElementById(corrrectDivId)
        var diff = daysOfWeek.indexOf(day) - todayDOW
        var difference = parseInt(diff)
        var setDate = new Date(2023, 0, 9)
        setDate.setDate(today.getDate() + parseInt(difference))
        correctDiv.className = setDate
    })
}

function saveForm() {
    var summativePeriod = document.getElementById("summative").value
    var formativePeriod = document.getElementById("formative").value
    var authKey = document.getElementById("cookie").value
    var workTime = document.getElementById("workTime").value

    if (document.getElementById("cookie").value === null) {
        alert("Enter cookie")
    } else {
        localStorage.setItem("summative", summativePeriod)
        localStorage.setItem("formative", formativePeriod)
        localStorage.setItem("cookie", cookie)
        localStorage.setItem("workTime", workTime)

        console.log(localStorage.getItem("summative"))
        console.log(localStorage.getItem("formative"))
        console.log(localStorage.getItem("cookie"))
        console.log(localStorage.getItem("workTime"))
    }

    //closeForm()
}
