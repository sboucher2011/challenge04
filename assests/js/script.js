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
var timeLeft = 100;

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

var answerDisplay = document.createElement("h3");

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
  ["The condition in an if/else statement is enclosed with _____", "1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets", "#B"],
  ["Commonly used data types DO Not Include:", "1. strings", "2. booleans", "3. alerts", "4. numbers", "#C"],
];

//---------------------------------------------------------------------
// Event Listeners
//---------------------------------------------------------------------

//Quiz Start Button
startButtonEl.addEventListener("click", function() {
    startQuizTimer();
    displayQuiz();
})

//View High Score Button
viewHighScoreEl.addEventListener("click", function() {
    console.log("view high score");
})


//---------------------------------------------------------------------
// Functions
//---------------------------------------------------------------------

//Start Timer/End Timer
function startQuizTimer() {
    var timeInterval = setInterval(function() {
      timerEl.textContent = "Time: " + timeLeft;

      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timeInterval); //stops it from running or else it will never stop
      }
  
    }, 1000);
}

//Run Quiz
function displayQuiz() {

  //remove header
  headerEl.textContent = "";

  //remove button
  startButtonEl.style.display = "none";
  //remove statement
  directionsEl.style.display = "none";

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
  body.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(questions[0][5])) {
      console.log("Match!");
      i++;
      displayQuestion();
      displayAnswerStatus("Correct!");
    
    //ensures that the click was on one of the buttons
    } else if (element.matches("#A") || element.matches("#B") || element.matches("#C") || element.matches("#D")) {
      console.log("NOPE");
      i++;
      timeLeft = timeLeft - 10;
      displayQuestion();
      displayAnswerStatus("Wrong!");
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
    console.log("end!!")

    //clear screen
    buttonOne.style.display = "none";
    buttonTwo.style.display = "none";
    buttonThree.style.display = "none";
    buttonFour.style.display = "none";
    answerDisplay.style.display = "none";
    headerQuiz.style.display = "none";
  }
  
}

//Display Label After Answer is Selected
function displayAnswerStatus(answer) {
  
  answerDisplay.textContent = answer;

  if (i===1) {
    body.appendChild(answerDisplay);
  }
  
}