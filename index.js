const schoology = require("./schoology.js");

localPath = "./data/calendar.ics"
remotePath = "https://puyallupsd.schoology.com/calendar/feed/ical/1675537677/9eb2ef903bd8d5772db77063be8ba485/ical.ics"


setDate = new Date();
var events = (schoology.getFormattedList(localPath, remotePath));
events.then((response) => {
    console.log(response);
});





