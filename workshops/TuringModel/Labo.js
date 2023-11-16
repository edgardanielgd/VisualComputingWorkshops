import Cell from '/workshops/TuringModel/Cell.js';
import config from '/workshops/TuringModel/config.js';

class Labo {
    cellSize;
    matrixW;
    matrixH;
    diffU;
    diffV;
    cells;

    constructor(sk, _cSiz, width, height) {
        this.cellSize = _cSiz;
        this.matrixW = sk.floor(width / this.cellSize);
        this.matrixH = sk.floor(height / this.cellSize);
        this.diffU = config.DIFF_U;
        this.diffV = config.DIFF_V;
        this.cells = new Array();
        this.sk = sk;
    }

    /*
     * init : initialize reaction-diffusion system.
     */
    init() {
        for (let x = 0; x < this.matrixW; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.matrixH; y++) {
                this.cells[x][y] = new Cell(
                    this.sk.map(x, 0.0, this.matrixW, config.MIN_FEED_RANGE, config.MAX_FEED_RANGE),   // feed
                    this.sk.map(y, 0.0, this.matrixH, config.MIN_KILL_RANGE, config.MAX_KILL_RANGE), // kill
                    1,                         // u
                    (this.sk.random(1) < 0.1) ? 1 : 0  // v
                );
            }
        }
    }



    /*
     * proceed : proceed reaction-diffusion calculation.
     */
    proceed() {

        // calculate Laplacian
        const nD = Array(); // neighbors on diagonal
        const nH = Array(); // neighbors on vertical and horizontal
        for (let x = 0; x < this.matrixW; x++) {
            for (let y = 0; y < this.matrixH; y++) {

                // set neighbors
                nD[0] = this.cells[this.sk.max(x - 1, 0)][this.sk.max(y - 1, 0)];
                nD[1] = this.cells[this.sk.max(x - 1, 0)][this.sk.min(y + 1, this.matrixH - 1)];
                nD[2] = this.cells[this.sk.min(x + 1, this.matrixW - 1)][this.sk.max(y - 1, 0)];
                nD[3] = this.cells[this.sk.min(x + 1, this.matrixW - 1)][this.sk.min(y + 1, this.matrixH - 1)];
                nH[0] = this.cells[this.sk.max(x - 1, 0)][y];
                nH[1] = this.cells[x][this.sk.max(y - 1, 0)];
                nH[2] = this.cells[x][this.sk.min(y + 1, this.matrixH - 1)];
                nH[3] = this.cells[this.sk.min(x + 1, this.matrixW - 1)][y];

                // Laplacian
                let c = this.cells[x][y];
                let sum = 0.0;
                for (let i = 0; i < 4; i++) {
                    sum += nD[i].valU * 0.05 + nH[i].valU * 0.2;
                }
                sum -= c.valU;
                c.lapU = sum;

                sum = 0.0;
                for (let i = 0; i < 4; i++) {
                    sum += nD[i].valV * 0.05 + nH[i].valV * 0.2;
                }
                sum -= c.valV;
                c.lapV = sum;

            }
        }

        // reaction-diffusion
        for (let x = 0; x < this.matrixW; x++) {
            for (let y = 0; y < this.matrixH; y++) {
                let c = this.cells[x][y];
                let reaction = c.valU * c.valV * c.valV;
                let inflow = c.feed * (1.0 - c.valU);
                let outflow = (c.feed + c.kill) * c.valV;
                c.valU = c.valU + this.diffU * c.lapU - reaction + inflow;
                c.valV = c.valV + this.diffV * c.lapV + reaction - outflow;
                c.standardization(this.sk);
            }
        }
    }

    /*
     * observe : display the result.
     */
    observe(myTexture) {
        myTexture.background(config.DEFAULT_BACKGROUND_COLOR);
        myTexture.fill(config.DEFAULT_DOT_COLOR);
        myTexture.noStroke();
        for (let x = 0; x < this.matrixW; x++) {
            for (let y = 0; y < this.matrixH; y++) {
                let cx = x * this.cellSize;
                let cy = y * this.cellSize;
                let cs = this.cells[x][y].valU * this.cellSize;
                myTexture.rect(cx, cy, cs, cs);
            }
        }
    }
}

export default Labo;