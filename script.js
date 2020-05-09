
const btn = document.querySelector(".btn");
const scoreCard = document.querySelector("#scoreCard") 
const options = document.querySelector(".options").children;
const questionNumberSpan = document.querySelector(".question-num-value");
const totaluestionSpan = document.querySelector(".total-question");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
let questionIndex = 0;
let index = 0;
let score = 0;
let myArray = [];

const questions = [
    {q: "Who is the fastest man on earth?", 
    options: ["Usain Bolt", "Bill Gates", "Anthony Joshua"],
     answer: 0},
    {q: "Who is the World Best Footballer?", 
    options: ["Lionel Messi", "Kylian Mbappe", "Cristiano Ronaldo"],
     answer: 0},
    {q: "Who is the most decorated olympic athlete?", 
    options: ["Usain Bolt", "Michael Phelps", "Cristiano Ronaldo"],
     answer: 1},
    {q: "Who is the fastest footballer on earth", 
    options: ["Gareth Bale", "Raheem Sterling", "Leroy Sane"],
     answer: 0},
    {q: "Squash is an outdoor game?", 
    options: ["Yes", "Probably", "No"],
     answer: 2}
]


//Loading questions on start 
totaluestionSpan.innerHTML = questions.length;
function load () { 
    questionNumberSpan.innerHTML = index + 1; 
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    index++;
    showScore();
}

function validate () {
    if (!options[0].classList.contains("disabled")) {
        alert("Please choose an option!!!")
    } else {
        enableOptions();
        randomQuestion();
    }
}

function next() {
    validate();
}

function showScore () {
    scoreCard.innerHTML = score + ' / ' + questions.length
}

function check (element) {
    if (element.id == questions[questionIndex].answer) {
        score++;
        element.classList.add("correct");
        showScore();
    } else{
        element.classList.add("wrong")
    }
    disabledOptions();
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
            if (options[i].id == questions[questionIndex].answer) {
                options[i].classList.add("correct");
           }
    }
}
function enableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "wrong", "correct")
    }
}

function randomQuestion() {
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
        if (index==questions.length) {
           quizOver();
        } else {
            if (myArray.length > 0) {
               for (let i = 0; i < myArray.length; i++) {
                   if(myArray[i] == randomNumber){
                       hitDuplicate = 1;
                        break;
                   }
               }

               if (hitDuplicate==1) {
                   randomQuestion();
               } else {
                questionIndex = randomNumber;
                load();
               }
            }
            if (myArray.length==0) {
                questionIndex = randomNumber;
                load();
            }

            myArray.push(randomNumber); 
        }       
}


function quizOver () {
    question.innerHTML = "Quiz Over !!!!"
    op1.style.display = "none";
    op2.style.display = "none";
    op3.style.display = "none";
    btn.innerHTML = "Reload Page To Play Again"
}


window.onload = function () {
    randomQuestion();
}