window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

// Define the Game Object
// Declare the Canvas of the game
// Declare the default variable on a New Game
// Declare the functions to applied to the Game Object
// Clear - Resets the grid
// Update - Updates the actors of each Game to reflect the changes after each simulation.
// Draw  - Draws the actors in the current location on the grid pane of the Game object.
// Start - Toggles the running state of the game.


var Game = function(canvasId){
   var me = this;

   var canvas = document.getElementById(canvasId);
   var ctx = canvas.getContext('2d');

   me.canvas = canvas;

   me.background = 'black';

   me.running = false;
   me.isDebug = true;

   me.actors = [];


   me.clear = function(){
      ctx.fillStyle = me.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   me.update = function(delta){
      me.actors.forEach(function(a){
         a.update(me, delta);
      });
   }

   me.draw = function(delta){
      me.actors.forEach(function(a){
         a.draw(ctx, delta);
      });
   }

   me.start = function(){
      me.running = true;

      var lastTime = Date.now();
      (function mainloop(){
         if(!me.running) return;
         window.requestAnimationFrame(mainloop);

         // current time in milliseconds
         var current = Date.now();
         // time elapsed in milliseconds since the last frame
         var elapsed = current - lastTime;

          // update/draw
         me.clear();

         me.update(elapsed);
         me.draw(elapsed);

          lastTime = current;
      })();
   }

   return me;
}

// Create Game Object

var game = new Game("game");

// Declare the grid dimensions

var grid = new Grid(0, 0, Math.floor(600/20), Math.floor(800/20), 20, 20);

// Add On Click Listener to place the cell on the grid.

game.canvas.addEventListener('click', function(evt){
   var gridx = Math.floor(evt.offsetX / grid.width);
   var gridy = Math.floor(evt.offsetY / grid.height);
   console.log(evt);
   grid.getCell(gridx, gridy).isAlive = true;
});

game.actors.push(grid);

game.start();

// Toggles the game on and off when button is clicked

function startGame(){
    grid.simulationOn = !grid.simulationOn;
}


// Toggles the game for 23 generations

function toggleGame(){
    grid.simulationOn = !grid.simulationOn;
    setTimeout(function(){ 

    grid.simulationOn = !grid.simulationOn;
    }, 2300); 
}

// Toggles the game for 1 generation

function toggleGameByOne(){
    grid.simulationOn = !grid.simulationOn;
    setTimeout(function(){ 

    grid.simulationOn = !grid.simulationOn;
    }, 100); 
}

// Resets the game by reloading the screen

function resetGame(){
    location.reload();
}
