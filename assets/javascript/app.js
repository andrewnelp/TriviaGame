// select all elements
const start = document.getElementById("start");
const leader = document.getElementById("leader");
const yesNo = document.getElementById('yesNo');
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
// create our questions
let questions = [
  {
    question: "Who is the Leader of USA?",
    imgSrc: "assets/images/usa.jpg",
    choiceA: "Donald Trump",
    choiceB: "Bill Clinton",
    choiceC: "Mr Biden",
    correct: "A",
    imgFace: "assets/images/trump.jpg"
  }, {
    question: "Who is the Leader of Germany?",
    imgSrc: "assets/images/germany.jpg",
    choiceA: "Otto von Bismarck",
    choiceB: "Angela Merkel",
    choiceC: "Gerhard Schröder",
    correct: "B",
    imgFace: "assets/images/merkel.jpg"
  }, {
    question: "Who is the Leader of Russia?",
    imgSrc: "assets/images/russia.jpg",
    choiceA: "Boris Yeltsin",
    choiceB: "Andrey Nelepov",
    choiceC: "Vladimir Putin",
    correct: "C",
    imgFace: "assets/images/putin.jpg"
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
// let timeDelay;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  leader.style.display = "none";
  yesNo.style.display = 'none';
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  // clearTimeout(timeDelay);
  clearInterval(TIMER);
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
    // delay startQuiz()
    // timeDelay = setTimeout(startQuiz, 3000);
    
    //show right answer
    // document.getElementById('yesNo').innerHTML = 'Correct!';
    // qImg.innerHTML = "<img src = " + questions[runningQuestion].imgFace + ">";


  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
    // document.getElementById('yesNo').innerHTML = 'Nope!';
    // qImg.innerHTML = "<img src = " + questions[runningQuestion].imgFace + ">";
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculatin the amount of question percent answered by the user
  const scorePerCent = Math.round(100 * score / questions.length);

  // choose the image based on the scorePerCent
  let img = (scorePerCent >= 80) ? "assets/images/5.png" :
    (scorePerCent >= 60) ? "assets/images/4.png" :
      (scorePerCent >= 40) ? "assets/images/3.png" :
        (scorePerCent >= 20) ? "assets/images/2.png" :
          "assets/images/1.png";

  // start.style.display = "block";
  // leader.style.display = "block";
  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
  quiz.style.display = "none";
  // let btn = document.createElement("Button");                 
  // let textnode = document.createTextNode("Start Again");         
  // btn.appendChild(textnode);                              
  // scoreDiv.appendChild(btn);
  // document.querySelector('button').addEventListener("click", startQuiz);
}




