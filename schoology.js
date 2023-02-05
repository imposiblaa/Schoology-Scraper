const https = require('https');
const http = require('http');
const fs = require('fs');
const ical = require('node-ical');
const request = require('request');



const sumKeywords = ["Summative", "test", "Expressive", "Receptive"];


async function getFormattedList(localPath, remotePath){
    return new Promise(function (resolve, reject){
        var events = getAssignments(sortTwoWeeks(localPath, remotePath, true)); // "true" is to enable demo mode which sets the current date to 1-9-23 since the current grading term has no assignments left
        var formatted = cacheAssignments(events);
        resolve(formatted);
    });
}


function isSummative(theUrl){
    return new Promise(function (resolve, reject){
        var body;
        var Summative = false;
        request({
            uri: theUrl + "/info",
            headers: {
                //'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzOTk4NTc0MyIsInNjaG9vbElkIjoiNTI1Mjk4Mjc3IiwibmFtZXNwYWNlIjoic2Nob29sb2d5IiwiaWF0IjoxNjc1NjIwNzk2LCJleHAiOjE2NzU2NDIzOTYsImlzcyI6ImFwcC5zY2hvb2xvZ3kuY29tIn0.OIuDn_7XOTi-u-XgRVCn2EqXRDeCPX2XbQmipd-V5sQ',
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'method' : 'POST',
                'cookie' : "apt.uid=AP-IBYB1G3SIPA6-2-1662236840170-76747168.0.2.a4a93c49-ecd6-4031-8f5f-52463bd4dd87; has_js=1; s_stats_browser_info=%7B%22pluginInfo%22%3A%7B%22pdf%22%3A%5B%22pdf%22%2C%22application/pdf%22%2C%221%22%5D%2C%22quicktime%22%3A%5B%22qt%22%2C%22video/quicktime%22%2C%220%22%5D%2C%22realplayer%22%3A%5B%22realp%22%2C%22audio/x-pn-realaudio-plugin%22%2C%220%22%5D%2C%22wma%22%3A%5B%22wma%22%2C%22application/x-mplayer2%22%2C%220%22%5D%2C%22director%22%3A%5B%22dir%22%2C%22application/x-director%22%2C%220%22%5D%2C%22flash%22%3A%5B%22fla%22%2C%22application/x-shockwave-flash%22%2C%220%22%5D%2C%22java%22%3A%5B%22java%22%2C%22application/x-java-vm%22%2C%220%22%5D%2C%22gears%22%3A%5B%22gears%22%2C%22application/x-googlegears%22%2C%220%22%5D%2C%22silverlight%22%3A%5B%22ag%22%2C%22application/x-silverlight%22%2C%220%22%5D%7D%2C%22res%22%3A%221366x768%22%7D; SESS9293b64e99f72e08aa26ff5dce096f1a=c4e3aae343af54f0bdbf14e50747db70; apt.sid=AP-IBYB1G3SIPA6-2-1675555033405-56169547"
            }
            }, function(error, response, body) {
                for(var i in sumKeywords){
                    const re = new RegExp(`(?<=Category:).*${sumKeywords[i]}`, "gm");
                    if(re.test(body)){
                        Summative = true;
                    }
                }
                
                fs.writeFileSync("./tmp.txt", body);
                console.log(Summative);
                resolve(Summative);
        });
        
    
    });
}


async function cacheAssignments(events) {
    resultEvents = [];
    for(var i in events){
        if(await isSummative(events[i].url.val)){
            resultEvents.push([events[i].summary, events[i].description, 'Summative', events[i].url.val]);
        }else{
            resultEvents.push([events[i].summary, events[i].description, 'Formative', events[i].url.val]);
        }
    }
    fs.writeFileSync("./assignmentCache.json", JSON.stringify(resultEvents));
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

module.exports = { sortTwoWeeks, getAssignments, cacheAssignments, getFormattedList };




