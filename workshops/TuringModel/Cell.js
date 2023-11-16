/*
   * Cell : holds cell informations.
   */
class Cell {

    feed;
    kill;
    valU;
    valV;
    lapU;
    lapV;

    constructor(_f, _k, _u, _v) {
        this.feed = _f;
        this.kill = _k;
        this.valU = _u;
        this.valV = _v;
        this.lapU = 0;
        this.lapV = 0;
    }

    standardization(sk) {
        this.valU = sk.constrain(this.valU, 0, 1);
        this.valV = sk.constrain(this.valV, 0, 1);
    }
}

export default Cell;