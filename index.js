const schoology = require("./schoology.js");

localPath = "./data/calendar.ics"
remotePath = "https://puyallupsd.schoology.com/calendar/feed/ical/1675537677/9eb2ef903bd8d5772db77063be8ba485/ical.ics"


setDate = new Date();
events = schoology.getAssignments(schoology.sortTwoWeeks(localPath, remotePath, true)); // "true" is to enable demo mode which sets the current date to 1-9-23 since the current grading term has no assignments left
schoology.cacheAssignments(events);





