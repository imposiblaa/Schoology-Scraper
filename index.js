const schoology = require("./schoology.js");
const plan = require("./plans.js");
const localStorage = require("localStorage");


localStorage.setItem("Summative", 5);
localStorage.setItem("Formative", 2);
localStorage.setItem("workTime", 4);

localPath = "./data/calendar.ics"
remotePath = "https://puyallupsd.schoology.com/calendar/feed/ical/1675537677/9eb2ef903bd8d5772db77063be8ba485/ical.ics"




setDate = new Date();
var events = (schoology.getFormattedList(localPath, remotePath));
events.then((response) => {
    plan.makePlan(response, true);
});





