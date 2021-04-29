//game logic variable
var lastLoopRun = 0;
// score count global variable
var score = 0;
var gametimelength = 0;

//player turn global variable
let P1Score = 0;
let P2Score = 0;

let currentPlayer = 1

//global variable for restart
// var requestId;

//keyboard global variables
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SPACE_KEY = 32;

var controller = new Object();
//declaring enemies array
var enemies = new Array();

//create sprite function
function createSprite(element, x, y, w, h) {
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
}



//control fucntion 2
function toggleKey(keyCode, isPressed) {
    // console.log(keyCode);
    if (keyCode == LEFT_KEY) {
        controller.left = isPressed;
    }
    if (keyCode == RIGHT_KEY) {
        controller.right = isPressed;
    }
    if (keyCode == UP_KEY) {
        controller.up = isPressed;
    }
    if (keyCode == DOWN_KEY) {
        controller.down = isPressed;
    }
    if (keyCode == SPACE_KEY) {
        controller.space = isPressed;
    }
}

function intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}


//function for game boundry
function setBoundry(sprite, ignoreY) {
    if (sprite.x < 20) {
        sprite.x = 20;
    }
    if (!ignoreY && sprite.y < 20) {
        sprite.y = 20;
    }
    if (sprite.x + sprite.w > 850) {
        sprite.x = 850 - sprite.w;
    }
    if (!ignoreY && sprite.y + sprite.h > 850) {
        sprite.y = 850 - sprite.h;
    }
}

//setposition function
const setPosition = (sprite) => {
    let e = document.getElementById(sprite.element);
    e.style.left = sprite.x + 'px';
    e.style.top = sprite.y + 'px';
}



//hanlde controls function, variable below is to control player speed 
var moveModifer = 20;

function handleControls() {
    if (controller.up) {
        player1Default.y -= moveModifer;
    }
    if (controller.down) {
        player1Default.y += moveModifer;
    }
    if (controller.left) {
        player1Default.x -= moveModifer;
    }
    if (controller.right) {
        player1Default.x += moveModifer;
    }
    if (controller.space && laser1Defualt.y <= -1) { // controls when you can refire laser 
        laser1Defualt.x = player1Default.x + -10;
        laser1Defualt.y = player1Default.y - laser1Defualt.h;
    }
    setBoundry(player1Default);
}

function handleControls2() {
    if (controller.up) {
        player2Default.y -= moveModifer;
    }
    if (controller.down) {
        player2Default.y += moveModifer;
    }
    if (controller.left) {
        player2Default.x -= moveModifer;
    }
    if (controller.right) {
        player2Default.x += moveModifer;
    }
    if (controller.space && laser2Defualt.y <= -1) { // controls when you can refire laser 
        laser2Defualt.x = player2Default.x + -10;
        laser2Defualt.y = player2Default.y - laser2Defualt.h;
    }
    setBoundry(player2Default);
}

// checking collisions
function checkCollisions() {
    for (let i = 0; i < enemies.length; i++) {
        if (intersects(laser1Defualt, enemies[i])) {
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            laser1Defualt.y = -laser1Defualt.h;
            score += 100; //getting score
        } else if (intersects(player2Default, enemies[i])) {
            gameOver();
        } else if (intersects(player1Default, enemies[i])) {
            gameOver2();
        } else if (enemies[i].y + enemies[i].h >= 1000) {
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
        }
    }
}

// function checkCollisions2() {
//     for (let i = 0; i < enemies.length; i++) {
//         if (intersects(laser2Defualt, enemies[i])) {
//             let element = document.getElementById(enemies[i].element);
//             element.style.visibility = 'hidden';
//             element.parentNode.removeChild(element);
//             enemies.splice(i, 1);
//             i--;
//             laser2Defualt.y = -laser2Defualt.h;
//             score += 100; //getting score
//         } else if (intersects(player2Default, enemies[i])) {
//             gameOver2();
//         }
//         else if (intersects(player2Default, enemies[i])) {
//                    finalScore();*/
//         else if (enemies[i].y + enemies[i].h >= 1000) { 
//             let element = document.getElementById(enemies[i].element);
//             element.style.visibility = 'hidden';
//             element.parentNode.removeChild(element);
//             enemies.splice(i, 1);
//             i--;
//         }
//     }
// }


