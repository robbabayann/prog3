var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
    }
    getNewCoordinates() {
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    hunt() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {
            this.life+=3;

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

        } else {
            this.move()
        }


        let myCell = this.chooseCell(4);
        let fireIsNear = random(myCell)
        
        if (this.life < 0 || fireIsNear) {
            this.die();
        }

        let foundCell = this.chooseCell(3)
        let power = random(foundCell)

        if (power) {
            this.life+=5;
        }
    }
    move() {
        this.life-=5;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in hunterArr) {
            if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
                hunterArr.splice(i, 1)
            }
        }
    }
}