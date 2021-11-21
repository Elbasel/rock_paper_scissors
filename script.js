function chooseRandom(choices) {
    // returns a random choice from a collection
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getUserHand() {
    // returns either 'rock', 'paper', 'scissors' or null
    let userInput = prompt('Rock, Paper or Scissors?').toLowerCase();
    return (VALID_HANDS.includes(userInput) ? userInput : null);
}


function getRandomHand() {
    // return a random hand
    let choice = chooseRandom(VALID_HANDS)
    return choice 
}

function getWinningHand(hand_1, hand_2) {
    // return the winning hand
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

function getWinner(playerHand, computerHand) {
    // returns either 'tie', 'player' or computer
    // arguments order matter!
    let winningHand = getWinningHand(playerHand, computerHand)

    if (winningHand === null) {
        return 'tie'
    }
    else if (playerHand === winningHand) {
        return 'player'
    }
    else {
        return 'computer'
    }

}

function playRound() {
    let userInput = getUserHand();
    while (userInput === null) {
        alert('Invalid Input, Please try again.')
        userInput = getUserHand()
    }
    
    let computerInput = getRandomHand()

    let winner = getWinner(userInput, computerInput)

    switch (winner) {
        case 'tie':
            console.log('%cIt\'s a tie.', REGULAR_CSS + 'background: grey;');
            break
        case 'player':
            console.log('%cYou won!', REGULAR_CSS + 'background: green;')
            break
        case 'computer':
            console.log('%cYou lost!', REGULAR_CSS + 'background: red;')
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
        winner = playRound()

        if (winner === 'player') {playerScore++}
        if (winner === 'computer') {computerScore++}

        console.log(`%cPlayer: ${playerScore}`, SUB_HEADER_CSS);
        console.log(`%cComputer: ${computerScore}`, SUB_HEADER_CSS);
    }

    if (playerScore > computerScore) {
        console.log(`%cYou won with a total of ${playerScore} wins!`, HEADER_CSS + 'background: green;')
    }
    else if (playerScore < computerScore) {
        console.log(`%cComputer won with a total of ${computerScore} wins!`, HEADER_CSS + 'background: red;')
    }
    else {
        console.log(`%cIt's a tie! ${playerScore}-${computerScore}`, HEADER_CSS + 'background: grey;')
    }
}

const MAX_ROUNDS = 5
const VALID_HANDS = ['rock', 'paper', 'scissors'];
const REGULAR_CSS = 'color:#fff; font-family:\'Ubuntu\'; font-weight:100; font-size:18px;'
const HEADER_CSS = 'color:#fff; font-family:\'Ubuntu\'; display: block;font-weight:bold; font-size:48px;'
const SUB_HEADER_CSS = 'color:#fff; font-family:\'Ubuntu\'; font-weight:100; font-size:24px;'
playgame()
