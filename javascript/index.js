
let flippedTiles = 0;
const cards = document.getElementsByClassName("game-card");
const flippedCards = document.getElementsByClassName("game-card-up")
const winningCards = document.getElementsByClassName("game-card-winner")
const symbols = document.getElementsByClassName("flipped");
const board = document.getElementById("board");
const gameOver = document.getElementById("game-over")
const playAgain = document.getElementById("play-again")
const button = document.getElementById("button")
const timer = document.getElementById("timer")
const deck = ["Հ", "Հ", "Ղ", "Ղ", "Ճ", "Ճ", "Վ", "Վ", "Ֆ", "Ֆ", "Մ", "Մ", "Պ", "Պ", "Չ", "Չ"];
const colors = {
  Հ : "red",
  Ղ : "blue",
  Ճ : "green",
  Վ : "purple",
  Ֆ : "orange",
  Մ : "teal",
  Պ : "black",
  Չ : "pink"
}

function reset() {
  board.classList.remove("win-container")
  playAgain.style.display = "none"
  for(let i=0; i<cards.length; i++){
    cards[i].style.display = "block"
    cards[i].classList.remove("game-card-winner")
    symbols[i].style.display = "block"
    symbols[i].style.visibility = "hidden"
  }
  //reset timer
clearInterval(gameTimer)

 //shuffle cards
  shuffle()
}

function shuffle(){
  //shuffle deck
  deck.sort(function() {return 0.5 - Math.random()});
  for(let i=0; i<cards.length; i++){
    //if the deck's letter is in colors, style the letter with that color
      for(let letter in colors){
        if(letter === deck[i]){
          symbols[i].style.color = colors[deck[i]]
        }
      }
      symbols[i].innerHTML = deck[i];
    }
}


function flip(e){
  if (flippedTiles < 2) {
    //if card clicked is down
    if (e.target.classList.contains("game-card")) {
      //flip card up
      e.target.classList.add("game-card-up");

      //show card value
      e.target.firstChild.style.visibility = "visible";
      flippedTiles++
    }
  }
  //when 2 cards have been flipped check if they match
  if(flippedTiles === 2){
    isMatch(e)
    if(winningCards.length === deck.length){
      winner()
    }
    }
  }

let noMatch = 0;
function isMatch(e){
  //only 2 cards have game-card-up class
    if(e.target.classList.contains("game-card-up")) {
      let flippedOne = flippedCards[0]
      let flippedTwo = flippedCards[1]
      //check if cards symbols match
      if(flippedOne.innerHTML === flippedTwo.innerHTML){
        flippedOne.classList.remove("game-card-up");
        flippedOne.classList.add("game-card-winner");
        flippedTwo.classList.remove("game-card-up");
        flippedTwo.classList.add("game-card-winner");
        //set flipped back to 0 so player can flip again
        flippedTiles = 0;
        console.log('a match');
      } else {
        console.log('try again');
        flippedTiles = 0;
        noMatch += 1
        console.log(noMatch)
        switch(noMatch){
          case 3:
            const star4 = document.getElementById("star-4");
            star4.classList.remove("fas")
            star4.classList.add("far")
            break;
          case 6:
            const star3 = document.getElementById("star-3");
            star3.classList.remove("fas")
            star3.classList.add("far")
            break;
          case 9:
            const star2 = document.getElementById("star-2");
            star2.classList.remove("fas")
            star2.classList.add("far")
            break;
          case 12:
            const star1 = document.getElementById("star-1");
            star1.classList.remove("fas")
            star1.classList.add("far")
            break;
        }
        //set delay on flipped card to 1s before it is flipped back down
        setTimeout( function() {
          flippedOne.classList.remove("game-card-up");
          flippedOne.firstChild.style.visibility = "hidden"
          flippedTwo.classList.remove("game-card-up");
          flippedTwo.firstChild.style.visibility = "hidden"
        }, 1000)


      }

  }
}

function winner () {
  console.log('winner')
  for(let i=0; i<winningCards.length; i++){
    //remove the cards from the game board
    winningCards[i].style.display = "none"
    symbols[i].style.display = "none"
  }
  //stop timer
  clearInterval(gameTimer)
  //add winner class to boarc
  board.classList.add("win-container");
  //change display to show winner animation
  playAgain.style.display = "flex";
  //wait 3 seconds before showing button
  setTimeout(function() {
    button.style.display = "block"
  }, 3000)

}

let gameTimer = null;
function setTimer() {
   gameTimer = setInterval(function () {
    let time = parseInt(timer.innerHTML)
    timer.innerHTML = time + 1

  }, 1000)
}


board.addEventListener('click', flip);

shuffle();
