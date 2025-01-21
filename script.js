let cells = document.getElementsByClassName("cell");
let showWinner = document.querySelector(".winner");

let arrCells = Array.from(cells);

let xTurn = true;
let winnerFound = false;

arrCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerHTML === "") {
      cell.innerHTML = xTurn ? "X" : "O";
      xTurn = !xTurn;
      music();
      checkResult();
    }
  });
});

function music() {
  let audio = new Audio("sound/music.wav");
  audio.play();
}

function winnerMusic() {
  let audio = new Audio("sound/winner.wav");
  audio.play();
}

const checkResult = () => {
  const winningPttren = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const value = arrCells.map((cell) => cell.innerHTML);

  winningPttren.forEach((winPtrn) => {
    if (
      value[winPtrn[0]] !== "" &&
      value[winPtrn[0]] === value[winPtrn[1]] &&
      value[winPtrn[1]] === value[winPtrn[2]]
    ) {
      showWinner.innerHTML = value[winPtrn[0]] + " wins!";
      showWinner.style.color = "green";
      winPtrn.forEach((index) => {
        arrCells[index].style.color = "green";
      });
      disableCell();
      winnerFound = true;
      winnerMusic();
    }
  });
  matchDraw();
};

const matchDraw = () => {
  const value = arrCells.map((cell) => cell.innerHTML);
  const allCellsFilled = value.every((val) => val !== "");

  if (!winnerFound && allCellsFilled) {
    arrCells.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
    showWinner.innerHTML = "Match Draw";
  }
};

const disableCell = () => {
  arrCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
};

const enableCell = () => {
  arrCells.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
};

let resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", () => {
  arrCells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.color = "";
  });
  xTurn = true;
  enableCell();
  winnerFound = false;
  showWinner.innerHTML = "";
});
