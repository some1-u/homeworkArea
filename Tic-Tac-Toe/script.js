let xTurn = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let turnCount = 0;
const statusText = document.querySelector("#status");
const squares = document.querySelectorAll(".square");


const checkWinner = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;
  winningConditions.forEach((condition) => {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winner = gameBoard[a];
    }
  });

  return winner;
};

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (gameBoard[index] || checkWinner()) return;
    gameBoard[index] = xTurn ? "X" : "O";
    square.textContent = gameBoard[index];
    xTurn = !xTurn;
    turnCount++;
    const winner = checkWinner();
    if (winner) {
      statusText.textContent = `Winner: ${winner}`;
      return;
    }
    if (turnCount === 9) {
      statusText.textContent = "It's a tie!";
      return;
    }
    statusText.textContent = xTurn ? "X's turn" : "O's turn";
  });
});