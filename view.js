export default class View {
  constructor(controller) {
    this.controller = controller;
  }

  setupView() {
    console.log(`View RDY`);
  }

  createBoardView(boardHeight, boardWidth) {
    let boardContainer = document.querySelector("#boardContainer");
    boardContainer.innerHTML = "";

    boardContainer.style.setProperty("--boardHeight", boardHeight);
    boardContainer.style.setProperty("--boardWidth", boardWidth);

    for (let row = 0; row < boardHeight; row++) {
      for (let col = 0; col < boardWidth; col++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-col", col);
        boardContainer.appendChild(cell);
      }
    }
  }

  updateBoard(grid) {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      let row = parseInt(cell.getAttribute("data-row"));
      let col = parseInt(cell.getAttribute("data-col"));
      if (grid[row][col] === 1) {
        // Snake body
        cell.style.backgroundColor = "#90df90";
      } else if (grid[row][col] === 2) {
        // Berry
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "#777"; // Empty cell
      }
    });
  }
}
