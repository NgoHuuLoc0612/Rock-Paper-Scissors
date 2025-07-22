// DOM Elements
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const userChoiceDisplay = document.getElementById('user-choice-display');
const computerChoiceDisplay = document.getElementById('computer-choice-display');
const resultMessage = document.getElementById('result-message');
const choiceButtons = document.querySelectorAll('.choice-button');
const resetBtn = document.getElementById('reset-button');

// Game Variables
let userScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors']; // Define possible choices

/**
 * Gets a random choice for the computer.
 * @returns {string} - 'rock', 'paper', or 'scissors'.
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determines the winner of a round.
 * @param {string} userChoice - The user's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {string} - 'win', 'lose', or 'tie'.
 */
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'tie';
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

/**
 * Updates the score based on the result.
 * @param {string} result - The result of the round ('win', 'lose', or 'tie').
 */
function updateScore(result) {
    if (result === 'win') {
        userScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
}

/**
 * Updates the UI to display choices and result message.
 * @param {string} userChoice - The user's choice.
 * @param {string} computerChoice - The computer's choice.
 * @param {string} result - The result of the round ('win', 'lose', or 'tie').
 */
function updateUI(userChoice, computerChoice, result) {
    userChoiceDisplay.textContent = `Your Choice: ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}`;
    computerChoiceDisplay.textContent = `Computer Choice: ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;

    let message;
    let messageClass;

    switch (result) {
        case 'tie':
            message = "It's a tie!";
            messageClass = 'tie';
            break;
        case 'win':
            message = "You win this round!";
            messageClass = 'win';
            break;
        case 'lose':
            message = "You lose this round!";
            messageClass = 'lose';
            break;
        default:
            message = "Something went wrong.";
            messageClass = '';
    }

    resultMessage.textContent = message;
    // Remove previous result classes and add the new one for styling
    resultMessage.classList.remove('win', 'lose', 'tie');
    if (messageClass) {
        resultMessage.classList.add(messageClass);
    }
}

/**
 * Plays a single round of Rock Paper Scissors.
 * @param {string} userChoice - The user's choice ('rock', 'paper', or 'scissors').
 */
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    updateScore(result);
    updateUI(userChoice, computerChoice, result);
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
    userChoiceDisplay.textContent = "Your Choice: -";
    computerChoiceDisplay.textContent = "Computer Choice: -";
    resultMessage.textContent = "Choose your weapon!";
    resultMessage.classList.remove('win', 'lose', 'tie'); // Clean up result message styles
}

// Event Listeners for choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const userChoice = this.dataset.choice; // Get the choice from data-attribute
        playRound(userChoice);
    });
});

// Event Listener for the reset button
resetBtn.addEventListener('click', resetGame);

// Initial message on load
resultMessage.textContent = "Welcome to Rock Paper Scissors!";