//gameover function
function gameOver() {
    let element = document.getElementById(player1Default.element);
    let laser = document.getElementById(laser1Defualt.element);
    element.style.visibility = 'hidden';
    laser.style.visibility = 'hidden';
    // element = document.getElementById('gameover');
    // element.style.visibility = 'visible';
    let totalScoreElement = document.getElementById("totalscore")
    totalScoreElement.classList.add("show")
        // totalScoreElement.firstChild.innerText = "testing" + score
    document.getElementById("displayscore").innerText = "Player 1 score is " + score
    if (player1Default == P1Score) {
        P1Score += score
    }
    // console.log(totalScoreElement.firstChild);
    // text('Score: ' + score, '30px Comic Sans MS',
    //     0, 50, 'red')

    // document.getElementById("displayscore").classList.add("show")//displays gameover
    // document.getElementById("totalscore").innerHTML = "player 1 score " + score
    // document.getElementById("nextRound").classList.add("show")

    // document.getElementById("winnermessage").innerHTML = score
    // document.getElementById("totalscore").classList.add("show")
    // document.getElementById("nextRound").addEventListener("click", function again() {
}

function gameOver2() {
    let element = document.getElementById(player2Default.element);
    let laser = document.getElementById(laser2Defualt.element);
    element.style.visibility = 'hidden';
    laser.style.visibility = 'hidden';
    element = document.getElementById('gameover');
    element.style.visibility = 'visible';
    let totalScoreElement = document.getElementById("gameover")
    totalScoreElement.classList.add("show")
        // totalScoreElement.firstChild.innerText = "testing" + score
    document.getElementById("displayscore").innerText = "Player 2 score is " + score
    if (player2Default == P1Score) {
        P2Score += score
    }
    //     // console.log(totalScoreElement.firstChild);
    //     // text('Score: ' + score, '30px Comic Sans MS',
    //     //     0, 50, 'red')

    //     // document.getElementById("displayscore").classList.add("show")//displays gameover
    //     // document.getElementById("totalscore").innerHTML = "player 1 score " + score
    //     // document.getElementById("nextRound").classList.add("show")

    //     // document.getElementById("winnermessage").innerHTML = score
    //     // document.getElementById("totalscore").classList.add("show")
    //     // document.getElementById("nextRound").addEventListener("click", function again() {
    // }

}

function finalScore() {
    document.getElementById("winnermessage").classList.add("show")

}

function restart() {
    document.getElementById("nextRound").addEventListener("click", function again() {

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].y + enemies[i].h >= 2) { // removes enemies after a certain part of the screen
                let element = document.getElementById(enemies[i].element);
                element.style.visibility = 'hidden';
                element.parentNode.removeChild(element);
                enemies.splice(i, 1);
                i--;
            }
        }
        lastLoopRun = 0
        score = 0
        gametimelength = 0
        controller = new Object();
        enemies = new Array();
        // let gameOver = document.getElementById(gameover);
        // player = new Player('player1', 600, 900, 20, 20)
        // setting up player 1 default map
        // let elementName = 'player2';
        // let player2 = createSprite(elementName, 600, 900, 20, 20)
        // let element = document.createElement('div');
        // element.id = player2.element;
        // element.className = 'player2';

        // let elementName2 = 'laser2';
        // let laser2 = createSprite(elementName2, 600, 900, 20, 20)
        // let element2 = document.createElement('div');
        // element2.id = laser2.element2;
        // element2.className = 'laser2';
        // showSprites(setPosition(player2))
        // showSprites(setPosition(laser2))
        // updatePositions(laser2)
        let element = document.getElementById(player1Default.element);
        let laser = document.getElementById(laser1Defualt.element);
        element.style.visibility = 'visible';
        laser.style.visibility = 'visible';


        let totalScoreElement = document.getElementById("totalscore")
        totalScoreElement.style.visibility = 'hidden';
        element = document.getElementById('gameover');
        element.style.visibility = 'hidden';

        // let element = document.getElementById(player2);
        // let laser = document.getElementById(laser2);
        // showSprites(setPosition(player2Default.element))
        // showSprites(setPosition(laser2Defualt.laser))
        // let gameOver = document.getElementById(gameover);
        // element.style.visibility = 'visible';
        // laser.style.visibility = 'visible';
        // element.style.visibility = 'visible';
        // laser.style.visibility = 'visible';
        // gameOver.style.visibility = 'hidden';
        // let tag = document.createElement
        // let textScore = document.createTextNode("")
        // textScore = document.createElement("p")
        // textScore = document.getElementById("displayScore1").innerHTML = "player 1 score " + score
        // document.getElementById("totalscore").classList.add("hide")
        // let gameOverReset = document.getElementById("gameover")
        // gameOverReset.style.visibility = 'hidden'
        // player2Default = createSprite('player2', 600, 900, 20, 20); // setting up player 1 default map
        // laser2Defualt = createSprite('laser2', 0, -120, 2, 50);
        // resetting enemies
        // for (let i = 0; i < enemies.length; i++) {
        //     if (intersects(laser1Defualt, enemies[i])) {
        //         let element = document.getElementById(enemies[i].element);
        //         element.style.visibility = 'hidden';
        //         element.parentNode.removeChild(element);
        //         enemies.splice(i, 1);
        //         i--;
        // let resetElement = document.children(enemies);
        // let resetElement = document.getElementsByClassName("enemies")
        // document.removeChild(resetElement);
        // element.id = enemy.element;
        // element.className = 'enemy';
        // document.children[0].appendChild(element);

        // start();
        // stop();
        gameLoop();
    })
}
restart();

