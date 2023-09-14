class Board {
  constructor({
    offsetX = 0, offsetY = 0,
    cellSize = 10, cellColor1 = 0, cellColor2 = 255,
    dimX = 40, dimY = 40, aliveProb = 0.3
  } = {}) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.cellSize = cellSize;
    this.cellColor1 = cellColor1;
    this.cellColor2 = cellColor2;
    this.dimX = dimX;
    this.dimY = dimY;
    this.aliveProb = aliveProb;

    this.randomizeCells();

    // Useful for stopping simulation
    this.updateAllowed = true;

    // Draw pattern moveable with mouse
    this.currentPattern = null;
    this.currentPatternOffset = [-1, -1];
  }

  randomizeCells() {
    // Initialize cells 
    this.cells = [];
    for (let dummy_i = 0; dummy_i < this.dimX; dummy_i++) {
      let row = [];
      for (let dummy_j = 0; dummy_j < this.dimY; dummy_j++) {
        const rand = Math.random();
        row.push(
          rand <= this.aliveProb
        );
      }
      this.cells.push(row);
    }
  }

  calculateCellState(x, y) {

    const currently_alive = this.cells[x][y];
    let neighbors_alive = 0;

    for (
      let i = Math.max(0, x - 1);
      i < Math.min(this.dimX, x + 2);
      i++
    ) {
      for (
        let j = Math.max(0, y - 1);
        j < Math.min(this.dimY, y + 2);
        j++
      ) {
        if (i == x && j == y) continue;

        neighbors_alive = neighbors_alive + (
          this.cells[i][j] ? 1 : 0
        );
      }
    }

    //console.log(x,y,neighbors_alive);

    if (currently_alive && neighbors_alive < 2) return false;
    if (currently_alive && neighbors_alive < 4) return true;
    if (currently_alive) return false;
    if (neighbors_alive == 3) return true;
    return false;
  }

  getUpdatedRow(i) {
    let row = [];
    // Synchronous execution
    for (let j = 0; j < this.dimY; j++) {
      row.push(this.calculateCellState(i, j));
    }

    return row;
  }

  update(parallel = false) {

    // i.e. pause was pressed or a parallel process
    // is still being executed
    if (!this.updateAllowed) return;

    let new_cells = [];
    let promises = [];

    for (let i = 0; i < this.dimX; i++) {
      if (!parallel) {
        new_cells.push(this.getUpdatedRow(i));
      } else {
        promises.push(
          new Promise((resolve, _) => {
            new_cells[i] = this.getUpdatedRow(i);
          })
        );
      }
    }

    if (parallel) {
      (async () => {
        this.updateAllowed = false;
        await Promise.all(promises);
        this.cells = new_cells;
        this.updateAllowed = true;
      }
      )();
    } else {
      this.cells = new_cells;
    }
  }

  getPointedCell(mX, mY) {
    // Recall that coords get switched while
    // dealing with array's coords and visual coords
    const possible_x = Math.floor(
      (mX - this.offsetX) / this.cellSize
    );
    const possible_y = Math.floor(
      (mY - this.offsetY) / this.cellSize
    );

    if (
      possible_x < 0 || possible_x >= this.dimX ||
      possible_y < 0 || possible_y >= this.dimY
    ) return [-1, -1];

    return [possible_x, possible_y];
  }

  draw(sk) {
    for (let i = 0; i < this.dimX; i++) {
      for (let j = 0; j < this.dimY; j++) {

        const fillColor = this.cells[i][j] ? this.cellColor1 : this.cellColor2;

        // Color can be w
        if(Array.isArray(fillColor)){
          sk.fill(
            fillColor[0], fillColor[1], fillColor[2]
          );  
        } else {
          sk.fill( fillColor );
        }
        
        sk.rect(
          this.offsetX + i * this.cellSize,
          this.offsetY + j * this.cellSize,
          this.cellSize, this.cellSize
        )
      }
    }

    const [x, y] = this.getPointedCell(
      sk.mouseX, sk.mouseY
    );

    if (!this.currentPattern && x != -1 && y != -1) {
      const cell = this.cells[x][y];

      if (!cell)
        sk.fill(0, 255, 0);
      else
        sk.fill(255, 0, 0);

      sk.rect(
        this.offsetX + x * this.cellSize,
        this.offsetY + y * this.cellSize,
        this.cellSize, this.cellSize
      )
    }

    // Draw pattern blueprints
    this.drawPattern(sk);
  }

  onMouseClick(
    mX, mY
  ) {
    const [x, y] = this.getPointedCell(mX, mY);

    // Check if pattern can be drawn
    if (x == -1 || y == -1) return;

    if (this.currentPattern == null) {
      this.cells[x][y] = !this.cells[x][y];
      return;
    }

    if (x + this.currentPattern.width >= this.dimX ||
      y + this.currentPattern.height >= this.dimY) return;

    // Set pattern
    for (const patternPoint of this.currentPattern.pattern) {
      this.cells[x + patternPoint[0]][y + patternPoint[1]] = true;
    }
  }

  setPattern(
    pattern
  ) {
    if (pattern == null) {
      this.currentPattern = null;
      return;
    }

    if (pattern.type === "translatable") {
      this.currentPattern = pattern;
    } else if (pattern.type === "static") {
      this.clear();
      pattern.updateCells(this.cells, this.dimX, this.dimY);
    }
  }

  onMouseMoved(
    mX, mY
  ) {
  }

  drawPattern(sk) {

    if (this.currentPattern == null) return;

    // Draw pattern blueprints
    const [x, y] = this.getPointedCell(
      sk.mouseX, sk.mouseY
    );

    // Check if pattern can be drawn
    if (x == -1 || y == -1) return;

    if (x + this.currentPattern.width >= this.dimX ||
      y + this.currentPattern.height >= this.dimY) return;

    // Draw pattern (Gray)
    sk.fill(100, 100, 100, 100);

    for (const patternPoint of this.currentPattern.pattern) {
      sk.rect(
        this.offsetX + (x + patternPoint[0]) * this.cellSize,
        this.offsetY + (y + patternPoint[1]) * this.cellSize,
        this.cellSize, this.cellSize
      )
    }

  }

  clear() {
    // Cells are cleaned 
    for (let i = 0; i < this.dimX; i++) {
      for (let j = 0; j < this.dimY; j++) {
        this.cells[i][j] = false;
      }
    }
  }

  setCellsColors(color1, color2) {
    this.cellColor1 = color1;
    this.cellColor2 = color2;
  }

  setAliveRatio(ratio) {
    this.aliveProb = ratio;
  }

}

export default Board;