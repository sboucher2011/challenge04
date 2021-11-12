//---------------------------------------------------------------------
// Define Variables
//---------------------------------------------------------------------
var body = document.body;
var startButtonEl = document.querySelector("#startButton");
var viewHighScoreEl = document.querySelector("#viewHighScore");
var timerEl = document.querySelector("#timer");
var headerEl = document.querySelector("#quizTitle");
var directionsEl = document.querySelector(".directions");
var quizContentEl = document.querySelector("#quizContent");
var quizSetupEl = document.querySelector(".quizSetup");
var enteredIntialsEl = document.getElementById("#userInitials");
var timeLeft = 100;
var highScore = 0;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Create Quiz Header
var headerQuiz = document.createElement("h1");
headerQuiz.className = "quizH1";
quizContentEl.appendChild(headerQuiz);

//Create Unordered List
var listEl = document.createElement("ul");
var bttn1 = document.createElement("li");
var bttn2 = document.createElement("li");
var bttn3 = document.createElement("li");
var bttn4 = document.createElement("li");

//create buttons
var buttonOne = document.createElement("button");
buttonOne.textContent = "Initial Name";
buttonOne.className = "button";
buttonOne.id = "A";
bttn1.appendChild(buttonOne);

var buttonTwo = document.createElement("button");
buttonTwo.textContent = "Initial Name 2";
buttonTwo.className = "button";
buttonTwo.id = "B";
bttn2.appendChild(buttonTwo);

var buttonThree = document.createElement("button");
buttonThree.textContent = "Initial Name 2";
buttonThree.className = "button";
buttonThree.id = "C";
bttn3.appendChild(buttonThree);

var buttonFour = document.createElement("button");
buttonFour.textContent = "Initial Name 2";
buttonFour.className = "button";
buttonFour.id = "D";
bttn4.appendChild(buttonFour);

var scoreLabel = document.createElement("p");
scoreLabel.className = "scoreLabel";

var initialsEl = document.createElement("p");
initialsEl.textContent = "Enter initials:"
initialsEl.className = "scoreLabel";

var inputBox = document.createElement("input");
inputBox.className = "inputBox";
inputBox.id = "userInitials";

var submitHighScore = document.createElement("button");
submitHighScore.textContent = "Submit";
submitHighScore.className = "button";
submitHighScore.id = "submitButton";

var goBackFromHighScore = document.createElement("button");
goBackFromHighScore.textContent = "Go back";
goBackFromHighScore.className = "goBackButton";

var clearHighScoreButton = document.createElement("button");
clearHighScoreButton.textContent = "Clear high scores";
clearHighScoreButton.className = "button";

var answerDisplay = document.createElement("h3");

var list = document.createElement("ul");
list.className = "highScoreTable";

var j = 1;

//High Score Cells
var highScoreDisplay = document.createElement("h4");

//Question Setup 
var i = 0;

var questions = [
    //[Question, Option 1, Option 2, Option 3, Option 4, Solution]
    ["Which of the following is true about variable naming conventions?", "1. Must begin with a letter or underscore charracter", "2. case sensitive", "3. can start with number or letter", "4. None of the Above", "#A"],
    ["Which built-in method adds one or more elements to the end of an array and returns the new length of the array?", "1. last()", "2. put()", "3. push()", "4. None of the Above", "#C"],
    ["Which of the following function of String object combines the text of two strings and returns a new string?", "1. add()", "2. merge()", "3. concat()", "4. append()", "#C"],
    ["Array's can be used to store?", "1. numbers and strings", "2. other arrays", "3. booleans", "4. All of the Above", "#D"],
    ["String values must be enclosed within _____ when being assigned to variables?", "1. commas", "2. curly brackets", "3. quotes", "4. parenthesis", "#C"],
    ["A very useful tool used during development and debugging for printing content to the debugger is:", "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log", "#D"],
    ["The condition in an if/else statement is enclosed with _____", "1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets", "#C"],
    ["Commonly used data types DO Not Include:", "1. strings", "2. booleans", "3. alerts", "4. numbers", "#C"],
];

//---------------------------------------------------------------------
// Event Listeners
//---------------------------------------------------------------------

//Quiz Start Button
startButtonEl.addEventListener("click", function () {
    startQuizTimer();
    displayQuiz();
})

//View High Score Button
viewHighScoreEl.addEventListener("click", function () {
    clearHomeScreen();
    loadHighScoreTable();
})

submitHighScore.addEventListener("click", function () {
    //scoreFormHandler();
    saveScore();
});

clearHighScoreButton.addEventListener("click", function() {
    clearHighScores();
});

goBackFromHighScore.addEventListener("click", function() {
    goBackHome();
});

//---------------------------------------------------------------------
// Functions
//---------------------------------------------------------------------

//Start Timer/End Timer
function startQuizTimer() {
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timerEl.textContent = "Time: 0";
            highScore = timeLeft;
            timerEl.textContent = "Time: 0";
            displayHighScoreInput();
            clearInterval(timeInterval); //stops it from running or else it will never stop
        }
    }, 1000);
}

