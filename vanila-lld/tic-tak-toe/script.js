// Tic-Tac-Toe Game Script
const input = document.querySelector("input");
const board = document.getElementById("board");
const player = document.querySelector(".current-player");

const createGrid = (n) => {
  board.innerHTML = ""; // Clear existing content
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < n; i++) {
      const box = document.createElement("div");
      box.className = "box";
      row.appendChild(box);
    }
    fragment.appendChild(row);
  }

  board.appendChild(fragment);
};

const getClickedCell = (event) => {
  const box = event.target;
  if (box.classList.contains("box")) {
    return box;
  }
  return null;
};

const handleCellClick = (event) => {
  const clickedCell = getClickedCell(event);
  if (clickedCell && !clickedCell.textContent) {
    clickedCell.textContent = player.textContent;
    const winner = checkWinner(input.value);
    if (winner) {
      alert(`Player ${winner} wins!`);
      const cells = document.querySelectorAll(".box");
      cells.forEach((cell) => (cell.textContent = "")); // Clear all cells after win
    } else {
      // Toggle current player
      player.textContent = player.textContent === "X" ? "O" : "X";
    }
  }
};

const allEqual = (arr) => {
  const ele = arr[0];
  return ele && arr.every((val) => val === ele);
};

const checkWinner = () => {
  const rows = document.querySelectorAll(".row");
  const n = input.value; // Default to 3 if input is empty
  // Rows
  for (let i = 0; i < n; i++) {
    const row = Array.from(rows[i].children).map((e) => e.textContent);
    if (allEqual(row)) {
      return row[0]; // Return the winner
    }
  }
  // Columns
  for (let i = 0; i < n; i++) {
    const col = Array.from(rows)
      .map((row) => row.children[i])
      .map((e) => e.textContent);
    if (allEqual(col)) {
      return col[0]; // Return the winner
    }
  }

  // Diagonals
  const mainDiagonal = Array.from(rows).map(
    (row, i) => row.children[i].textContent
  );
  if (allEqual(mainDiagonal)) {
    return mainDiagonal[0]; // Return the winner
  }

  const crossDiagonal = Array.from(rows).map(
    (row, i) => row.children[n - 1 - i].textContent
  );

  if (allEqual(crossDiagonal)) {
    return crossDiagonal[0]; // Return the winner
  }

  // If no winner found
  if (
    Array.from(rows).every((row) =>
      Array.from(row.children).every((cell) => cell.textContent)
    )
  ) {
    alert("It's a draw!");
    return null; // No winner, but it's a draw
  }

  return null; // No winner found
};

createGrid(3);
player.textContent = "X"; // Reset to player X
input.value = 3;

document.querySelector(".start").addEventListener("click", () => {
  const size = document.querySelector("input").value;
  if (isNaN(size) || size < 3 || size > 10) {
    alert("Please enter a valid grid size between 3 and 10.");
    return;
  }
  createGrid(size);
});

document.querySelector(".reset").addEventListener("click", () => {
  const cells = document.querySelectorAll(".box");
  cells.forEach((cell) => (cell.textContent = "")); // Clear all cells
  player.textContent = "X"; // Reset to player X
});

board.addEventListener("click", handleCellClick);
player.addEventListener("click", () => {
  player.textContent = player.textContent === "X" ? "O" : "X"; // Toggle player
});
