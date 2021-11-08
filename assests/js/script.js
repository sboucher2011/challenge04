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
var timeLeft = 15;


var questions = [
  //[Question, Option 1, Option 2, Option 3, Option 4, Solution]
  ["What is the question?", "A", "B", "C", "D", "#B"],
  ["What is the next question?", "A", "B", "C", "D", "#A"],
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

  //Data Property for which button is clicked

  for(let i = 0; i < questions.length; i++) {
    //Display Header
    headerQuiz.textContent = questions[i][0];


    //Update Buttons
    buttonOne.textContent = questions[i][1];
    buttonTwo.textContent = questions[i][2];
    buttonThree.textContent = questions[i][3];
    buttonFour.textContent = questions[i][4];

    body.addEventListener("click", function(event) {
      var element = event.target;

      if (element.matches(questions[i][5])) {
        console.log("Match!")
        displayAnswerStatus("Correct!");
      } else {
        console.log("NOPE")
        //displayAnswerStatus("Wrong!");
      }
      
    });
    
      //switch to next question


  }
}

//Display Label After Answer is Selected
function displayAnswerStatus(answer) {
  var answerDisplay = document.createElement("h3");
  answerDisplay.textContent = answer;
  body.appendChild(answerDisplay);
}