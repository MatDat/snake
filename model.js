import Queue from "./queue.js";

class SnakeBody {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

export default class Model {
  constructor(controller, boardHeight, boardWidth) {
    this.controller = controller;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.snake = new Queue();
    this.grid = [];
    this.berryLocation = { berryRow: 0, berryCol: 0 };
    this.direction = "RIGHT"; // Standardretning
  }

  setupSnake() {
    // Start snake på 3
    this.snake.enqueue(new SnakeBody(5, 5));
    this.snake.enqueue(new SnakeBody(5, 6));
    this.snake.enqueue(new SnakeBody(5, 7));
  }

  setupGrid(boardHeight, boardWidth) {
    this.setupSnake();
    for (let i = 0; i < boardHeight; i++) {
      this.grid[i] = [];
      for (let j = 0; j < boardWidth; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  generateBerry() {
    let numRows = this.grid.length;
    let numCols = this.grid[0].length;

    do {
      this.berryLocation.berryRow = Math.floor(Math.random() * numRows);
      this.berryLocation.berryCol = Math.floor(Math.random() * numCols);
    } while (
      this.isSnakeBody(this.berryLocation.berryRow, this.berryLocation.berryCol) // Undgår at placerer på slangen
    );

    this.grid[this.berryLocation.berryRow][this.berryLocation.berryCol] = 2; // Placerer bærret
  }

  isSnakeBody(row, col) {
    let node = this.queue.list.head;
    while (node) {
      if (node.data.row === row && node.data.col === col) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  // Tilføjelse af et nyt segment foran baseret på den nuværende retning
  moveSnake() {
    let head = this.snake.peek();
    let newHead;

    switch (this.direction) {
      case "RIGHT":
        newHead = new SnakeBody(head.row, head.col + 1);
        break;
      case "LEFT":
        newHead = new SnakeBody(head.row, head.col - 1);
        break;
      case "UP":
        newHead = new SnakeBody(head.row - 1, head.col);
        break;
      case "DOWN":
        newHead = new SnakeBody(head.row + 1, head.col);
        break;
    }

    this.snake.enqueue(newHead); // Tilføj det nye hoved

    // Denne del fjerner slangehalen, medmindre 'growSnake' sættes til true efter at have spist et bær
    if (!this.growSnake) {
      this.snake.dequeue();
    } else {
      this.growSnake = false; // Resetter growSnake flaget
    }
  }

  // Metode til at markere, at slangen skal vokse efter næste bevægelse (dvs. ikke fjerne halen)
  growSnake() {
    this.growSnake = true;
  }

  updateGame() {
    // Beregn det nye hoveds position baseret på den nuværende retning
    const newHead = this.calculateNewHeadPosition();

    // Tjek for kollisioner: Mure og sig selv
    if (this.checkForCollision(newHead)) {
      // Håndter kollision (f.eks. stop spillet eller andet)
      console.log("Game Over");
      return;
    }

    // Tjek om slangen har spist et bær
    if (this.hitBerry(newHead)) {
      // Spis bæret: Vokse og generere et nyt bær
      this.growSnake();
      this.generateBerry();
    } else {
      // Ingen bær spist: Fjern halen
      this.snake.dequeue();
    }

    // Tilføj det nye hoved til slangen
    this.snake.enqueue(newHead);

    // Opdater spillepladen med den nye slange position og bær
    this.updateGrid();
  }

  calculateNewHeadPosition() {
    // Her skal du beregne og returnere det nye hoveds position baseret på slangen retning
    // Dette er meget afhængigt af, hvordan du har implementeret slangen og dens bevægelse
  }

  checkForCollision(newHead) {
    // Her skal du tjekke, om det nye hoved kolliderer med murene eller med slangen selv
    // Returner true, hvis der er en kollision (som vil ende spillet), ellers false
  }

  hitBerry(newHead) {
    // Tjek, om det nye hoveds position matcher bærrets position
    // Returner true, hvis ja (så slangen spiser bærret), ellers false
  }

  growSnake() {
    // Denne metode indikeres, at slangen har spist et bær og ikke skal fjerne halen i næste bevægelse
    // Afhængigt af din implementering, kan dette håndteres forskelligt
  }

  updateGrid() {
    // Opdater spillepladen baseret på slangen og bærrets position
    // Dette kan inkludere at nulstille grid'et og derefter genplacere slangen og bærret
  }
}
