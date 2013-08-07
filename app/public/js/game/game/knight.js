function knight (layer, color, x, y, imgSrc, name) {
	var knightObj = this;
  this.name = name;
	this.color = color;
	this.imgSrc = imgSrc;
	this.x = x;
	this.y = y;
	this.knightObj = new Image();
	this.knightObjKJS = new Kinetic.Image({
          x: x*cell+spaceOfCell,
          y: y*cell+spaceOfCell,
          image: this.knightObj,
          draggable: true,
          dragBoundFunc: function(pos) {
          	x = parseInt(pos.x/cell);
          	y = parseInt(pos.y/cell);
            if(x >= 0 || x <= 7 || y>=0 || y <= 7){
	            return {
		            x : x*cell+spaceOfCell,
		            y : y*cell+spaceOfCell
	        	}
	    	}else{
              	return{
              		x: knightObj.x,
              		y: knightObj.y 
              	}
              }
          }
	});

	  //drag events
    this.knightObjKJS.on('dragend', function() {
        knightObj.move(x,y);
    });

  	this.knightObj.src = this.imgSrc;

	  this.knightObjKJS.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });

    this.knightObjKJS.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    this.move = function(x1, y1){
      var hiddenEle = document.getElementById('is_it_my_turn').value;
      if (hiddenEle != 0) {
        if (this.turn(x2)) {
            if (this.checkValidateMove(x1, y1)) {
              x2 = Grid[this.x][this.y].color;
              var oldx = this.x;
              var oldy = this.y
              this.moveKnight(x1, y1);
              dragend(x2, oldx, oldy, x1, y1, knightObj.name);
            }else {
              this.moveKnight(this.x, this.y)
              console.log("move is not correct");
            }
        }else{
            this.moveKnight(this.x, this.y);
            console.log("Turn is not yours");
        }
      }else{
        alert("Turn is not yours")
        this.moveKnight(this.x, this.y);
      }

    }

    this.checkValidateMove = function(x1, y1){
      if (this.ValidateMove(x1, y1)) {
        if (this.is_vacant(x1, y1)) {
          return true;
        };
      };
    }

    this.ValidateMove = function(x1, y1){
      if (this.x-1 == x1 && this.y+2 == y1) {
        return true;
      }else if (this.x+1 == x1 && this.y+2 == y1) {
        return true;
      }else if (this.x+2 == x1 && this.y+1 == y1){
        return true;
      }else if (this.x+2 == x1 && this.y-1 == y1){
        return true;
      }else if (this.x+1 == x1 && this.y-2 == y1){
        return true;
      }else if (this.x-1 == x1 && this.y-2 == y1){
        return true;
      }else if (this.x-2 == x1 && this.y-1 == y1){
        return true;
      }else if (this.x-2 == x1 && this.y+1 == y1){
        return true;
      }
    }

    this.is_vacant = function(x1, y1){
      if (Grid[this.x][this.y].color == 'w') {
          if(Grid[x1][y1] == undefined){
            return true;
          }else if (Grid[x1][y1] !=undefined) {
            if (Grid[x1][y1].color == 'b') {
                return true;
            };

          };
      }else if (Grid[this.x][this.y].color == 'b') {
          if(Grid[x1][y1] == undefined){
            return true;
          }else if (Grid[x1][y1] !=undefined) {
            if (Grid[x1][y1].color == 'w') {
                return true;
            };

          };
      }
    }

    this.moveKnight = function(x1,y1){
        Grid[this.x][this.y] = undefined;
        this.x = x1;
        this.y = y1;
        this.knightObjKJS = new Kinetic.Image({
              x: x1*cell+spaceOfCell,
              y: y1*cell+spaceOfCell,
              image: this.knightObj,
              draggable: true,
              dragBoundFunc: function(pos) {
                  x = parseInt(pos.x/cell);
                  y = parseInt(pos.y/cell);
                  if(x >= 0 || x <= 7 || y>=0 || y <= 7){
                    return {
                      x : x*cell+spaceOfCell,
                      y : y*cell+spaceOfCell
                  }
              }else{
                      return{
                        x: knightObj.x,
                        y: knightkObj.y 
                      }
                    }
                }
        });
        var knightObj = this;

        this.knightObjKJS.on('dragend', function() {
              knightObj.move(x,y);
          });

        this.knightObjKJS.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
          });

          this.knightObjKJS.on('mouseout', function() {
              document.body.style.cursor = 'default';
          });

        Grid[x1][y1] = this;
    }

    this.turn = function(x2){
        if (Grid[this.x][this.y].color != x2) {
          return true;
        }else{
          return false;
        }
    }

    this.Draw = function(){ 
      layer.add(this.knightObjKJS);
    }

}