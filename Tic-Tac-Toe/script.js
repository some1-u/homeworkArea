let xTurn = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let turnCount = 0;
const statusText = document.querySelector("#status");
const squares = document.querySelectorAll(".square");
const restartButton = document.querySelector("#restart");

function validBoard(board) {
  let xCount = 0;
  let oCount = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "X") xCount++;
    if (board[i] === "O") oCount++;
  }
  return xCount === oCount || xCount === oCount+1;
}

window.addEventListener("load", () => {
  const retrievedBoard = JSON.parse(localStorage.getItem("board"));
  if (retrievedBoard === null) return;
  if (!validBoard(retrievedBoard)) {
    localStorage.removeItem("board");
    return;
  }
  gameBoard = retrievedBoard;
  gameBoard.forEach((value, index) => {
    squares[index].textContent = value;
  });
  xTurn = gameBoard.filter((value) => value !== "").length % 2 === 0;
  turnCount = gameBoard.filter((value) => value !== "").length;
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
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      winner = gameBoard[a];
    }
  });

  return winner;
};

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (gameBoard[index] || checkWinner()) return;
    gameBoard[index] = xTurn ? "X" : "O";
    localStorage.setItem("board", JSON.stringify(gameBoard));
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

restartButton.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  turnCount = 0;
  xTurn = true;
  statusText.textContent = "X's turn";
  squares.forEach((square) => {
    square.textContent = "";
  });
  localStorage.removeItem("board");
});
