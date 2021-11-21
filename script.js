function chooseRandom(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getUserInput() {

    let userInput = prompt('Rock, Paper or Scissors?').toLowerCase();
    return (VALID_HANDS.includes(userInput) ? userInput : null);
}


function generateComputerInput() {
    let choice = chooseRandom(VALID_HANDS)
    return choice 
}

function getWinningHand(hand_1, hand_2) {
    // debugger

    let handIndex = VALID_HANDS.indexOf(hand_1)

    let weakerHand = VALID_HANDS.slice(handIndex - 1)[0];
    if (hand_2 === weakerHand) {
        return hand_1
    }
    else if (hand_2 === hand_1) {
        return null
    }
    else {
        return hand_2
    }
}

function getWinner(userHand, computerHand) {
    let winningHand = getWinningHand(userHand, computerHand)

    if (winningHand === null) {
        return 'tie'
    }
    else if (userHand === winningHand) {
        return 'player'
    }
    else {
        return 'computer'
    }

}

function playRound() {
    let userInput = getUserInput();
    while (userInput === null) {
        alert('Invalid Input, Please try again.')
        userInput = getUserInput()
    }
    
    let computerInput = generateComputerInput()

    let winner = getWinner(userInput, computerInput)

    switch (winner) {
        case 'tie':
            console.log('%cIt\'s a tie.', REGULAR_CSS);
            break
        case 'player':
            console.log('%cYou won!', REGULAR_CSS)
            break
        case 'computer':
            console.log('%cYou lost!', REGULAR_CSS)
            break
    }
    console.log(`%cComputer chose ${computerInput}`, REGULAR_CSS)

    return winner
}


function playgame(rounds=MAX_ROUNDS) {
    console.log(`%c${rounds} round game starting.`, HEADER_CSS);
    let playerScore, computerScore;

    playerScore = computerScore = 0;

    for (let i = 0; i < rounds; i++) {
        console.log(`%cPlayer: ${playerScore}`, SUB_HEADER_CSS);
        console.log(`%cComputer: ${computerScore}`, SUB_HEADER_CSS);
        winner = playRound()

        if (winner === 'player') {playerScore++}
        if (winner === 'computer') {computerScore++}

    }

    if (playerScore > computerScore) {
        console.log(`%cYou won with a total of ${playerScore} wins!`, HEADER_CSS)
    }
    else if (playerScore < computerScore) {
        console.log(`%cComputer won with a total of ${computerScore} wins!`, HEADER_CSS)
    }
    else {
        console.log(`%cIt's a tie! ${playerScore}-${computerScore}`)
    }
}

const MAX_ROUNDS = 5
const VALID_HANDS = ['rock', 'paper', 'scissors'];
const REGULAR_CSS = 'color:#fff; font-family:\'Ubuntu\'; font-weight:100; font-size:18px;'
const HEADER_CSS = 'color:#fff; font-family:\'Ubuntu\'; display: block;font-weight:bold; font-size:48px;'
const SUB_HEADER_CSS = 'color:#fff; font-family:\'Ubuntu\'; font-weight:100; font-size:24px;'
playgame()
