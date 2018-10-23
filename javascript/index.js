
let flippedTiles = 0;
const cards = document.querySelectorAll(".game-card");
const flippedCards = document.getElementsByClassName("game-card-up")
const winningCards = document.getElementsByClassName("game-card-winner")
const symbols = document.getElementsByClassName("flipped");
const board = document.getElementById("board");
const gameOver = document.getElementById("game-over")
const deck = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f", "g", "g", "h", "h"];
const colors = {
  a : "red",
  b : "blue",
  c : "green",
  d : "purple",
  e : "orange",
  f : "teal",
  g : "black",
  h : "pink"
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
    console.log(flippedCards.length)
    if(winningCards.length === deck.length){
      winner()
    }
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
        //set flipped back to 0 so player can flip again
        flippedTiles = 0;
        console.log('a match');
      } else {
        console.log('try again');
        flippedTiles = 0;
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
    winningCards[i].style.display = "none"
    symbols[i].style.display = "none"
  }
  board.style.display = "flex"
  board.style.width = "800px";
  board.style.height = "675px";
  gameOver.style.display = "inline";




}
board.addEventListener('click', flip);

shuffle();
