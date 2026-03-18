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
function compareValues(input, correct, labelBox, isPlacement){
    // for general values
    if(!isPlacement){
        if(input > correct){
            labelBox.textContent = labelBox.textContent + " ⬇️"
            return "⬇️"
        }
        else if(input < correct){
            labelBox.textContent = labelBox.textContent + " ⬆️"
            return "⬆️"
        }
        else{
            labelBox.textContent = labelBox.textContent + " ✅"
            return "🟩"
        }
    }
    // for leaderboard placements
    else{
        if(input > correct){
            labelBox.textContent = labelBox.textContent + " ⬆️"
            return "⬆️"
        }
        else if(input < correct){
            labelBox.textContent = labelBox.textContent + " ⬇️"
            return "⬇️"
        }
        else{
            labelBox.textContent = labelBox.textContent + " ✅"
            return "🟩"
        }
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


                    // update runner info text to answer
                    runnerInfoText.textContent = `Country: ${value.country[1]} [${value.country[2]}]\n
                                                Console: ${answer.console}\n
                                                Any% PB: ${convertSeconds(answer.pb)}\n
                                                Most Recent Run: ${answer.most_recent_run}\n
                                                Best MB Placement: ${answer.best_mb_placement}\n
                                                Best CE Placement: ${answer.best_ce_placement}`
                }
            }
        })
        .catch(error => console.error(error));
    return answer;
}


// adds row of user categories
function addRow(rowNum){
    let rowDiv = document.createElement("div");

    // list of ids and names for each category
    let boxIDs = ["runner", "nationality", "console",
        "pb", "mostRecent", "bestMB", "bestCE"
    ]
    let categoryNames = ["Runner", "Nationality", "Console",
        "Any% PB", "Most Recent Run", "Best MB Placement", "Best CE Placement"]
    // set class and id of row box
    rowDiv.classList.add("center", "grid-container");
    rowDiv.id = `categoryResults${rowNum}Box`;

    // if the first added row, add it AFTER the labels
    if(rowNum === 0){
        rowDiv.after(document.getElementById("preRunners"))
    }
    // otherwise, add it BEFORE the last row
    else{
        document.body.insertBefore(rowDiv, document.getElementById(`categoryResults${rowNum-1}Box`));
        
        // add separating line between rows
        hrElement = document.createElement("hr");
        hrElement.classList.add("hrclass");

        document.body.insertBefore(hrElement, document.getElementById(`categoryResults${rowNum-1}Box`));
    }
    
    // put row box into div
    // document.getElementById(`categoryResults${rowNum}`).append(rowBox);
    // for every required box, create the element and set its values
    for(let boxID of boxIDs){

        // create category box
        let categoryBox = document.createElement("box");
        categoryBox.classList.add("categoryBox");
        categoryBox.id = `${boxID}Box${rowNum}`
        document.getElementById(rowDiv.id).append(categoryBox);

        // create category label box
        let categoryLabelBox = document.createElement("box");
        categoryLabelBox.classList.add("categoryLabelBox");
        categoryLabelBox.id = `${boxID}LabelBox${rowNum}`
        document.getElementById(categoryBox.id).append(categoryLabelBox);

        // add label
        let index = boxIDs.indexOf(boxID);
        categoryLabelBox.textContent = categoryNames[index];

        // create category result box
        let categoryResultBox = document.createElement("box");
        categoryResultBox.classList.add("categoryResultBox");
        categoryResultBox.id = `${boxID}ResultBox${rowNum}`

        document.getElementById(categoryBox.id).append(categoryResultBox); // add result into main
    }
}


let row = 0; // current row
let inputs = []; // all previous inputs
let guesses = 0; // current number of guesses already submitted
let allowedGuesses = 6;
// for validating runner input
let isValidRunner = false;
let totalRunners = 0;
// for handling pop up
let dialogue = document.getElementById("gameOverDialogue");
let dialogueWrapper = document.querySelector(".wrapper");
// for changing pop up text
let resultText = document.getElementById("resultText");
let runnerNameText = document.getElementById("runnerNameText");
let runnerInfoText = document.getElementById("runnerInfoText");
// for handling copying results
let copyBtn = document.getElementById("copyResultsBtn");
let gameResults = "";


