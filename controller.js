"use strict";
import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.view = new View(this);
    this.boardHeight = 20;
    this.boardWidth = 30;
    this.model = new Model(this, this.boardHeight, this.boardWidth);
  }

  setupController() {
    console.log(`Controller RDY`);
    this.model.setupGrid(this.boardHeight, this.boardWidth);
    this.view.setupView();
    this.view.createBoardView(this.boardHeight, this.boardWidth);
    // this.gameLoop();
  }

  gameLoop() {
    setInterval(() => {
      // Antag at Model klassen har en metode updateGame som opdaterer slangen position og tjekker for bær
      this.model.updateGame();
      this.view.updateBoard(this.model.grid);
    }, 500);
  }

  setupControls() {
    window.addEventListener("keydown", (event) => {
      let newDirection = this.model.direction;
      switch (event.key) {
        case "ArrowUp":
          if (this.model.direction !== "DOWN") newDirection = "UP";
          break;
        case "ArrowDown":
          if (this.model.direction !== "UP") newDirection = "DOWN";
          break;
        case "ArrowLeft":
          if (this.model.direction !== "RIGHT") newDirection = "LEFT";
          break;
        case "ArrowRight":
          if (this.model.direction !== "LEFT") newDirection = "RIGHT";
          break;
      }
      this.model.direction = newDirection;
    });
  }
}

const controller = new Controller();
window.addEventListener("load", () => controller.setupController());
