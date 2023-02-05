const https = require('https');
const http = require('http');
const fs = require('fs');
const ical = require('node-ical');
const request = require('request');



const sumKeywords = ["Summative", "Test", "Expressive", "Receptive"];


function isSummative(theUrl){
    var body;
    request({
        uri: theUrl + '/info',
        }, function(error, response, urlbody) {
            body = urlbody;
            consol
            for(var i in sumKeywords){
                if(body.includes("Summative")){
                    return true;
                }
            }
            return false;
        });
    
   
}


function appendCategory(events) {
    resultEvents = [];
    for(var i in events){
        if(isSummative(events[i].url.val)){
            resultEvents[i] = [events[i], 'Summative'];
        }else{
            resultEvents[i] = [events[i], 'Formative'];
        }
    }
    return resultEvents;
}



function getAssignments(events) {
    sortedEvents = [];
    for(var event in events){
        if(events[event].url.val.includes("assignment")) {
            sortedEvents.push(events[event]);
        }
    }
    return sortedEvents;
}

function sortTwoWeeks(localPath, remotePath, demoMode) {
    var sortedEvents = [];
    const events = getCalEvents(localPath, remotePath);
    currentDate = new Date();

    if(demoMode){
        currentDate.setMonth(0);
        currentDate.setDate(9);
    }

    twoWeeks = new Date();
    twoWeeks.setDate(currentDate.getDate()+14);
    console.log(currentDate + ' | ' + twoWeeks);
    for (const event of Object.values(events)) {
        if(event.start > currentDate && event.start < twoWeeks){
            sortedEvents.push(event);
        }
    }
    return sortedEvents;     
};





function getCalEvents(localPath, remotePath){

    const file = fs.createWriteStream(localPath);
    const request = https.get(remotePath, function(response) {
        response.pipe(file);

        
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
        });
    });


    return ical.sync.parseFile('./data/calendar.ics');
}

module.exports = { sortTwoWeeks, getAssignments, appendCategory };




