
let flippedTiles = 0;
const cards = document.querySelectorAll(".game-card");
const flippedCards = document.getElementsByClassName("game-card-up")
const gameBoard = document.getElementsByClassName("game-container");
// const cards = document.getElementsByClassName("game-card")
const symbols = document.getElementsByClassName("flipped");
const board = gameBoard[0];
const deck = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f", "g", "g", "h", "h"];


function shuffle(){
  deck.sort(function() {return 0.5 - Math.random()});
  for(let i=0; i<cards.length; i++){
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
    console.log(flippedCards.length)
    // if(flippedCards.length === deck.length){
    //   winner()
    // }
    }
  }


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
        flippedTiles = 0;
        console.log('a match');
      } else {
        console.log('try again');
        flippedTiles = 0;
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
}
board.addEventListener('click', flip);

shuffle();
