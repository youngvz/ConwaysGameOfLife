
// Create the Grid Object

var Grid = function(x, y, rows, cols, width, height){
   var me = this;

   me.x = x;
   me.y = y;
   me.rows = rows;
   me.cols = cols;
   me.width = width;
   me.height = height;

   me.currentTime = 0;
   me.speed = 100;

   me.simulationOn = false;

   me.background = 'black';
   me.foreground = 'white';

   me.cellColor = 'red';

   me.cells = [];

   var initialize = function(){
      for(var i = 0; i < (rows*cols); i++){
         (function(){
            var x = i % cols;
            var y = Math.floor(i / cols);
            me.cells.push(new Cell(x, y, me));
         })();
      }   
   }   

   me.getCell = function(x, y) {

      x = (cols + x)%cols;
      y = (rows + y)%rows;

      return me.cells[x+y*cols];
   }

   me.update = function(engine, delta){
      if(!me.simulationOn) return;

      // find the cells that need to die
      me.currentTime += delta;
      if(me.currentTime < me.speed) return;

      var cellsToDie = me.cells.filter(function(c){
         return c.shouldDie();
      })
      // find the cells that should be born

      var cellsToBeBorn = me.cells.filter(function(c){
         return c.shouldBeBorn();
      })

      cellsToDie.forEach(function(c){
         c.isAlive = false;
      });

      cellsToBeBorn.forEach(function(c){
         c.isAlive = true;
      });

      me.currentTime = 0;
   }

   me.draw = function(ctx, delta){
      ctx.save();
      ctx.translate(x,y);

      // Drawing grid shape
      ctx.fillStyle = me.background;
      ctx.fillRect(0, 0, cols*width, rows*height);

      ctx.fillStyle = me.foreground;
      var currX = 0;
      for(var i = 0; i < cols; i++){
         ctx.beginPath()
         ctx.moveTo(currX, 0);
         ctx.lineTo(currX, rows*height);
         ctx.closePath();
         ctx.stroke();
         currX += width;
      }

      var currY = 0;
      for(var j = 0; j < rows; j++){
         ctx.beginPath()
         ctx.moveTo(0, currY);
         ctx.lineTo(cols*width, currY);
         ctx.closePath();
         ctx.stroke();
         currY += height;
      }

      // Draw cells in the grid
      ctx.fillStyle = me.cellColor;
      var livingCells = me.cells.filter(function(c){
         return c.isAlive;
      }).forEach(function(c){   
         ctx.fillRect(c.x*width, c.y*height, width, height);
      });
      

      ctx.restore();
   }

   initialize();

   return me;
}