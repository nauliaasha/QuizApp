const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".options-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let getCorrect = 0;

// push the questions into available question
function setAvailableQuestions() {
    quizzes.forEach(quiz => {
        availableQuestions.push(quiz);
    });
}

// set question-number, question-text, and options
function getNewQuestion() {
    // question-number
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quizzes.length}`;

    // question-text
    // random question-text
    const quizIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = quizIndex;
    const question = currentQuestion.question;
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const correctAnswer = currentQuestion.correct_answer;
    questionText.innerHTML = question;

    // get the question position in order to make the question not to repeat
    const indexQuestion = availableQuestions.indexOf(quizIndex);
    availableQuestions.splice(indexQuestion, 1);

    // options
    optionsContainer.innerHTML = "";
    let options = [...incorrectAnswers, correctAnswer];

    // push options into available options
    const optionLength = options.length;
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i);
    };

    // put option to html
    let animationDelay = 0.15;
    for (let i = 0; i < optionLength; i++) {
        // random option
        const answerIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        // get the question position in order to make the question not to repeat
        const indexOption = availableOptions.indexOf(answerIndex);
        availableOptions.splice(indexOption, 1);

        const optionElement = document.createElement("div");
        optionElement.setAttribute("id", answerIndex);
        optionElement.setAttribute("class", "option");
        optionElement.setAttribute("value", `${options[answerIndex]}`);
        optionElement.setAttribute("style", `animation-delay: ${animationDelay}s`);
        animationDelay = animationDelay + 0.15;
        optionElement.setAttribute("onclick", "getResult(this)");
        optionElement.innerHTML = options[answerIndex];
        optionsContainer.appendChild(optionElement);
    };

    questionCounter++;
}

function getResult(element) {
    const id = element.id;
    const selectedAnswer = document.getElementById(`${id}`).getAttribute("value");
    if (selectedAnswer === currentQuestion.correct_answer) {
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        getCorrect++;
        console.log(`correct: ${getCorrect}`);
    } else {
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        // show the correct answer
        const optionLength = optionsContainer.children.length;
        for (let i = 0; i < optionLength; i++) {
            const setAnswer = optionsContainer.children[i];
            if (setAnswer.getAttribute("value") === currentQuestion.correct_answer) {
                setAnswer.classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

function unclickableOptions() {
    const optionLength = optionsContainer.children.length;
    for (let i = 0; i < optionLength; i++) {
        optionsContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = "";
    quizzes.forEach(quiz => {
        const indicatorElement = document.createElement("div");
        answersIndicatorContainer.appendChild(indicatorElement);
    });
}

function updateAnswerIndicator(mark) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(mark);
}

function next() {
    if (questionCounter === quizzes.length) {
        console.log("quiz is over");
        quizIsOver();
    } else {
        getNewQuestion();
    }
}

function quizIsOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = `${quizzes.length}`;
    resultBox.querySelector(".total-correct").innerHTML = `${getCorrect}`;
    resultBox.querySelector(".total-wrong").innerHTML = `${(quizzes.length - getCorrect)}`;
    const percentage = (getCorrect / (quizzes.length)) * 100;
    resultBox.querySelector(".total-percentage").innerHTML = `${percentage}%`;
    resultBox.querySelector(".total-score").innerHTML = `${getCorrect} / ${quizzes.length}`;
}

function resetQuiz() {
    questionCounter = 0;
    getCorrect = 0;
}

function tryAgain() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function home() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

// ======= STARTING POINT =======
function startQuiz() {
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

window.onload = () => {
    homeBox.querySelector(".total-question").innerHTML = ` ${quizzes.length}`;
};