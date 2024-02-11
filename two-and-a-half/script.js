const questions = [
    { question: "Warm-up 1: Where did we go on our first date?",type: "choice", answers: ["Charidise Cafe", "College Park", "Thai Restaurant", "Kibo Sushi"], correct: "Thai Restaurant" },
    { question: "Warm-up 2: What's our first movie together?",type: "choice", answers: ["Kungfu Panda", "Brave", "Up", "Ratatouille"], correct: "Brave" },
    { question: "Warm-up 3: When was your first note for me",type: "choice", answers: ["23/6/2021", "25/12/2021", "21/06/2021", "19/06/2021"], correct: "21/06/2021" },
    { question: "Attention! Attention: You've finished your warm-ups!", type: "communication", message: "Special thanks to you for playing this game! From here onwards, it is the actual scavenger hunt! Please read the questions, they will hint at a digital location where I have left the code. Enter that code here to move forward" },
    { question: "Scavenger Hunt Clue 1 (Hint: Video): We were obsessed with some trivial, every day things. A (fake) friend of yours took advantage of that and you felt right into her trap.",type: "input", correct: "utantanu" },
    { question: "Scavenger Hunt Clue 2 (Hint: Image): Wandering in the harsh flurries and the brisk wind between Bangkok, Seoul, and Beijing, we found the irresitable ball of snow.", type: "input", correct: "tinimonbong"  },
    { question: "Scavenger Hunt Clue 3 (Hint: Image): Wandering in the harsh flurries and the brisk wind between Bangkok, Seoul, and Beijing, we found the irresitable ball of snow.", type: "input", correct: "tinimonbong"  }
    // Add more questions here
];

let currentQuestionIndex = 0;
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const nextButton = document.getElementById('nextButton');

    // Clear previous content
    document.getElementById('question').innerHTML = '';
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    // Reset the "Next" button for standard question behavior, if needed
    nextButton.onclick = () => { // Ensure this is correctly set every time
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showFinalPage();
        }
    };

    if (question.type === "communication") {
        // Display the communication message
        document.getElementById('question').innerHTML = `<p>${question.message}</p>`;
        nextButton.style.display = 'inline-block'; // Show the "Next" button
        nextButton.disabled = false; // Enable the "Next" button
    } else {
        document.getElementById('question').textContent = question.question;
        nextButton.style.display = 'none'; // Hide the "Next" button for questions until an answer is selected

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

        // Initial state for the result message and "Next" button
        document.getElementById('result').textContent = '';
        nextButton.disabled = true;
    }
}

// Adjust selectAnswer function as needed, ensuring it handles enabling the "Next" button correctly for questions.


function showCommunicationPage(message) {
    document.getElementById('question').textContent = "";
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = `<p>${message}</p>`;

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = nextQuestion;
    answersDiv.appendChild(nextButton);
}

function selectAnswer(answer) {
    const question = questions[currentQuestionIndex];
    if (question.type === "communication") {
        // No action required for communication type in selectAnswer
        return;
    }
    const isCorrect = answer.toLowerCase() === question.correct.toLowerCase();
    document.getElementById('result').textContent = isCorrect ? "Correct! Click 'Next' to continue." : "Try again!";
    if (isCorrect || question.type === "input") {
        document.getElementById('nextButton').disabled = false;
        document.getElementById('nextButton').style.display = 'inline-block'; // Show the "Next" button when the answer is correct
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showFinalPage();
    }
}

function showFinalPage() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = "<h1>Happy Anniversary!</h1>";

    // Add a personalized note
    const note = document.createElement('p');
    note.textContent = "Hanho babi! Hebbi Anniversary! It is almost 2 years 7 months since we started dating! This anniversary is extra special for multiple reasons: passing the 2.5 years mark, Valentines, being in Vietnam, ... etc. And it isn't over yet! Tomorrow, we're having a full-day date in Hanoi which I hope that you will enjoy! I just want to say that I love you bubi and I look forward to loving you more and more";
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