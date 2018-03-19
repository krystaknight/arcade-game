// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

  // stay within bounds
   if (this.x >= 505) {
       this.x = 0;
   }

   this.checkCollision()

};

Enemy.prototype.checkCollision = function() {
  if (player.y + 131 >= this.y + 90 &&
      player.x + 25 <= this.x + 88 &&
      player.y + 73 <= this.y + 135 &&
      player.x + 76 >= this.x + 11) {

      // reset play location
      player.reset()
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  //keep player in bounds
  if (this.y > 383 ) {
      this.y = 383;
  }
  if (this.x > 402.5) {
      this.x = 402.5;
  }
  if (this.x < 2.5) {
      this.x = 2.5;
  }

  //if player reaaches the top, its a winner!
  if (this.y + 63 <= 0) {
      this.reset()
      console.log('You win!');
      loadEnimies();
    }
};

Player.prototype.reset = function() {
    this.y = 383;
    this.x = 202.5;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'left') {
        this.x -= this.speed;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50);


// load between 1 -3 Enemies
var loadEnimies = function(){
  allEnemies = [];
  var rand = Math.floor(Math.random() * 3) + 1;
  for (var i = 0; i < rand; i++){
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
    allEnemies.push(enemy);
  }
};

loadEnimies();
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
