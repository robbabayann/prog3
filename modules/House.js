const Hunter = require("./Hunter");
const Wife = require("./Wife");
var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class House extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 8;
    }
    mul() {
        let human = [Hunter, Wife]
        let children = random(human)
        this.energy++
        let found = this.chooseCell(5);
        let exact = random(found);
        let freeCell = this.chooseCell(0);
        let exact1 = random(freeCell);

        if (exact && exact1 && this.multiply > 7) {
            let x = exact1[0];
            let y = exact1[1];
            let newchild = new children(x, y);
            if (newchild == Hunter) {
                matrix[y][x] = 5;
                hunterArr.push(newchild);
            } else if (newchild == Wife) {
                matrix[y][x] = 6;
                wifeArr.push(newchild);
            }
            
            this.energy = 0;
        }
    }
}