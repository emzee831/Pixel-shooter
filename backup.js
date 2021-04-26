//game logic variable
var lastLoopRun = 0;
// score count global variable
var score = 0;
var numberOfGamesPlayed = 0;

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
        } else if (intersects(player1Default, enemies[i])) {
            gameOver();
        } else if (enemies[i].y + enemies[i].h >= 1000) { // removes enemies after a certain part of the screen
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
        }
    }
}

function gameOver() {
    let element = document.getElementById(player1Default.element);
    let laser = document.getElementById(laser1Defualt.element);
    element.style.visibility = 'hidden';
    laser.style.visibility = 'hidden';
    element = document.getElementById('gameover');
    element.style.visibility = 'visible';
}

//show sprites function
function showSprites() {
    setPosition(player1Default);
    setPosition(laser1Defualt);
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

//enemies function
function addEnemy() {
    var interval = 50;
    if (numberOfGamesPlayed > 1000) {
        interval = 5;
    } else if (numberOfGamesPlayed > 800) {
        interval = 20;
    } else if (numberOfGamesPlayed > 500) {
        interval = 35;
    }
    if (getRandom(interval) == 0) { //generating random enemies amount
        let elementName = 'enemy' + getRandom(100000000000);
        let enemy = createSprite(elementName, getRandom(1150), -10, 15, 15)
        let element = document.createElement('div');
        element.id = enemy.element;
        element.className = 'enemy';
        document.children[0].appendChild(element);
        enemies[enemies.length] = enemy;
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
        handleControls();
        checkCollisions();
        addEnemy();
        showSprites();

        lastLoopRun = new Date().getTime();
        numberOfGamesPlayed++;
    }

    setTimeout('gameLoop();', 2);
}

document.onkeydown = function(evt) {
    toggleKey(evt.keyCode, true);
};
document.onkeyup = function(evt) {
    toggleKey(evt.keyCode, false);
};


// function to set default position of shooter1 
let player1Default = createSprite('player1', 600, 900, 20, 20); // setting up player 1 default map
let laser1Defualt = createSprite('laser1', 0, -120, 2, 50);


gameLoop();