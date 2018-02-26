// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = 0;
    this.y = y;
};

//TYLER adding the player character function
/*
var Player = function() {

    this.x = ??;
    this.y = ??;
}
*/



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
      this.x = -100;
    }
    //Check for collision between enemy and player
    if (this.x + 60 >= player.x &&
        this.x - 35 <= player.x &&
        this.y === player.y){
          player.reset();
          decreaseScore();
        }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    avatar = player.handleInput(clickObject);
    //image/sprite for our Player
    this.sprite = avatarChoice;
    this.x = 200;
    this.y = 380;

};

/*
// Function to increase the scoreboard
function increaseScore() {
    const scoreBoard = document.getElementById('score');
    let scoreCounter = scoreBoard.innerHTML;
    scoreCounter++;
    scoreBoard.innerHTML = scoreCounter;
}

// Function to decrease the scoreboard
function decreaseScore() {
    const scoreBoard = document.getElementById('score');
    let scoreCounter = scoreBoard.innerHTML;
    scoreCounter = 0;
    scoreBoard.innerHTML = scoreCounter;
}
*/

//I think this can be compressed with the player variable
Player.prototype.update = function() {};

//Return the player to the starting position. Could this be combined with the update function somehow?
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

//Move the player avatar on keypress.
Player.prototype.handleInput + function(key) {
  if (key == 'up' && this.y < 140) { //if the player reaches the water they win.
    this.reset();
    //increaseScore();
  } else if (key == 'left' && this.x > 0) {
    this.x = this.x - 100;
  } else if (key == 'right' && this.x < 400) {
    this.x = this.x + 100;
  } else if (key == 'up' && this.y > 0) {
    this.y = this.y - 80;
  } else if (key == 'down' && this.y < 380) {
    this.y = this.y + 80;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

//Random number generator
//From Mozilla https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1))
}

// An array of all the possible rows where enemies are allowed to spawn
const enemyRows = [220, 140, 60];

// I feel it was best to populate every row with enemies. But I would like this to randomize.
for (i = 0; i < 2; i++) {
  allEnemies.push(new Enemy(enemyRows[Math.floor(Math.random() * enemyRows.length)], (getRandomIntInclusive(2, 6) * 30)));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
