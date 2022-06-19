var LiveForm = require("./LiveForm");
var Grass = require("./Grass");
var random = require("./random");

module.exports = class Water extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }
    mul() {
        this.energy++
        let found = this.chooseCell(0);
        let exact = random(found);

        if (exact && this.energy > 15) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.energy = 0;
        }
    }
}