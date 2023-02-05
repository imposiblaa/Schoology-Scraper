const localStorage = require("localStorage");


function makePlan(events, demoMode){

    plan = [[]];
    for(i=0; i<14; i++){
        plan[i]=[];
    }

    
    workTime = localStorage.getItem("workTime");

    // builds the plan list so that it is a list of Days, each of which contains a list of Events, which each contain
    // the corresponding event object as well as the weight of the event on each day (how much it should be worked on)
    for(var event in events) {
        dueDate = events[event][4];
        proactivity = localStorage.getItem(events[event][2]);
        console.log(proactivity);

        currentDate = new Date();

        if(demoMode){
            currentDate.setMonth(0);
            currentDate.setDate(9);
        }

        for(var i = 0; i<proactivity; i++){
            console.log(events[event][4].getDate() + " | " + currentDate + " | " + i + " | ", events[event][4].getDate() - currentDate.getDate() - i);

            if((events[event][4].getDate() - currentDate.getDate() - i)<0){
                continue;
            }

            plan[events[event][4].getDate() - currentDate.getDate() - i].push([
                events[event],
                (proactivity-i)
            ]);
        }
    }


    // plan = {
    //     day = {
    //         event = {
    //             name,
    //             description,
    //             Summative/Formative,
    //             Link to assignment,
    //             Due Date
    //         minutes
    //     },
    //     ...
    // }

    console.log(plan);



    // calculates study time for each assignment based on the previously calculated weights
    for(var i in plan){
        totalWeight = 0;
        var day = i

        for(var i in plan[day]){
            totalWeight = totalWeight + plan[day][i][1];
        }
        console.log("totaleWeight: " + totalWeight);

        for(var i in plan[day]){
            plan[day][i][1] = Math.round((workTime*(plan[day][i][1]/totalWeight))*60);
        }


    }

    console.log(plan);
    return plan;
}

module.exports = { makePlan };