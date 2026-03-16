let runnerData = "runnerData.json";


// returns array of every runner
function getRunners(){

    return new Promise((resolve, reject) => {
        let names = [];
        fetch(runnerData)
        .then(response => response.json())
        .then(values => {
            values.forEach(value => {
                names.push(value.name);
            })
            names.sort();
            resolve(names);    
    })
    })
}


// compares two given values and outputs whether the input is higher, lower or equal to the answer
function compareValues(input, correct, deltaBox){
    if(input > correct){
        deltaBox.textContent = "⬇️"
    }
    else if(input < correct){
        deltaBox.textContent = "⬆️"
    }
    else{
        deltaBox.textContent = "✅"
    }
}

// shamefully stolen code from https://gomakethings.com/getting-emoji-from-country-codes-with-vanilla-javascript/#:~:text=The%20flag%20emoji%20is%20a,returns%20them%20as%20a%20string.
function getFlagEmoji(countryCode) {
	let codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}


function convertSeconds(seconds){
    dateObj = new Date(seconds * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    if(hours === 0){
        timeString = minutes.toString().padStart(2, '0') + ':' + 
                seconds.toString().padStart(2, '0');
    }
    else{
        timeString = hours.toString().padStart(2, '0') + ':' + 
                minutes.toString().padStart(2, '0') + ':' + 
                seconds.toString().padStart(2, '0');
    }
    
    return timeString;
}


// gets correct runner for the day and returns object -> currently just set to chosen runner
function getAnswer(correct_runner){

    // template object
    answer = {
        "name": "",
        "country": [],
        "console": "",
        "pb": "",
        "most_recent_run": "",
        "best_mb_placement": "",
        "best_ce_placement": ""
    }

    // fetches data
    fetch(runnerData)
        .then(response => response.json())
        .then(values => {
            for(let value of values){
                if(value.name.toLowerCase() === correct_runner.toLowerCase()){ // if the desired runner
                    // set all values to the answer object
                    answer.name = value.name;
                    answer.country = [value.country[0], value.country[1], value.country[2], value.country[3]];
                    answer.console = value.console;
                    answer.pb = value.pb;
                    answer.most_recent_run = value.most_recent_run;
                    answer.best_mb_placement = value.best_mb_placement[0];
                    answer.best_ce_placement = value.best_ce_placement[0];
                    
                }
            }
        })
        .catch(error => console.error(error));

    return answer;
}


// adds row of user categories
function addRow(rowNum){
    let rowDiv = document.createElement("div");
    // list of ids for each category
    let boxIDs = ["runner", "nationality", "console",
        "pb", "mostRecent", "bestMB", "bestCE"
    ]
    // set class and id of the whole row
    rowDiv.classList.add("center");
    rowDiv.id = `categoryResults${rowNum}`;

    // if the first added row, add it AFTER the labels
    if(rowNum === 0){
        rowDiv.after(document.getElementById("categoryLabels"))
    }
    // otherwise, add it BEFORE the last row
    else{
        document.body.insertBefore(rowDiv, document.getElementById(`categoryResults${rowNum-1}`));
    }
    // for every required box, create the element and set its values
    for(let boxID of boxIDs){

        // create div
        boxDiv = document.createElement("div");
        boxDiv.classList.add("resultDiv");
        boxDiv.id = `${boxID}Div${rowNum}`
        document.getElementById(`categoryResults${rowNum}`).append(boxDiv);

        // create actual result box
        resultBox = document.createElement("box");
        resultBox.className = `resultBox`;
        resultBox.id = `${boxID}ResultBox${rowNum}`
        document.getElementById(boxDiv.id).append(resultBox);

        // create delta box
        deltaBox = document.createElement("box");
        deltaBox.className = `deltaBox`;
        deltaBox.id = `${boxID}DeltaBox${rowNum}`
        // change offset to match it with the result boxes
        let topOffset = 318; // initial value
        topOffset += (1*86); // moves down 86 pixels each time
        topOffset = `${topOffset}px`
        deltaBox.style.top = topOffset;
        document.getElementById(boxDiv.id).append(deltaBox);
    }
}


// fills rows per submitted user
let row = 0;
document.getElementById("runnerSubmit").onclick = function(){
    let runner = document.getElementById("runnerInputBox").value; // gets value from input
    document.getElementById("runnerInputBox").value = ""; // empty input box
    row++;
    addRow(row);

    let yellow_background = "rgb(208, 221, 32)"; // reusable yellow colour

    // fetches all runner data
    fetch(runnerData)
        .then(response => response.json())
        .then(values => {
            for(let value of values){
                if(value.name.toLowerCase() === runner.toLowerCase()){ // finds inputted runner

                    // compare names
                    let runnerDeltaBox = document.getElementById(`runnerDeltaBox1`)
                    let runnerBox = document.getElementById(`runnerResultBox${row}`)
                    if(value.name === answer.name){
                        runnerDeltaBox.textContent = "✅";
                        runnerBox.style.backgroundColor = 'green';
                    }
                    else{
                        runnerDeltaBox.textContent = "❌";
                        runnerBox.style.backgroundColor = 'red';
                    }

                    // compare nationality
                    let nationalityDeltaBox = document.getElementById(`nationalityDeltaBox1`)
                    let nationalityResultBox = document.getElementById(`nationalityResultBox${row}`);

                    // if correct sovereignty, green
                    if(value.country[2].toUpperCase() === answer.country[2].toUpperCase()){
                        nationalityDeltaBox.textContent = "✅";
                        nationalityResultBox.style.backgroundColor = 'green';
                    }
                    // if correct continent, yellow
                    else if(value.country[3] === answer.country[3]){
                        nationalityDeltaBox.textContent = "🌍";
                        nationalityResultBox.style.backgroundColor = yellow_background;
                    }
                    // if wrong continent
                    else{
                        nationalityDeltaBox.textContent = "❌";
                        nationalityResultBox.style.backgroundColor = "red";
                    }


                    // compare consoles
                    let consoleDeltaBox = document.getElementById(`consoleDeltaBox1`)
                    let consoleBox = document.getElementById(`consoleResultBox${row}`)
                    if(value.console === answer.console){
                        consoleDeltaBox.textContent = "✅";
                        consoleBox.style.backgroundColor = 'green';
                    }
                    else{
                        consoleDeltaBox.textContent = "❌";
                        consoleBox.style.backgroundColor = 'red';
                    }

                    // format pb from seconds to mm:ss and add comparison symbol
                    let formatted_pb = convertSeconds(value.pb);
                    let pbDeltaBox = document.getElementById(`pbDeltaBox1`)
                    let pbResultBox = document.getElementById(`pbResultBox${row}`);

                    // green if correct, yellow if within a minute, red if wrong by a minute or more
                    pbDifference = Math.abs(value.pb - answer.pb)
                    if(value.pb === answer.pb){
                        pbResultBox.style.backgroundColor = "green";
                    }
                    else if(pbDifference >= 60){
                        pbResultBox.style.backgroundColor = "red";
                    }
                    else{
                        pbResultBox.style.backgroundColor = yellow_background;
                    }

                    compareValues(value.pb, answer.pb, pbDeltaBox); // add comparison symbol
                    
                    // convert dates to date objects, compare dates and add comparison symbol
                    let currentDate = new Date(value.most_recent_run);
                    let answerDate = new Date(answer.most_recent_run);
                    // use value.most_recent_run to already have date as YYYY-MM-DD

                    // change background colour
                    let mostRecentDeltaBox = document.getElementById(`mostRecentDeltaBox1`);
                    let mostRecentResultBox = document.getElementById(`mostRecentResultBox${row}`);

                    let dateDifference = Math.abs(currentDate - answerDate);
                    dateDifference = dateDifference/1000/60/60/24 // convert milliseconds to days
                    if(dateDifference === 0){
                        mostRecentResultBox.style.backgroundColor = "green";
                    }
                    else if(dateDifference >= 60){
                        mostRecentResultBox.style.backgroundColor = "red";
                    }
                    else{
                        mostRecentResultBox.style.backgroundColor = yellow_background;
                    }
                    compareValues(currentDate, answerDate, mostRecentDeltaBox); // update delta

                    // MB AND CE PLACEMENTS
                    // compare mb leaderboard placement and add comparison symbol
                    let currentBest = value.best_mb_placement[0];
                    let answerBest = answer.best_mb_placement;

                    let bestMBDeltaBox = document.getElementById(`bestMBDeltaBox1`);
                    let bestMBResultBox = document.getElementById(`bestMBResultBox${row}`);

                    // change background colour
                    let bestMBDifference = Math.abs(currentBest - answerBest);
                    if(bestMBDifference === 0){
                        bestMBResultBox.style.backgroundColor = "green";
                    }
                    else if(bestMBDifference >= 15){
                        bestMBResultBox.style.backgroundColor = "red";
                    }
                    else{
                        bestMBResultBox.style.backgroundColor = yellow_background;
                    }
                    compareValues(currentBest, answerBest, bestMBDeltaBox); // update delta symbol

                    // compare ce leaderboard placement and add comparison symbol
                    currentBest = value.best_ce_placement[0];
                    answerBest = answer.best_ce_placement;

                    let bestCEDeltaBox = document.getElementById(`bestCEDeltaBox1`)
                    let bestCEResultBox = document.getElementById(`bestCEResultBox${row}`);

                    // change background colour
                    let bestCEDifference = Math.abs(currentBest - answerBest);
                    if(bestCEDifference === 0){
                        bestCEResultBox.style.backgroundColor = "green";
                    }
                    else if(bestCEDifference >= 15){
                        bestCEResultBox.style.backgroundColor = "red";
                    }
                    else{
                        bestCEResultBox.style.backgroundColor = yellow_background;
                    }

                    compareValues(currentBest, answerBest, bestCEDeltaBox); // update delta
                    // if runner has no CE pb:
                    // if answer also has no CE pb, display with check
                    // otherwise display with X
                    if(String(currentBest).startsWith("null")){
                        if(String(answerBest).startsWith("null")){
                            bestCEDeltaBox.textContent = "✅";
                            value.best_ce_placement[0] = "No CE PBs";
                            bestCEResultBox.style.backgroundColor = "green";
                        }
                        else{
                            bestCEDeltaBox.textContent = "❌";
                            value.best_ce_placement[0] = "No CE PBs";
                            bestCEResultBox.style.backgroundColor = "red";
                        }
                    }
                    // if ONLY the answer doesn't have a CE pb AND the input DOES, always display red
                    else if(String(answerBest).startsWith("null")){
                        if(!String(currentBest).startsWith("null")){
                            bestCEDeltaBox.textContent = "❌";
                            bestCEResultBox.style.backgroundColor = "red";
                        }
                    }
                    
                    // adds values to all the boxes
                    document.getElementById(`runnerResultBox${row}`).textContent = value.name;
                    document.getElementById(`nationalityResultBox${row}`).textContent = `${value.country[1]} [${value.country[2]}]`;
                    document.getElementById(`consoleResultBox${row}`).textContent = value.console;
                    document.getElementById(`pbResultBox${row}`).textContent = formatted_pb;
                    document.getElementById(`mostRecentResultBox${row}`).textContent = value.most_recent_run;
                    document.getElementById(`bestMBResultBox${row}`).textContent = value.best_mb_placement[0];
                    document.getElementById(`bestCEResultBox${row}`).textContent = value.best_ce_placement[0];
                }
            }
        })
        .catch(error => console.error(error));
};


// get random runner and set it as answer
getRunners().then(runners => {
    
    runnerTextLine = "";
    runnerText = "";
    count = 0;
    runners.forEach(runner => {
        count++;
        runnerTextLine += `${runner}, `;
        if(count % 20 === 0){
            runnerText += `${runnerTextLine}\n`
            runnerTextLine = ""
        }
    })
    document.getElementById("runnerList").textContent = runnerText;

    let answer = runners[Math.floor(Math.random()*runners.length)];
    getAnswer(answer);
});