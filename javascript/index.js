
let flippedTiles = 0;
const stars = document.getElementsByClassName("fa-star");
const myRating = document.getElementsByClassName("stars");
const cards = document.getElementsByClassName("game-card");
const flippedCards = document.getElementsByClassName("game-card-up");
const winningCards = document.getElementsByClassName("game-card-winner");
const symbols = document.getElementsByClassName("flipped");
const board = document.getElementById("board");
const gameOver = document.getElementById("game-over");
const playAgain = document.getElementById("play-again");
const button = document.getElementById("button");
const timer = document.getElementById("timer");
const playerMoves = document.getElementById("moves");
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
};
const star4 = document.getElementById("star-4");
const star3 = document.getElementById("star-3");
const star2 = document.getElementById("star-2");
const star1 = document.getElementById("star-1");
const rating = document.getElementById("rating");
const timeElapsed = document.getElementById("time-elapsed")
let minutes = document.getElementById("min");
let seconds0 = document.getElementById("sec0");
let seconds1 = document.getElementById("sec1");
let gameTimer = null;
let noMatch = 0;
let moves = 0;

function reset() {
  const startingTime = performance.now();
  //remove winner board
  board.classList.remove("win-container")
  //remove play again button
  playAgain.style.display = "none"
  button.style.display = "none"
  //remove winning card class for all cards / display orignal cards
  for(let i=0; i<cards.length; i++){
    cards[i].style.display = "block"
    cards[i].classList.remove("game-card-winner")
    cards[i].classList.remove("game-card-up")
    symbols[i].style.display = "block"
    symbols[i].style.visibility = "hidden"
  }
  //reset no matches card count
  noMatch = 0;
  //reset player moves
  moves = 0;
  playerMoves.innerHTML = moves;
  //reset empty stars back to filled
  for(let i=0; i<4; i++){
  if(stars[i].classList.contains("far")){
    stars[i].classList.remove("far")
    stars[i].classList.add("fas")
  }
  }

  //reset timer
  clearInterval(gameTimer);
  gameTimer = null;
  minutes.innerHTML = 0;
  seconds0.innerHTML = 0;
  seconds1.innerHTML = 0;

  //reset flipped card count
  flippedTiles = 0;

  //shuffle cards
  shuffle()
  // const endingTime = performance.now();
  // console.log(endingTime - startingTime)

}

function shuffle(){
  //shuffle deck
  deck.sort(function() {return 0.5 - Math.random()});
  for(let i=0; i<cards.length; i++){
    //if the deck's symbol is in colors, style the symbol with that color
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
      //start timer on click
      if(gameTimer === null){
        setTimer()
      }


      //flip card up
      e.target.classList.add("game-card-up");

      //show card value
      e.target.firstChild.style.visibility = "visible";
      flippedTiles++
    }
  }
  //when 2 cards have been flipped check if they match
  if(flippedTiles === 2){
    moves += 1
    playerMoves.innerHTML = moves;
    isMatch(e)
    if(winningCards.length === deck.length){
      winner()
    }
    }
  }


function isMatch(e){
  //check both cards have game-card-up class
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
        //set delay to prevent card flipping too soon
        setTimeout(function() {
          flippedTiles = 0;
        }, 1000)
        //increase number of no matches
        noMatch += 1
        //change classes every 3rd time there is a no match
        switch(noMatch){
          case 3:
            star4.classList.remove("fas")
            star4.classList.add("far")
            break;
          case 6:
            star3.classList.remove("fas")
            star3.classList.add("far")
            break;
          case 9:
            star2.classList.remove("fas")
            star2.classList.add("far")
            break;
          case 12:
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
  //add winner class to board
  board.classList.add("win-container");
  //change display to show winner animation
  playAgain.style.display = "flex";
  //show stars rating
  rating.style.display = "block";
  rating.innerHTML = myRating[0].innerHTML;
  //show players time
  timeElapsed.style.display = "block";
  timeElapsed.innerHTML = `You won in ${minutes.innerHTML} min ${seconds0.innerHTML}${seconds1.innerHTML} seconds in ${playerMoves.innerHTML} moves!`

  //wait 3 seconds before showing play again button
  setTimeout(function() {
    button.style.display = "block"
  }, 3000)

}



function setTimer() {
   gameTimer = setInterval(function () {
    let sec0 = parseInt(seconds0.innerHTML)
    let sec1 = parseInt(seconds1.innerHTML)
    let min = parseInt(minutes.innerHTML)
    sec1++
     if(sec1 > 9){
       sec0 += 1
       sec1 = 0
     }
     if(sec0 > 5){
       min =+ 1
       sec0 = 0
       sec1 = 0
     }
     //timer stops at 15 min and displays TIMED OUT msg
     if(min === 15){
       clearInterval(gameTimer)
       timer.innerHTML = "TIMED OUT"
     }
    seconds0.innerHTML = sec0
    seconds1.innerHTML = sec1
    minutes.innerHTML = min

  }, 1000)
}


board.addEventListener('click', flip);

shuffle();
