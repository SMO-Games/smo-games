// handles adding rows
let row = 0; // current row
let inputs = []; // all previous inputs
let guesses = 0; // current number of guesses already submitted
const allowedGuesses = 7;
// handles input
const runnerInputBox = document.getElementById("runnerInputBox");
const runnerSubmitBtn = document.getElementById("runnerSubmit");
// for validating runner input
let isValidRunner = false;
// for error message
const errorMessage = document.getElementById("errorMessage");
// for handling game over popup
const gameOverDialogue = document.getElementById("gameOverDialogue");
const gameOverWrapper = document.querySelector(".wrapper");
const showResultsBtn = document.getElementById("showResultsBtn")
// for changing game over dialogue text
const resultText = document.getElementById("resultText");
const runnerNameText = document.getElementById("runnerNameText");
const runnerInfoText = document.getElementById("runnerInfoText");
// for handling how to play dialogue
const howToPlayDialogue = document.getElementById("howToPlayDialogue");
const howToPlayWrapper = document.querySelector(".howToPlayWrapper");
// for handling about dialogue
const aboutDialogue = document.getElementById("aboutDialogue");
const aboutWrapper = document.querySelector(".aboutWrapper");
// for handling copying results
const copyBtn = document.getElementById("copyResultsBtn");
const confirmCopied = document.getElementById("confirmCopied");
let gameResults = "";
let formattedResults;
// urls
const runnerData = "runnerData.json";
const gameURL = "smo-games.github.io";
const bgImgs = [
    "background1.jpg", "background2.jpg", "background3.jpg", 
    "background4.jpg", "background5.jpg", "background6.jpg", 
    "background7.jpg", "background8.jpg", "background9.jpg",
    "background10.jpg"
]
// range to be within to turn yellow
const mostRecentRange = 60;
const bestPlacementRange = 10;
const pbRange = 60;
// for handling animation of results
const animationDelay = 150;
// for handling cookies
const confirmDeletedCookies = document.getElementById("confirmDeletedCookies");
// for handling countdown text
const countdown = document.getElementById("countdown");
// for date shenanigans
const date = new Date();
let tomorrow = new Date();
tomorrow.setHours(24, 0, 0, 0); // sets new date to tomorrow midnight
const day = String(date.getDate());
const month = String(date.getMonth() + 1); // month is 0 indexed, so +1
const year = String(date.getFullYear());
fullDate = Number(`${day.padStart(2, "0")}${month.padStart(2, "0")}${year}`); // format date as DDMMYYYY to use as seed
// find number of days since the game began to find game number
const start = new Date("2026-03-20"); // actually started on the 21st, but that would 0 index it
const end = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`); // put in current date as YYYY-MM-DD
const timeDifference = end - start; // find difference in milliseconds
const daysSinceStart = Math.ceil(timeDifference / (1000 * 3600 * 24));


// seeded random https://medium.com/@modos.m98/creating-a-seeded-random-string-generator-in-javascript-3165aae1c2d5
function mulberry32(seed) {
    return function() {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
// get random number to be used for daily random
const runnerSeed = mulberry32(fullDate);
const randomFloat = runnerSeed();

// set daily background image
const dailyBGImg = bgImgs[Math.floor(randomFloat*bgImgs.length)]
document.body.style.backgroundImage = `url("backgrounds/${dailyBGImg}")`


// create a cookie
function setCookie(name, value){
    document.cookie = `${name}=${value}; expires=${tomorrow.toUTCString()}; path=/`
}
// delete a cookie
function deleteCookie(name){
    document.cookie = `${name}=${null}; expires=${date.toUTCString()}; path=/`
}
// returns value of given cookie
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie); // grabs whole cookie
    const cArray = cDecoded.split("; "); // splits into array
    let result = null;
    // check each cookie for a match
    cArray.forEach(element => {
        if(element.indexOf(name) === 0){ // if element starts with desired cookie name
            result = element.substring(name.length + 1) // store value in result by going from index after name=
        }
    })
    return result;
}
// deletes all cookies
function deleteAllCookies(){
    for(let i = 1; i <= allowedGuesses; i++){ // for every possible cookie
        deleteCookie(`guess${i}`)
    }
    confirmDeletedCookies.innerHTML = "<i>Cookies deleted</i>";
    setTimeout(() => {confirmDeletedCookies.textContent = ""}, 2000)
}


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
            names.sort((a, b) => a.localeCompare(b)); // compares for alphabetical order
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


// converts seconds into h:mm:ss
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
        timeString = hours.toString().padStart(1, '0') + ':' + 
                minutes.toString().padStart(2, '0') + ':' + 
                seconds.toString().padStart(2, '0');
    }
    
    return timeString;
}


// Source - https://stackoverflow.com/a/20438448
// Posted by Rhyono, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-20, License - CC BY-SA 3.0
// converts date into words
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function convertDate(date_str) {
    temp_date = date_str.split("-");
    return temp_date[2].replace(/^0+/, '') + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
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

                    
                    let formatted_country = `${answer.country[1]} [${answer.country[2]}]`
                    let formatted_bestCE = answer.best_ce_placement
                    // handle having no country, set text
                    if(value.country[1] === null){
                        formatted_country = "None on SRC"
                    }
                    // handle having no CE pb, set text
                    if(answer.best_ce_placement === null){
                        formatted_bestCE = "No CE PBs"
                    }

                    // update runner info text to answer
                    runnerInfoText.innerHTML = `<h3>Runner Info</h3>
                                                <b>Country:</b> ${formatted_country}\n
                                                <b>Console:</b> ${answer.console}\n
                                                <b>Any% PB:</b> ${convertSeconds(answer.pb)}\n
                                                <b>Most Recent Run:</b> ${convertDate(answer.most_recent_run)}\n
                                                <b>Best MB Placement:</b> ${answer.best_mb_placement}\n
                                                <b>Best CE Placement:</b> ${formatted_bestCE}`;
                }
            }
        })
        .then(() => {
            for(let guessNum = 1; guessNum <= allowedGuesses; guessNum++){
                currentCookie = getCookie(`guess${guessNum}`)
                if(!(currentCookie === null)){
                    submitRunner(currentCookie, true);
                }
            }
        })
        .catch(error => console.error(error));
    return answer;
}


// adds row of user categories
function addRow(rowNum){
    return new Promise((resolve, reject) => {
        let rowDiv = document.createElement("div");

        // list of ids for each category
        let boxIDs = ["runner", "nationality", "console",
            "pb", "mostRecent", "bestMB", "bestCE"
        ]
        // list of actual category names
        let categoryNames = ["Runner", "Nationality", "Console",
            "Any% PB", "Most Recent Run", "Best MB Placement", "Best CE Placement"]
        // list of category tooltips
        let categoryTooltips = ["The runner's username on Speedrun.com.",
                                "The runner's nationality set on Speedrun.com.\nTurns yellow if in the correct continent.\n\nSays [None on SRC] if the correct runner does not have a nationality selected.",
                                "The console used in the runner's Any% 1P PB.",
                                "The runner's Any% 1P PB.\n\nTurns yellow if within 1 minute.\n⬆️ = Slower\n⬇️ = Faster",
                                `The date of the runner's most recently submitted run on either official SMO leaderboard.\n\nTurns yellow if within ${mostRecentRange} days.\n⬆️ = More recent\n⬇️ = Less recent`,
                                `The runner's current best Main Leaderboard placement in any category.\n\nTurns yellow if within ${bestPlacementRange}.\n⬆️ = Better placement\n⬇️ = Worse placement`,
                                `The runner's current best CE Leaderboard placement in any category.\n\nTurns yellow if within ${bestPlacementRange}.\n⬆️ = Better placement\n⬇️ = Worse placement\n❌ = No CE PBs`
        ]
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
            // current index for accessing other arrays
            let index = boxIDs.indexOf(boxID);

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

            // create tooltip
            let categoryTooltip = document.createElement("button");
            categoryTooltip.classList.add("categoryTooltip");
            categoryTooltip.id = `${boxID}Tooltip${rowNum}`;
            categoryTooltip.innerHTML = '?'; // add icon
            categoryTooltip.setAttribute("data-tooltip", categoryTooltips[index]); // set tooltip to corresponding string in array

            document.getElementById(categoryBox.id).append(categoryTooltip);

            // add label
            categoryLabelBox.textContent = categoryNames[index];

            // create category result box
            let categoryResultBox = document.createElement("box");
            categoryResultBox.classList.add("categoryResultBox");
            categoryResultBox.id = `${boxID}ResultBox${rowNum}`

            document.getElementById(categoryBox.id).append(categoryResultBox); // add result into main
            resolve(true)
        }
    })
}


