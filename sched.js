localPath = "./data/calendar.ics"
remotePath = "https://puyallupsd.schoology.com/calendar/feed/ical/1675537677/9eb2ef903bd8d5772db77063be8ba485/ical.ics"

var events = (schoology.getFormattedList(localPath, remotePath));

function lorem(response) {
    finishedPlan = plan.makePlan(response, true;)
}


events.then(lorem());

