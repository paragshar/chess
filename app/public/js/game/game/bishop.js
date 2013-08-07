//white color = w
//black color = b

function bishop (layer, color, x, y, imgSrc, name) {
  var bishopObj = this;
  this.name = name;
	this.color = color;
	this.imgSrc = imgSrc;
	this.x = x;
	this.y = y;
	this.bishopObj = new Image();
	this.bishopObjKJS = new Kinetic.Image({
          x: x*cell+spaceOfCell,
          y: y*cell+spaceOfCell,
          image: this.bishopObj,
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
              		x: bishopObj.x,
              		y: bishopObj.y 
              	}
              }
          }
	});

	  //drag events
    this.bishopObjKJS.on('dragend', function() {
        bishopObj.move(x,y);
    });

  	this.bishopObj.src = this.imgSrc;

	  this.bishopObjKJS.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });

    this.bishopObjKJS.on('mouseout', function() {
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
                  this.moveBishop(x1, y1);
                  dragend(x2, oldx, oldy, x1, y1, bishopObj.name);
            }else{
                  this.moveBishop(this.x, this.y);
                  console.log("move is not correct");
            }
        }else{
          this.moveBishop(this.x, this.y);
          console.log("Turn is not yours");
        }
      }else{
        alert("Turn is not yours")
        this.moveBishop(this.x, this.y);
      }

    }

    this.checkValidateMove = function(x1, y1){
       if (this.ValidateMove(x1, y1)){
          if(this.is_vacant(x1, y1)){
              return true;
          }
       }
    }

    this.ValidateMove = function(x1, y1){
      var b = 0;
      var locVarx = this.x;
      var locVary = this.y;
          if(locVarx > x1 && locVary < y1){
              for (var i = locVarx; i > x1; i--) {
                  b++;
              }for (var i = 0; i < b; i++) {
                  locVarx--;
                  locVary++;
              }if (locVarx == x1 && locVary == y1) {
                  return true;
              };
          }else if (x1 > locVarx && locVary < y) {
              for (var i = x1; i > locVarx; i--) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary++;
              }if (locVarx == x1 && locVary == y1) {
                  return true;
              };
          }else if (locVarx < x1 && locVary > y1) {
              for (var i = locVarx; i < x1; i++) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary--;
              }if (locVarx == x1 && locVary == y1) {
                  return true;
              };
          }else if (locVarx > x1 && locVary > y1) {
            for (var i = x1; i < locVarx; i++) {
                  b++
            }for (var i = 0; i < b; i++) {
                  locVarx--;
                  locVary--;
            }if (locVarx == x1 && locVary == y1) {
                  return true;
            };
          };
    }

    this.is_vacant = function(x1, y1){
      var b = 0;
      var a = 1;
      var locVarx = this.x;
      var locVary = this.y;
        if (Grid[locVarx][locVary].color == 'w') {
            if(locVarx > x1 && locVary < y1){
                for (var i = locVarx; i > x1; i--) {
                    b++;
                }for (var i = 0; i < b; i++) {
                    locVarx--;
                    locVary++;
                    if (Grid[locVarx][locVary] != undefined) {
                        a = 0;
                    };
                }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'b') {
                        return true;
                    };
                }
            }else if (x1 > locVarx && locVary < y) {
              for (var i = x1; i > locVarx; i--) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary++;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
              }if (a == 1) {
                    return true;
              }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'b') {
                        return true;
                    };
              }
          }else if (locVarx < x1 && locVary > y1) {
              for (var i = locVarx; i < x1; i++) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary--;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
              }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'b') {
                        return true;
                };
              }
          }else if (locVarx > x1 && locVary > y1) {
            for (var i = x1; i < locVarx; i++) {
                  b++
            }for (var i = 0; i < b; i++) {
                  locVarx--;
                  locVary--;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
            }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'b') {
                        return true;
                };
            }
          };
        }else if (Grid[locVarx][locVary].color == 'b') {
            if(locVarx > x1 && locVary < y1){
                for (var i = locVarx; i > x1; i--) {
                    b++;
                }for (var i = 0; i < b; i++) {
                    locVarx--;
                    locVary++;
                    if (Grid[locVarx][locVary] != undefined) {
                        a = 0;
                    };
                }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'w') {
                        return true;
                    };
                }
            }else if (x1 > locVarx && locVary < y) {
              for (var i = x1; i > locVarx; i--) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary++;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
              }if (a == 1) {
                    return true;
              }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'w') {
                        return true;
                    };
              }
          }else if (locVarx < x1 && locVary > y1) {
              for (var i = locVarx; i < x1; i++) {
                  b++
              }for (var i = 0; i < b; i++) {
                  locVarx++;
                  locVary--;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
              }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'w') {
                        return true;
                };
              }
          }else if (locVarx > x1 && locVary > y1) {
            for (var i = x1; i < locVarx; i++) {
                  b++
            }for (var i = 0; i < b; i++) {
                  locVarx--;
                  locVary--;
                  if (Grid[locVarx][locVary] != undefined) {
                    a = 0;
                  };
            }if (a == 1) {
                    return true;
                }else if (Grid[locVarx][locVary] !=  undefined) {
                    if (Grid[locVarx][locVary].color == 'w') {
                        return true;
                };
            }
          };
        };
    };

    this.moveBishop = function(x1,y1){
        Grid[this.x][this.y] = undefined;
        this.x = x1;
        this.y = y1;
        this.bishopObjKJS = new Kinetic.Image({
              x: x1*cell+spaceOfCell,
              y: y1*cell+spaceOfCell,
              image: this.bishopObj,
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
                        x: bishopObj.x,
                        y: bishopkObj.y 
                      }
                    }
                }
        });
        var bishopObj = this;

        this.bishopObjKJS.on('dragend', function() {
              bishopObj.move(x,y);
          });

        this.bishopObjKJS.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
          });

          this.bishopObjKJS.on('mouseout', function() {
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
      layer.add(this.bishopObjKJS);
    }
}