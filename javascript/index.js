// const symbols = []
let flippedTiles = 0;
// const deck = [a, a, b, b, c, c, d, d, e, e, f, f, g, g]
// const cards = document.querySelectorAll(".game-card")
const gameBoard = document.getElementsByClassName("game-container")[0]

function flip(e){
  if (flippedTiles <= 2) {
    if (e.target.classList.contains("game-card")) {
      e.target.classList.toggle("game-card-up")
    }
  }
}
gameBoard.addEventListener('click', flip)
