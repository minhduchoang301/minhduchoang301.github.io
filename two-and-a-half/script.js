const questions = [
    { question: "Where did we go on our first date?",type: "choice", answers: ["Charidise Cafe", "College Park", "Thai Restaurant", "Kibo Sushi"], correct: "Thai Restaurant" },
    { question: "What's our first movie together?",type: "choice", answers: ["Kungfu Panda", "Brave", "Up", "Ratatouille"], correct: "Brave" },
    { question: "Placeholder for Trivia 1",type: "choice", answers: ["Kungfu Panda", "Brave", "Up", "Ratatouille"], correct: "Brave" },
    { question: "Placeholder for Trivia 2",type: "choice", answers: ["Kungfu Panda", "Brave", "Up", "Ratatouille"], correct: "Brave" },
    { question: "Placeholder for Trivia 3", type: "input", correct: "Park"  }
    // Add more questions here
];

let currentQuestionIndex = 0;

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    if (question.type === "choice") {
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.onclick = () => selectAnswer(answer);
            answersDiv.appendChild(button);
        });
    } else if (question.type === "input") {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'inputAnswer';
        input.placeholder = 'Type your answer here';
        answersDiv.appendChild(input);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.onclick = () => selectAnswer(document.getElementById('inputAnswer').value.trim());
        answersDiv.appendChild(submitButton);
    }

    // Disable the next button initially
    document.getElementById('nextButton').disabled = true;
}

function selectAnswer(answer) {
    const isCorrect = answer.toLowerCase() === questions[currentQuestionIndex].correct.toLowerCase();
    document.getElementById('result').textContent = isCorrect ? "Correct! Click 'Next' to continue." : "Try again!";
    document.getElementById('nextButton').disabled = !isCorrect;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        document.getElementById('result').textContent = '';
    } else {
        showFinalPage();
    }
}

function showFinalPage() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = "<h1>Happy Anniversary!</h1>";

    // Add a personalized note
    const note = document.createElement('p');
    note.textContent = "Here's to another wonderful year together! [Your long note here...]";
    note.style.textAlign = 'left'; // Optional: style as needed
    gameDiv.appendChild(note);

    // Add images
    const images = ["image1.jpg", "image2.jpg"]; // Replace with your image file names
    images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '100%'; // Optional: adjust styles as needed
        img.style.marginTop = '20px';
        gameDiv.appendChild(img);
    });
}

displayQuestion();