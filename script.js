var socket = io();
//! Setup function fires automatically
function setup() {
    var weath = 'winter'
    var side = 30;
    var matrix = [];
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let waterCountElement = document.getElementById('waterCount');
    let fireCountElement = document.getElementById('fireCount');
    let hunterCountElement = document.getElementById('hunterCount');




    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        weath = data;
    })
    function drawCreatures(data) {
        
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        waterCountElement.innerText = data.waterCounter;
        fireCountElement.innerText = data.fireCounter;
        hunterCountElement.innerText = data.hunterCounter;
        wifeCountElement.innerText = data.wifeCounter;
        houseCountElement.innerText = data.houseCounter;


        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                        if(weath == "spring")
                        {
                            fill("green")
                        }
                        else if(weath == "summer")
                        {
                            fill("yellow");
                        }
                        else if(weath == "winter")
                        {
                            fill("white")
                        }
                        else if(weath == "autumn")
                        {
                            fill("orange")
                        }
                        rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("#575757");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('coral');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('pink');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 7) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function kill() {
    socket.emit("kill")
}