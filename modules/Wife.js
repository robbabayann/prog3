const Hunter = require("./Hunter");
var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Wife extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 7;
        this.life = 20;
    }
    mul() {
        let human = [Hunter, Wife]
        let children = random(human)
        this.energy++
        let found = this.chooseCell(5);
        let exact = random(found);
        let freeCell = this.chooseCell(0);
        let exact1 = random(freeCell);

        if (exact && exact1 && this.multiply > 6) {
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
        } else {
            this.move();
        }



        let myCell = this.chooseCell(4);
        let fireIsNear = random(myCell)
        
        if (this.life < 0 || fireIsNear) {
            this.die();
        }

        let foundCell = this.chooseCell(3)
        let power = random(foundCell)

        if (power) {
            this.multiply+=7;
        }
    }
    move() {
        this.life-=2;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in hunterArr) {
            if (wifeArr[i].x == this.x && wifeArr[i].y == this.y) {
                wifeArr.splice(i, 1)
            }
        }
    }

}