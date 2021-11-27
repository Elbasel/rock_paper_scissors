const capitalize = (str, lower = false) =>
    // returns capitalized string
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());


function chooseRandom(choices) {
    // returns a random choice from a collection
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


function getplayerHand() {
    // returns either 'rock', 'paper', 'scissors' or null\
    let promptString = '';
    for (let i = 0; i < VALID_HANDS.length; i++) {
        if (i === VALID_HANDS.length - 1) {
            promptString += `or ${capitalize(VALID_HANDS[i])}`
        } 
        else {
            promptString += `${capitalize(VALID_HANDS[i])}, `
        }
    }
    let playerHand = prompt(promptString + ' ?').toLowerCase();
    return (VALID_HANDS.includes(playerHand) ? playerHand : null);
}


function getRandomHand() {
    // return a random hand
    let choice = chooseRandom(VALID_HANDS)
    return choice 
}

function getWinningHand(hand_1, hand_2) {
    // returns the winning hand
    let handIndex = VALID_HANDS.indexOf(hand_1)

    // get the previous value in the VALID_HANDS array
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
    // starts a round and returns round winner
    let playerHand = getplayerHand();
    while (playerHand === null) {
        alert('Invalid Input, Please try again.')
        playerHand = getplayerHand()
    }
    
    let computerHand = getRandomHand()

    let winner = getWinner(playerHand, computerHand)

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
    console.log(`%cYou chose: ${playerHand}`, REGULAR_CSS)
    console.log(`%cComputer chose: ${computerHand}`, REGULAR_CSS)

    return winner
}


function playgame(rounds=MAX_ROUNDS) {
    // start a game of {rounds} number of rounds
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
        console.log(`%cYou won with a score of ${playerScore} to ${computerScore}`, HEADER_CSS + 'background: green;')
    }
    else if (playerScore < computerScore) {
        console.log(`%cComputer won with a score of ${computerScore} to ${playerScore}`, HEADER_CSS + 'background: red;')
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
