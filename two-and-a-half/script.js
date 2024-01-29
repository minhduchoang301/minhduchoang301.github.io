const questions = [
    { question: "Where did we go on our first date?", answers: ["Cafe", "Park", "Restaurant", "Movie"], correct: "Park" },
    { question: "What's our favorite movie?", answers: ["Titanic", "Inception", "Up", "Toy Story"], correct: "Up" },
    // Add more questions here
];

let currentQuestionIndex = 0;

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => selectAnswer(answer);
        answersDiv.appendChild(button);
    });

    // Disable the next button initially
    document.getElementById('nextButton').disabled = true;
}

function selectAnswer(answer) {
    const isCorrect = answer === questions[currentQuestionIndex].correct;
    document.getElementById('result').textContent = isCorrect ? "Correct! Click 'Next' to continue." : "Try again!";
    document.getElementById('nextButton').disabled = !isCorrect;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        document.getElementById('result').textContent = '';
    } else {
        document.getElementById('game').innerHTML = "<h1>Happy Anniversary!</h1>";
    }
}

displayQuestion();
