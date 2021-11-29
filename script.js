const capitalize = (str, lower = false) =>
    // returns capitalized string
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())


function chooseRandom(choices) {
    // returns a random choice from a collection
    var index = Math.floor(Math.random() * choices.length)
    return choices[index]
}


function getWinningHand(hand_1, hand_2) {
    // returns the winning hand
    let handIndex = VALID_HANDS.indexOf(hand_1)

    // get the previous value in the VALID_HANDS array
    let weakerHand = VALID_HANDS.slice(handIndex - 1)[0]
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

function playRound(playerHand) {
    // starts a round and returns round winner
    roundNumber++

    let computerHand = chooseRandom(VALID_HANDS)
    let winner = getWinner(playerHand, computerHand)

    updateHandImages(playerHand, computerHand)

    switch(winner) {
        case 'tie':
            winnerArea.innerHTML = 'It\'s <br> a Tie!'
            tieScore++
            break
        case 'player':
            winnerArea.innerHTML = 'You <br> Win!'
            playerScore++
            break
        case 'computer':
            winnerArea.innerHTML = 'The Computer Won!'
            computerScore++
    }

    playerScoreOutput.textContent = playerScore
    computerScoreOuput.textContent = computerScore
    tieScoreOutput.textContent = tieScore
    

    roundNumberOuput.textContent = `Round ${roundNumber}`
}


function updateHandImages(playerChoice, ComputerChoice) {
    playerHand.setAttribute('src', `images/${playerChoice}.png`)
    ComputerHand.setAttribute('src', `images/${ComputerChoice}.png`)
} 

function reset() {
    playerScore = computerScore = tieScore = 0;
    roundNumber = 1;
    updateHandImages('paper', 'paper')
    playerScoreOutput.textContent = playerScore
    computerScoreOuput.textContent = computerScore
    tieScoreOutput.textContent = tieScore
    

    roundNumberOuput.textContent = `Round ${roundNumber}`
    winnerArea.textContent = '';
}


const VALID_HANDS = ['rock', 'paper', 'scissors']

const playerHand = document.getElementById('first-hand')
const ComputerHand = document.getElementById('second-hand')
const winnerArea = document.getElementById('winner')

const rock = document.getElementById('rock')
rock.addEventListener('click', () => playRound('rock'))

const paper = document.getElementById('paper')
paper.addEventListener('click', () => playRound('paper'))

const scissors = document.getElementById('scissors')
scissors.addEventListener('click', () => playRound('scissors'))

let playerScore, computerScore, tieScore, roundNumber
roundNumber = 1
playerScore = computerScore = tieScore = 0


const playerScoreOutput = document.getElementById('first-player-score')
const computerScoreOuput = document.getElementById('second-player-score')
const tieScoreOutput = document.getElementById('tie-score')
const roundNumberOuput = document.getElementById('round-number')
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', () => reset())