//---------------------------------------------------------------------
// Define Variables
//---------------------------------------------------------------------
var startButtonEl = document.querySelector("#startButton");
var viewHighScoreEl = document.querySelector("#viewHighScore");
var timerEl = document.querySelector("#timer");
var headerEl = document.querySelector("#quizTitle");
var directionsEl = document.querySelector(".directions");
var quizContentEl = document.querySelector("#quizContent");
var quizSetupEl = document.querySelector(".quizSetup");
var timeLeft = 15;


var questions = [
  //[Question, Option 1, Option 2, Option 3, Option 4, Solution]
  ["What is the question?", "A", "B", "C", "D", "B"],
  ["What is the next question?", "A", "B", "C", "D", "A"],
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

  //Create Quiz Header
  var headerQuiz = document.createElement("h1");
  headerQuiz.className = "quizH1";
  quizContentEl.appendChild(headerQuiz);

  //create buttons
  var buttonOne = document.createElement("button");
  buttonOne.textContent = "Initial Name";
  buttonOne.className = "button";
  quizContentEl.appendChild(buttonOne);

  var buttonTwo = document.createElement("button");
  buttonTwo.textContent = "Initial Name 2";
  buttonTwo.className = "button";
  quizContentEl.appendChild(buttonTwo);

  var buttonThree = document.createElement("button");
  buttonThree.textContent = "Initial Name 2";
  buttonThree.className = "button";
  quizContentEl.appendChild(buttonThree);

  var buttonFour = document.createElement("button");
  buttonFour.textContent = "Initial Name 2";
  buttonFour.className = "button";
  quizContentEl.appendChild(buttonFour);

  //Data Property for which button is clicked

  for(let i = 0; i < questions.length; i++) {
    //Display Header
    headerQuiz.textContent = questions[i][0];

    //Update Buttons
    t.textContent = "Testing!"

    //if click detetected 

      //if clicked === questions[i][5]
        //play good sound
        //
      //else 
        //play wrong song
        //reduce time

      //switch to next question
      //display underline
      //display wrong or correct

  }
}