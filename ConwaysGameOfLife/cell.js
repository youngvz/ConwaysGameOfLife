//Create Cell that is manipulated on the Grid


var Cell = function (x, y, grid) {
   var me = this;
    // Declare the X and Y coordinates
    // Delcare the grid the cell is inheriting
    
   me.x = x;
   me.y = y;
   me.grid = grid;
   me.isAlive = false;

    // Find the cell's neighbor (8 possibliities)
    // top, top left, top right, right, bottom right, bottom, bottom left, left
    
   me.getNeighbors = function(){
      return [me.grid.getCell(x-1, y-1), 
                   me.grid.getCell(x-1, y), 
                   me.grid.getCell(x-1, y+1), 
                   me.grid.getCell(x, y-1), 
                   me.grid.getCell(x, y+1), 
                   me.grid.getCell(x+1, y-1), 
                   me.grid.getCell(x+1, y), 
                   me.grid.getCell(x+1, y+1)];
   }

   // Function that defines if the cell should live or not
   // Based on the rules 
   // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
   // Any live cell with two or three live neighbours lives on to the next generation.
   // Any live cell with more than three live neighbours dies, as if by overcrowding.
   // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

   me.shouldDie = function(){
       
    // Detemine whether the current cell is alive by determining the status of the neighboring cells
       
      var livingNeighbors = me.getNeighbors().filter(function(c){
         return c.isAlive;
      });
       
      if(livingNeighbors.length < 2){
         return true;
      }

      if(livingNeighbors.length > 3){
         return true;
      }

      return false;
   }
   
    // Detemine whether the current cell should be created by determining the status of the neighboring cells
   me.shouldBeBorn = function(){
      var livingNeighbors = me.getNeighbors().filter(function(c){
         return c.isAlive;
      });

      if(livingNeighbors.length === 3){
         return true;
      }
      return false;
   }

   return me;
}