//Run Quiz
function displayQuiz() {
    headerQuiz.style.display = "";
    clearHomeScreen();

    //Add to HTML
    body.appendChild(listEl);

    listEl.appendChild(bttn1);
    listEl.appendChild(bttn2);
    listEl.appendChild(bttn3);
    listEl.appendChild(bttn4);

    bttn1.setAttribute("style", " color:white;");
    bttn2.setAttribute("style", " color:white;");
    bttn3.setAttribute("style", " color:white;");
    bttn4.setAttribute("style", " color:white;");

    //Display First Question
    displayQuestion();

    //check ID of button to see if answer was correct
    body.addEventListener("click", function (event) {
        var element = event.target;
        var passSound = new Audio("success.mp3");
        var failSound = new Audio("fail.mp3");

        //ensures that the click was on one of the buttons
        if (element.matches("#A") || element.matches("#B") || element.matches("#C") || element.matches("#D")) {
            //correct answer
            if (element.matches(questions[i][5])) {
                console.log("Match!");
                i++;
                passSound.play();
                displayQuestion();
                displayAnswerStatus("Correct!");

                //wrong answer
            } else {
                console.log("NOPE");
                i++;
                failSound.play();
                timeLeft = timeLeft - 10;
                displayQuestion();
                displayAnswerStatus("Wrong!");
            }
        }
    });
}

//Display Question
function displayQuestion() {

    if (i < questions.length) {
        //Display Question
        headerQuiz.textContent = questions[i][0];

        //Update Buttons to Answers
        buttonOne.textContent = questions[i][1];
        buttonTwo.textContent = questions[i][2];
        buttonThree.textContent = questions[i][3];
        buttonFour.textContent = questions[i][4];
    } else {
        highScore = timeLeft;
        displayHighScoreInput();
    }
}

//Display Label After Answer is Selected
function displayAnswerStatus(answer) {
    answerDisplay.textContent = answer;
    if (i === 1) {
        body.appendChild(answerDisplay);
    }
}

//Clear Screen & Display High Score
function displayHighScoreInput() {
    //clear screen
    buttonOne.style.display = "none";
    buttonTwo.style.display = "none";
    buttonThree.style.display = "none";
    buttonFour.style.display = "none";
    answerDisplay.style.display = "none";

    timerEl = "Time: 0";

    headerQuiz.textContent = "All done!";
    scoreLabel.textContent = "Your final score is " + highScore;

    quizContentEl.appendChild(scoreLabel);
    quizContentEl.appendChild(initialsEl);
    quizContentEl.appendChild(inputBox);
    quizContentEl.appendChild(submitHighScore);
}

//clear Home Screen
function clearHomeScreen() {
    //remove header
    headerEl.textContent = "";

    //remove button
    startButtonEl.style.display = "none";
    //remove statement
    directionsEl.style.display = "none";
}

//Generate High Score Table
function loadHighScoreTable() {
    headerQuiz.textContent = "High Scores"
    headerQuiz.style.display = "";
    list.style.display = "";
    timerEl.textContent = ""
    viewHighScoreEl.textContent = ""

    console.log(highScores);
    
    //remove all li from the list
    while(list.firstChild) list.removeChild(list.firstChild);

    //sort the scores by highest
    highScores.sort((a,b) => b.score - a.score);

    //Create a list with all the scores
    for (var i in highScores) {

        var elem = document.createElement("li");
        elem.textContent = j + ". " + highScores[i].name + " - " + highScores[i].score;

        list.appendChild(elem);

        if (i % 2) {
            elem.className = "evenRow"
        } else {
            elem.className = "oddRow"
        }
        j++;
        body.appendChild(list);
    }

    //add Buttons
    body.appendChild(goBackFromHighScore);
    body.appendChild(clearHighScoreButton);

    goBackFromHighScore.style.display = "";
    clearHighScoreButton.style.display = "";
}

//Clear High Scores
function clearHighScores() {
    localStorage.clear();
    while(list.firstChild) list.removeChild(list.firstChild);
}

//Go Back
function goBackHome() {
    //clear out page
    goBackFromHighScore.style.display = "none";
    clearHighScoreButton.style.display = "none";
    headerQuiz.style.display = "none";
    list.style.display = "none"

    //bring back Home Page
    directionsEl.style.display = ""
    startButtonEl.style.display = ""
    headerEl.textContent = "Coding Quiz Challenge";
    viewHighScoreEl.textContent = "View High Score";
    timerEl.textContent = "Timer: 0"
} 

//Save New Score to the Table
function saveScore() {
    
    var nameInput = document.querySelector("input[class='inputBox']").value;

    // check if inputs are empty (validate)
    if (!nameInput) {
        alert("You need to input your name!");
        return false;
    }

    // reset form fields for next task to be entered
    document.querySelector("input[class='inputBox']").value = "";

    const score = {
        name: nameInput,
        score: highScore,
    }

    highScores.push(score);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    //clear form from screen
    scoreLabel.style.display = "none";
    initialsEl.style.display = "none";
    inputBox.style.display = "none";
    submitHighScore.style.display = "none";

    //load table
    loadHighScoreTable();

}