//show sprites function
function showSprites() {
    setPosition(player1Default);
    setPosition(laser1Defualt);
    // setPosition(player2Default); // added new
    // setPosition(laser2Defualt); //added new
    for (let i = 0; i < enemies.length; i++) {
        setPosition(enemies[i]);
    }
    let scoreElement = document.getElementById('score');
    scoreElement.innerHTML = 'Score: ' + score;
}

function showSprites2() {
    setPosition(player2Default);
    setPosition(laser2Defualt);
    // setPosition(player2Default); // added new
    // setPosition(laser2Defualt); //added new
    for (let i = 0; i < enemies.length; i++) {
        setPosition(enemies[i]);
    }
    let scoreElement = document.getElementById('score');
    scoreElement.innerHTML = 'Score: ' + score;
}

//function for laser to update and enemies
function updatePositions() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += 4;
        enemies[i].x += getRandom(7) - 3;
        setBoundry(enemies[i], true)
    }
    laser1Defualt.y -= 30; //laser fire speed
}

function updatePositions2() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += 4;
        enemies[i].x += getRandom(7) - 3;
        setBoundry(enemies[i], true)
    }
    laser2Defualt.y -= 30; //laser fire speed
}

//enemies function
function addEnemy() {
    var interval = 50;
    if (gametimelength > 800) {
        interval = 15;
    } else if (gametimelength > 500) {
        interval = 25;
    } else if (gametimelength > 200) {
        interval = 35;
    }
    if (getRandom(interval) == 0) { //generating random enemies amount
        let elementName = 'enemy' + getRandom(1000000000);
        let enemy = createSprite(elementName, getRandom(900), -10, 20, 20)
        let element = document.createElement('div');
        element.id = enemy.element;
        element.className = 'enemy';
        document.children[0].appendChild(element);
        enemies[enemies.length] = enemy;
        console.log(enemies);
        console.log(typeof(enemies));
    }
}
//random function for enemies
function getRandom(maxSize) {
    return parseInt(Math.random() * maxSize);
}

//game loop to refresh all aspects of game
function gameLoop() {
    if (new Date().getTime() - lastLoopRun > 40) {
        updatePositions();
        updatePositions2();
        handleControls();
        handleControls2();
        checkCollisions();
        // checkCollisions2();
        addEnemy();
        showSprites();
        showSprites2();
        restart();


        lastLoopRun = new Date().getTime();
        gametimelength++;
        // console.log(gametimelength);
    }

    setTimeout('gameLoop();', 2);

}

//this class provides score count for both players
// class Player {
//     constructor(name, display, winnerstate) {
//         this.name = name;
//         this.points = 0;
//         this.display = display;
//         this.winnerstate = winnerstate
//     }
//     totalScore(pointsValue) {
//         this.points = pointsValue;
//         this.display.children[0].innerText = this.points
//         console.log(pointsValue);
//         return pointsValue;
//     }
//     setup() {
//         this.display = score
//         return this;
//     }
//     winnerstate() {

//     }
// }



document.onkeydown = function(evt) {
    toggleKey(evt.keyCode, true);
};
document.onkeyup = function(evt) {
    toggleKey(evt.keyCode, false);
};


// function to set default position of shooter1 
let player1Default = createSprite('player1', 600, 900, 20, 20); // setting up player 1 default map
let laser1Defualt = createSprite('laser1', 0, -120, 2, 50); // setting enemies location and size default
let player2Default = createSprite('player2', 600, 900, 20, 20); // setting up player 1 default map
let laser2Defualt = createSprite('laser2', 0, -120, 2, 50); // setting enemies location and size default

//setting up players
// const player1 = new Player('player1', document.getElementById("totalscore"), document.getElementById("winnermessage"))
// const player2 = new Player('player1', document.getElementById("totalscore"), document.getElementById("winnermessage"))

// player1.setup();
// player2.setup();

gameLoop();
restart();