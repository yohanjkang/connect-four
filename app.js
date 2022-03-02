// DOM Elements
const allCells = document.querySelectorAll(".cell:not(.row-top)");
const topCells = document.querySelectorAll(".cell.row-top");
const resetButton = document.querySelector(".reset");
const statusSpan = document.querySelector(".status");

// columns
const column0 = [
  allCells[35],
  allCells[28],
  allCells[21],
  allCells[14],
  allCells[7],
  allCells[0],
  topCells[0],
];
const column1 = [
  allCells[36],
  allCells[29],
  allCells[22],
  allCells[15],
  allCells[8],
  allCells[1],
  topCells[1],
];
const column2 = [
  allCells[37],
  allCells[30],
  allCells[23],
  allCells[16],
  allCells[9],
  allCells[2],
  topCells[2],
];
const column3 = [
  allCells[38],
  allCells[31],
  allCells[24],
  allCells[17],
  allCells[10],
  allCells[3],
  topCells[3],
];
const column4 = [
  allCells[39],
  allCells[32],
  allCells[25],
  allCells[18],
  allCells[11],
  allCells[4],
  topCells[4],
];
const column5 = [
  allCells[40],
  allCells[33],
  allCells[26],
  allCells[19],
  allCells[12],
  allCells[5],
  topCells[5],
];
const column6 = [
  allCells[41],
  allCells[34],
  allCells[27],
  allCells[20],
  allCells[13],
  allCells[6],
  topCells[6],
];
const columns = [column0, column1, column2, column3, column4, column5, column6];

// rows
const topRow = [
  topCells[0],
  topCells[1],
  topCells[2],
  topCells[3],
  topCells[4],
  topCells[5],
  topCells[6],
];
const row0 = [
  allCells[0],
  allCells[1],
  allCells[2],
  allCells[3],
  allCells[4],
  allCells[5],
  allCells[6],
];
const row1 = [
  allCells[7],
  allCells[8],
  allCells[9],
  allCells[10],
  allCells[11],
  allCells[12],
  allCells[13],
];
const row2 = [
  allCells[14],
  allCells[15],
  allCells[16],
  allCells[17],
  allCells[18],
  allCells[19],
  allCells[20],
];
const row3 = [
  allCells[21],
  allCells[22],
  allCells[23],
  allCells[24],
  allCells[25],
  allCells[26],
  allCells[27],
];
const row4 = [
  allCells[28],
  allCells[29],
  allCells[30],
  allCells[31],
  allCells[32],
  allCells[33],
  allCells[34],
];
const row5 = [
  allCells[35],
  allCells[36],
  allCells[37],
  allCells[38],
  allCells[39],
  allCells[40],
  allCells[41],
];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

let gameIsLive = true;
let yellowIsNext = true;

const getCellLocation = (cell) => {
  const classList = [...cell.classList];
  const rowIndex = +classList[1][4];
  const colIndex = +classList[2][4];

  return [rowIndex, colIndex];
};

const getFirstOpenCell = (columnIndex) => {
  const column = columns[columnIndex];
  const trimmedColumn = column.slice(0, 6);
  const test = trimmedColumn.filter((cell) => {
    return (
      !cell.classList.contains("yellow") && !cell.classList.contains("red")
    );
  });

  if (test.length > 0) return test[0];

  return null;
};

const getColorOfCell = (cell) => {
  if (cell.classList.contains("yellow")) return "yellow";
  if (cell.classList.contains("red")) return "red";
  return null;
};

const checkStatusOfGame = (cell) => {
  const color = getColorOfCell(cell);

  const [rowIndex, colIndex] = getCellLocation(cell);

  let winningCells = [cell];

  // check horizontally
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;
  while (colToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck--;
    } else break;
  }

  colToCheck = colIndex + 1;
  while (colToCheck <= 6) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck++;
    } else break;
  }

  if (checkWinningCells(winningCells)) return;
  winningCells = [cell];

  // check vertically
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;
  while (rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
    } else break;
  }

  rowToCheck = rowIndex + 1;
  while (rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
    } else break;
  }

  if (checkWinningCells(winningCells)) return;
  winningCells = [cell];

  // check diagonally (bottom left -> top right)
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck--;
    } else break;
  }

  rowToCheck = rowIndex - 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck++;
    } else break;
  }

  if (checkWinningCells(winningCells)) return;
  winningCells = [cell];

  // check diagonally (bottom right -> top left)
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck--;
    } else break;
  }

  rowToCheck = rowIndex + 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck++;
    } else break;
  }

  checkWinningCells(winningCells);
};

const checkWinningCells = (winningCells) => {
  if (winningCells.length < 4) return false;

  gameIsLive = false;
  winningCells.forEach((cell) => {
    cell.classList.add("win");
  });

  statusSpan.textContent = `${yellowIsNext ? "Yellow" : "Red"} wins!`;

  return true;
};

rows.forEach((row) => {
  row.forEach((cell) => {
    // on hover
    cell.addEventListener("mouseover", (e) => {
      if (!gameIsLive) return;

      const cell = e.target;
      const [rowIndex, colIndex] = getCellLocation(cell);

      const topCell = topCells[colIndex];

      topCell.classList.add(yellowIsNext ? "yellow" : "red");
    });

    // on unhover
    cell.addEventListener("mouseout", (e) => {
      const cell = e.target;
      const [rowIndex, colIndex] = getCellLocation(cell);

      const topCell = topCells[colIndex];

      topCell.classList.remove("yellow", "red");
    });

    // on click
    cell.addEventListener("click", (e) => {
      if (!gameIsLive) return;

      const cell = e.target;
      const [rowIndex, colIndex] = getCellLocation(cell);

      const openCell = getFirstOpenCell(colIndex);

      if (!openCell) return;

      openCell.classList.add(yellowIsNext ? "yellow" : "red");

      checkStatusOfGame(openCell);

      yellowIsNext = !yellowIsNext;

      // update hovering chip
      const topCell = topCells[colIndex];
      topCell.classList.remove("yellow", "red");
      if (gameIsLive) topCell.classList.add(yellowIsNext ? "yellow" : "red");
    });
  });
});

resetButton.addEventListener("click", (e) => {
  gameIsLive = true;
  yellowIsNext = true;
  statusSpan.textContent = "";

  rows.forEach((row) => {
    row.forEach((cell) => {
      cell.classList.remove("yellow", "red", "win");
    });
  });
});