// fills rows per submitted user
document.getElementById("runnerSubmit").onclick = function(){
    let runner = document.getElementById("runnerInputBox").value; // gets value from input
    document.getElementById("runnerInputBox").value = ""; // empty input box

    // ignore input if already guessed
    let errorMessage = document.getElementById("errorMessage");
    if(inputs.includes(runner)){
        errorMessage.textContent = "Runner already guessed";
        return
    }
    else{
        errorMessage.textContent = "";
    }
    inputs.push(runner);

    // increase guesses, end if max guesses


    let yellow_background = "rgb(255, 191, 0)"; // reusable yellow colour

    // fetches all runner data
    fetch(runnerData)
        .then(response => response.json())
        .then(values => {
            for(let value of values){

                totalRunners++; // for checking if valid guess

                if(value.name.toLowerCase() === runner.toLowerCase()){ // finds inputted runner

                    guesses++;

                    // check if reached max guesses
                    let guessCounter = document.getElementById("guessCounter");
                    guessCounter.textContent = `Guesses: ${guesses}/${allowedGuesses}`;
                    if(guesses === allowedGuesses){
                        document.getElementById("runnerInputBox").disabled = true; // prevent further guesses
                        dialogue.showModal();
                    }

                    // increase row count and add the row
                    row++;
                    addRow(row);
                    isValidRunner = true;

                    // compare names (check if guess is correct)
                    let runnerLabelBox = document.getElementById(`runnerLabelBox${row}`);
                    let runnerResultBox = document.getElementById(`runnerResultBox${row}`);
                    if(value.name === answer.name){
                        runnerLabelBox.textContent = runnerLabelBox.textContent + " ✅";
                        runnerResultBox.style.backgroundColor = 'green';
                        // end game
                        document.getElementById("runnerInputBox").disabled = true; // prevent further guesses
                        dialogue.showModal(); // show dialogue
                        resultText.textContent = `You successfully guessed it was ${answer.name} in ${guesses} guesses!`
                    }
                    else{
                        runnerLabelBox.textContent = runnerLabelBox.textContent + " ❌";
                        runnerResultBox.style.backgroundColor = 'red';
                        // if max guesses and still wrong, set guesses to X
                        if(guesses === allowedGuesses){
                            guesses = "X";
                            resultText.textContent = `You didn't get the answer right ☹️ The runner was:`
                            runnerNameText.textContent =  `${answer.name}`
                        }
                    }


                    // compare nationality
                    let nationalityLabelBox = document.getElementById(`nationalityLabelBox${row}`)
                    let nationalityResultBox = document.getElementById(`nationalityResultBox${row}`);
                    let formatted_country = `${value.country[1]} [${value.country[2]}]`;

                    // if inputted user has no flag on src
                    if(value.country[0] === null){
                        formatted_country = `No Country on SRC`;

                        if(answer.country[0] === null){ // if answer also doesn't, make green
                            nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ✅";
                            gameResults += "🟩"
                            nationalityResultBox.style.backgroundColor = 'green';
                        }
                        else{ // if answer does have a country, make red
                            nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ❌";
                            gameResults += "🟥"
                            nationalityResultBox.style.backgroundColor = 'red';
                        }
                    }
                    // if answer has no flag on src BUT inputted user does
                    else if(answer.country[0] === null){
                        nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ❌ [Not on SRC]";
                        gameResults += "🟥"
                        nationalityResultBox.style.backgroundColor = 'red';
                    }
                    // if both have countries
                    else{
                            // if correct sovereignty, green
                        if(value.country[2].toUpperCase() === answer.country[2].toUpperCase()){
                            nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ✅";
                            gameResults += "🟩"
                            nationalityResultBox.style.backgroundColor = 'green';
                        }
                        // if correct continent, yellow
                        else if(value.country[3] === answer.country[3]){
                            nationalityLabelBox.textContent = nationalityLabelBox.textContent + " 🌍";
                            gameResults += "🟨"
                            nationalityResultBox.style.backgroundColor = yellow_background;
                        }
                        // if wrong continent
                        else{
                            nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ❌";
                            gameResults += "🟥"
                            nationalityResultBox.style.backgroundColor = "red";
                        }
                    }


                    // compare consoles
                    let consoleLabelBox = document.getElementById(`consoleLabelBox${row}`)
                    let consoleResultBox = document.getElementById(`consoleResultBox${row}`)
                    if(value.console === answer.console){
                        consoleLabelBox.textContent = consoleLabelBox.textContent + " ✅";
                        gameResults += "🟩"
                        consoleResultBox.style.backgroundColor = 'green';
                    }
                    else{
                        consoleLabelBox.textContent = consoleLabelBox.textContent + " ❌";
                        gameResults += "🟥"
                        consoleResultBox.style.backgroundColor = 'red';
                    }


                    // compare pbs
                    // format pb from seconds to mm:ss and add comparison symbol
                    let formatted_pb = convertSeconds(value.pb);
                    let pbLabelBox = document.getElementById(`pbLabelBox${row}`)
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

                    gameResults += compareValues(value.pb, answer.pb, pbLabelBox, false); // add comparison symbol
                    

                    // compare most recent
                    // convert dates to date objects, compare dates and add comparison symbol
                    let currentDate = new Date(value.most_recent_run);
                    let answerDate = new Date(answer.most_recent_run);
                    // use value.most_recent_run to already have date as YYYY-MM-DD

                    // change background colour
                    let mostRecentLabelBox = document.getElementById(`mostRecentLabelBox${row}`);
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
                    gameResults += compareValues(currentDate, answerDate, mostRecentLabelBox, false); // update delta


                    // compare MB and CE placements
                    // compare mb leaderboard placement and add comparison symbol
                    let currentBest = value.best_mb_placement[0];
                    let answerBest = answer.best_mb_placement;

                    let bestMBLabelBox = document.getElementById(`bestMBLabelBox${row}`);
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
                    gameResults += compareValues(currentBest, answerBest, bestMBLabelBox, true); // update delta symbol

                    // compare ce leaderboard placement and add comparison symbol
                    currentBest = value.best_ce_placement[0];
                    answerBest = answer.best_ce_placement;

                    let bestCELabelBox = document.getElementById(`bestCELabelBox${row}`)
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

                    // if runner has no CE pb:
                    // if answer also has no CE pb, display with check
                    // otherwise display with X
                    if(String(currentBest).startsWith("null")){
                        if(String(answerBest).startsWith("null")){
                            bestCELabelBox.textContent = "Best CE Placement ✅";
                            gameResults += "🟩"
                            value.best_ce_placement[0] = "No CE PBs";
                            bestCEResultBox.style.backgroundColor = "green";
                        }
                        else{
                            bestCELabelBox.textContent = "Best CE Placement ❌";
                            gameResults += "🟥"
                            value.best_ce_placement[0] = "No CE PBs";
                            bestCEResultBox.style.backgroundColor = "red";
                        }
                    }
                    // if ONLY the answer doesn't have a CE pb AND the input DOES, always display red
                    else if(String(answerBest).startsWith("null")){
                        if(!String(currentBest).startsWith("null")){
                            bestCELabelBox.textContent = bestCELabelBox.textContent + " ❌"
                            gameResults += "🟥"
                            bestCEResultBox.style.backgroundColor = "red";
                        }
                    }
                    // ONLY update delta if both have a pb
                    else{
                        gameResults += compareValues(currentBest, answerBest, bestCELabelBox, true); // update delta
                    }
                    

                    // adds values to all the boxes
                    runnerResultBox.textContent = value.name;
                    document.getElementById(`nationalityResultBox${row}`).textContent = formatted_country;
                    document.getElementById(`consoleResultBox${row}`).textContent = value.console;
                    document.getElementById(`pbResultBox${row}`).textContent = formatted_pb;
                    document.getElementById(`mostRecentResultBox${row}`).textContent = value.most_recent_run;
                    document.getElementById(`bestMBResultBox${row}`).textContent = value.best_mb_placement[0];
                    document.getElementById(`bestCEResultBox${row}`).textContent = value.best_ce_placement[0];

                    gameResults += "\n"

                    break
                }

                // prevent guess if not a valid runner
                else if(totalRunners === values.length){
                    console.log(isValidRunner);
                    if(!isValidRunner){
                        errorMessage.textContent = "Not a valid runner";
                        guesses--; // discount guess
                    }  
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


function exitGameOverDialogue(){
    dialogue.close();
};


// lets you close the dialogue by clicking anywhere outside of it
dialogue.addEventListener("click", (e) => {
    if(!dialogueWrapper.contains(e.target)){
        dialogue.close();
    }
});


// copy results to clipboard when button clicked
function copyResults(){
    let formattedResults = `Guess the SMO Runner [${guesses}/${allowedGuesses}]\n${gameResults}TESTING ONLY - Answer: ${answer.name}`;
    navigator.clipboard.writeText(formattedResults).then(() => {
        console.log("Text copied")
    })
};