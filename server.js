// 
weath = "winter"
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Water = require("./modules/Water.js");
var Fire = require("./modules/Fire.js");
var Hunter = require("./modules/Hunter.js");
var Wife = require("./modules/Wife.js");
var House = require("./modules/House.js");
let random = require('./modules/random');
let fs = require("fs")
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
waterArr =[];
fireArr = [];
hunterArr = [];
wifeArr = [];
houseArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, water, fire, hunter, wife, house) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < wife; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < house; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }

}



matrixGenerator(20, 100, 12, 40, 15, 10, 10, 10);



//! Creating MATRIX -- END

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var water = new Water(x, y);
                waterArr.push(water);
            } else if (matrix[y][x] == 4) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
            } else if (matrix[y][x] == 5) {
                var hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            } else if (matrix[y][x] == 6) {
                var wife = new Wife(x, y);
                wifeArr.push(wife);
            } else if (matrix[y][x] == 7) {
                var house = new House(x, y);
                houseArr.push(house);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if(weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].mul();
        }
    }
    if (hunterArr.length) {
        for (var i in hunterArr) {
            hunterArr[i].hunt();
        }
    }
    if (wifeArr[0] !== undefined) {
        for (var i in wifeArr) {
            wifeArr[i].mul();
        }
    }
    if (houseArr[0] !== undefined) {
        for (var i in houseArr) {
            houseArr[i].mul();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        waterCounter: waterArr.length,
        fireCounter: fireArr.length,
        hunterCounter: hunterArr.length,
        wifeCounter: wifeArr.length,
        houseCounter: houseArr.length

    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 50)

//// Add event
function kill() {
    grassArr = [];
    grassEaterArr = []
    waterArr = []
    fireArr = []
    hunterArr = []
    wifeArr = []
    houseArr = []

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.water = waterArr.length;
    statistics.fire = fireArr.length;
    statistics.hunter = hunterArr.length;
    statistics.wife = wifeArr.length;
    statistics.house = houseArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
