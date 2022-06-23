var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 20;
        this.multiply = 0;
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
        return super.chooseCell(char);
    }
    mul() {
        let found = this.chooseCell(1);
        let exact = random(found)
        this.multiply++
        if (exact && this.multiply > 12) {
            let x = exact[0];
            let y = exact[1];
            let fire = new Fire(x, y);
            matrix[y][x] = 4;
            fireArr.push(fire);
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }

            }
            this.energy++
            this.multiply = 0
        }
        let foundCell = this.chooseCell(3)
        let obsidian = random(foundCell)

        if (this.energy < 1 || obsidian) {
            this.die();
        }
    }
    eat() {
        let found = this.chooseCell(2);
        let exact = random(found)

        if (exact) {
            this.energy++;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

        }
    }

    die() {
        for (let i = 0; i < fireArr.length; i++) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}