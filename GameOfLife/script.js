var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var fireArr = [];
var waterArr = [];
var side = 30;

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount, fireCount, waterCount) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < fireCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < waterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
    }
    matrixGenerator(25, 60, 10, 20, 60)

    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('white');

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let fire = new Fire(x, y);
                fireArr.push(fire);
            }
            else if (matrix[y][x] == 4) {
                let water = new Water(x, y);
                waterArr.push(water);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("black");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        let eater = grassEaterArr[i];
        if (eater) {
            eater.eat()
        }
        eater.energy -= 1
    }
    for (let i = 0; i < fireArr.length; i++) {
        const fire = fireArr[i];
        fire.mul();
        fire.energy -= 1;
    }
    for (let i = 0; i < waterArr.length; i++) {
        const water = waterArr[i];
        water.mul();
    }
}