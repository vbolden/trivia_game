const questions = [{
    question: "Who gives Dorothy the ruby slippers?",
    answers: [{
            text: "The Wicked Witch of the East",
            correct: false
        },
        {
            text: "Glinda, The Good Witch",
            correct: true
        },
        {
            text: "Aunty Em",
            correct: false
        },
        {
            text: "The Tin Man",
            correct: false
        }
    ]
},
{
    question: "What kind of dog is Toto?",
    answers: [{
            text: "Cairn Terrier",
            correct: true
        },
        {
            text: "Scottish Terrier",
            correct: false
        },
        {
            text: "Yorkshire Terrier",
            correct: false
        },
        {
            text: "Mutt",
            correct: false
        }
    ]
},
{
    question: "What is used to revive Dorothy and the Lion in the poppy field?",
    answers: [{
            text: "Rain",
            correct: false
        },
        {
            text: "A Chocolate Bar",
            correct: false
        },
        {
            text: "True Love",
            correct: false
        },
        {
            text: "Snow",
            correct: true
        }
    ]
},
{
    question: "What did Dorothy have to follow to reach the Wizard?",
    answers: [{
            text: "The Flying Monkeys",
            correct: false
        },
        {
            text: "The Cowardly Lion",
            correct: false
        },
        {
            text: "The Yellow Brick Road",
            correct: true
        },
        {
            text: "The Scarecrow",
            correct: false
        }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        selectedBtn.innerHTML = "Correct!"
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        selectedBtn.innerHTML = "Sorry, That's wrong.."
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();