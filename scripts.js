let humanScore = 0;
let computerScore = 0;
function Play() {
    let playerChoice = Playerchoice();
    let computerChoice = getComputerChoice();
    console.log("Player chose:", playerChoice);
    document.getElementById("HumanChoice").textContent= playerChoice;
    console.log("Computer chose:", computerChoice);
    document.getElementById("ComputerChose").textContent= computerChoice;
    WhoWin(playerChoice, computerChoice);
    
    console.log("Player Score:", humanScore);
    console.log("Computer Score:", computerScore);
    document.getElementById("humanScore").textContent = humanScore;
    document.getElementById("computerScore").textContent = computerScore;
    function finish(delay){
    if (humanScore === 3 || computerScore === 3) {
        console.log("Game finished");
        setTimeout(function(){
            location.reload();}
            ,delay) ;
        }
        }  
           finish(5000);
    }       
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    let PCChoice = getRandomInt(3);
    if (PCChoice === 2) {
        return "Scissors";
    } else if (PCChoice === 1) {
        return "Rock";
    } else {
        return "Paper";
    }
}
function Playerchoice() {
    let HumanChoice = prompt("Choose Wisely");
    return HumanChoice;
}
function WhoWin(playerChoice, computerChoice) {
    if (playerChoice === "Paper" && computerChoice === "Rock") {
        humanScore++;
        console.log("You win! Paper beats Rock");
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
        humanScore++;
        console.log("You win! Scissors beats Paper");
    } else if (playerChoice === "Rock" && computerChoice === "Scissors") {
        humanScore++;
        console.log("You win! Rock beats Scissors");
    } else if (playerChoice === computerChoice) {
        console.log("It's a tie!");
    } else {
        computerScore++;
        console.log("You lose!");
    }
}
function buttonClick(){
    console.log("button clicked");
    Play();
}
const button = document.getElementById("Play");