// prevents guessing and shows dialogue
function endGame(){
    // prevent further guesses
    runnerInputBox.disabled = true;
    runnerSubmitBtn.disabled = true;
    // open dialogue
    gameOverDialogue.showModal();
    showResultsBtn.style.display = "inline-block"; // reveal show results button
}


// handles animating the result boxes in sequence
function animateBoxes(box){
    return new Promise((resolve, reject) => {
        box.classList.add("animatedBoxes"); // begins animation
        setTimeout(() => {
            box.style.opacity = 1; // makes box visible at the end
            animatedSuccessfully = true;
            if(animatedSuccessfully){
                resolve(true)
            }
            else{
                reject(false)
            }
        }, animationDelay);
    })
}


// fills rows per submitted user
function submitRunner(runner, isCookie){
    return new Promise((resolve, reject) => {
        runnerInputBox.value = ""; // empty input box

        // ignore input if empty
        if(runner.trim() === ""){
            errorMessage.innerHTML = "<mark>Please enter a runner</mark>";
            return
        }

        // ignore input if already guessed
        if(inputs.includes(runner)){
            errorMessage.innerHTML = "<mark>Runner already guessed</mark>";
            return
        }

        let yellow_background = "rgb(255, 191, 0)"; // reusable yellow colour

        // fetches all runner data
        fetch(runnerData)
            .then(response => response.json())
            .then(values => {
                for(let value of values){

                    // checks if entered runner exists
                    isValidRunner = values.some((obj) => obj.name.toLowerCase() === runner.toLowerCase());
                    if(!isValidRunner){
                        errorMessage.innerHTML = "<mark>Not a valid runner</mark>";
                        break
                    }
                    // for error handling
                    errorMessage.innerHTML = ""; // empty error text
                    inputs.push(runner); // add input to already guessed runners  

                    if(value.name.toLowerCase() === runner.toLowerCase()){ // finds inputted runner

                        guesses++;

                        // check if reached max guesses
                        let guessCounter = document.getElementById("guessCounter");
                        guessCounter.innerHTML = `<mark>Guesses: ${guesses}/${allowedGuesses}</mark>`;
                        // end game
                        if(guesses === allowedGuesses){
                            setTimeout(() => {
                                endGame();
                            }, (animationDelay*7)+300);
                        }

                        // increase row count and add the row
                        row++;
                        addRow(row)
                        .then(() => {
                            isValidRunner = true;

                            // compare names (check if guess is correct)
                            let runnerLabelBox = document.getElementById(`runnerLabelBox${row}`);
                            let runnerResultBox = document.getElementById(`runnerResultBox${row}`);
                            if(value.name === answer.name){
                                runnerLabelBox.textContent = runnerLabelBox.textContent + " ✅";
                                runnerResultBox.style.backgroundColor = 'green';
                                // end game
                                setTimeout(() => {
                                    endGame();
                                }, (animationDelay*7)+300); // wait for all the boxes, then an extra 300ms, then display

                                // makes "guess" plural only if more than 1 guess
                                let isPlural;
                                if(guesses === 1){
                                    isPlural = "";
                                }
                                else{
                                    isPlural = "es"
                                }

                                resultText.innerHTML = `You successfully guessed it was <b>${answer.name}</b> in ${guesses} guess${isPlural}!`
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
                                nationalityLabelBox.textContent = nationalityLabelBox.textContent + " ❌ [None on SRC]";
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
                            else if(pbDifference >= pbRange){
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
                            else if(dateDifference >= mostRecentRange){
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
                            else if(bestMBDifference >= bestPlacementRange){
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
                            else if(bestCEDifference >= bestPlacementRange){
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
                            nationalityResultBox.textContent = formatted_country;
                            consoleResultBox.textContent = value.console;
                            pbResultBox.textContent = formatted_pb;
                            mostRecentResultBox.textContent = convertDate(value.most_recent_run);
                            bestMBResultBox.textContent = value.best_mb_placement[0];
                            bestCEResultBox.textContent = value.best_ce_placement[0];

                            // animates each result box in sequence
                            if(!isCookie){ // if an actual guess, not being restored from cookie -> animate
                                animateBoxes(document.getElementById(`runnerBox${row}`))
                                .then(() => {return animateBoxes(document.getElementById(`nationalityBox${row}`))})
                                .then(() => {return animateBoxes(document.getElementById(`consoleBox${row}`))})
                                .then(() => {return animateBoxes(document.getElementById(`pbBox${row}`))})
                                .then(() => {return animateBoxes(document.getElementById(`mostRecentBox${row}`))})
                                .then(() => {return animateBoxes(document.getElementById(`bestMBBox${row}`))})
                                .then(() => {return animateBoxes(document.getElementById(`bestCEBox${row}`))})

                                // make new cookie
                                setCookie(`guess${row}`, runner);

                            }
                            else{ // if restored from cookie, animate all with slide up
                                document.getElementById(`runnerBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`nationalityBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`consoleBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`pbBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`mostRecentBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`bestMBBox${row}`).classList.add("animatedCookieBoxes");
                                document.getElementById(`bestCEBox${row}`).classList.add("animatedCookieBoxes");
                            } 

                            gameResults += "\n"; // new line to game results for copying at the end
                        })
                        break
                    }                
                }
            })
            .catch(error => console.error(error));
        resolve(true)
    })
    
};


// open / close game over dialogue
function openGameOverDialogue(){
    gameOverDialogue.showModal();
}
function exitGameOverDialogue(){
    gameOverDialogue.close();
};

// open / close how to play dialogue
function openHowToPlayDialogue(){
    howToPlayDialogue.showModal();
}
function exitHowToPlayDialogue(){
    howToPlayDialogue.close();
}

// open / close about dialogue
function openAboutDialogue(){
    aboutDialogue.showModal();
}
function exitAboutDialogue(){
    aboutDialogue.close();
}


// lets you close the dialogue by clicking anywhere outside of it
gameOverDialogue.addEventListener("click", (e) => {
    if(!gameOverWrapper.contains(e.target)){
        gameOverDialogue.close();
    }
});
howToPlayDialogue.addEventListener("click", (e) => {
    if(!howToPlayWrapper.contains(e.target)){
        howToPlayDialogue.close();
    }
});
aboutDialogue.addEventListener("click", (e) => {
    if(!aboutWrapper.contains(e.target)){
        aboutDialogue.close();
    }
});


// enable pressing enter to input runner
runnerInputBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        event.preventDefault(); // prevent usual action of enter
        runnerSubmitBtn.click(); // run submit
    }
})


// copy results to clipboard when button clicked
// normal results
function copyResults(resultsType){
    formattedResults = `Guess the SMO Runner ${daysSinceStart} [${guesses}/${allowedGuesses}]\n${gameResults}${gameURL}`;
    navigator.clipboard.writeText(formattedResults);
    confirmCopied.textContent = "Results copied!";
    setTimeout(() => {confirmCopied.textContent = ""}, 2000) // remove results copied text after 2 seconds
};
// twitch chat results
function copyResultsTwitch(){
    formattedResults = `Guess the SMO Runner ${daysSinceStart} [${guesses}/${allowedGuesses}] --- ${gameResults.replace(/[\r\n]+/gm, " | ")}${gameURL.replace(".", " ").replace(".", " ")}`// replace new lines with |, avoid link detection 
    navigator.clipboard.writeText(formattedResults);
    confirmCopied.textContent = "Twitch results copied!";
    setTimeout(() => {confirmCopied.textContent = ""}, 2000) // remove results copied text after 2 seconds
}


// add all runners to datalist for dropdown and set answer
getRunners().then(runners => {
    let list = document.getElementById("runners");

    // for every runner, add a datalist option
    for (let i = 0; i < runners.length; i++) {
        let option = document.createElement("option");
        let text = document.createTextNode(runners[i]);
        option.appendChild(text);
        list.appendChild(option);
    }

    // set answer to daily random runner
    let answer = runners[Math.floor(randomFloat*runners.length)];
    getAnswer(answer);
})


// manage countdown timer
let countdownInterval = setInterval(() => {
    // get immediate time and how much is left to tomorrow
    let currentTime = new Date().getTime();
    let timeLeft = tomorrow - currentTime;
    // format into (h)h:mm:ss
    let hours = String(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000));
    formattedTimeLeft = `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    // update countdown text
    if(timeLeft < 0){ // if finished
        countdown.innerHTML = `<b>Refresh!</b>`;
        clearInterval(countdownInterval); // end JS timer
    }
    else{ // if not finished
        countdown.innerHTML = `Time until next game:<br><b>${formattedTimeLeft}</b>`
    }
})


// run submitrunner when button clicked
runnerSubmitBtn.addEventListener("click", () => {
    submitRunner(runnerInputBox.value, false);
})