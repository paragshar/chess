//white color = w
//black color = b

function rook (layer, color, x, y, imgSrc, name) {
	var rookObj = this;
	this.name = name;
	this.color = color;
	this.x = x;
	this.y = y;
	this.imgSrc = imgSrc;
	this.rookObj = new Image();
	this.rookObjKJS = new Kinetic.Image({
		x: x*cell+spaceOfCell,
		y: y*cell+spaceOfCell,
		image: this.rookObj,
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
              		x: rookObj.x,
              		y: rookObj.y 
              	}
            }
      	}
	});

	this.rookObjKJS.on('dragend', function() {
        rookObj.move(x,y);
    });
	
	this.rookObj.src = this.imgSrc;

	this.rookObjKJS.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });

    this.rookObjKJS.on('mouseout', function() {
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
					this.moveRook(x1, y1);
					dragend(x2, oldx, oldy, x1, y1, rookObj.name);
				}else{
					this.moveRook(this.x, this.y);
					console.log("move is not correct");
				}
			}else{
				this.moveRook(this.x, this.y);
				console.log("Turn is not yours");
			}
      	}else{
       		alert("Turn is not yours")
       		this.moveRook(this.x, this.y);
      	}
	}

	this.checkValidateMove = function(x1, y1){
		if (this.validateMove(x1, y1)){
			if (this.is_vacant(x1, y1)) {
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	this.validateMove = function(x1, y1){
		if (this.x == x1 || this.y == y1) {
			return true;
		}else{
			return false;
		}
	}

	
	this.is_vacant = function(x1, y1){
		var a = 1;
		if(Grid[this.x][this.y].color == 'w'){
			if (this.x == x1) {
				if (this.y < y1) {
					for (var i = this.y+1; i <= y1; i++) {
						if (Grid[x1][i] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'b') {
							return true;
						};
					};
				}else if (this.y > y1) {
					for (var i = this.y-1 ; i >=y1 ; i--) {
						if (Grid[x1][i] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'b') {
							return true;
						};
					}
				}
			}else if (this.y == y1) {
				if (this.x < x1) {
					for (var i = this.x+1; i <= x1; i++) {
						if (Grid[i][y1] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'b') {
							return true;
						};
					}
				}else if (this.x > x1) {
					for (var i = this.x-1; i >= x1 ; i--) {
						if (Grid[i][y1] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'b') {
							return true;
						};
					}
				};
			}
		}if (Grid[this.x][this.y].color == 'b') {
			if (this.x == x1) {
				if (this.y < y1) {
					for (var i = this.y+1; i <= y1; i++) {
						if (Grid[x1][i] != undefined) {
							a = 0;
						}
					};if (a == 1) {
						return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'w') {
							return true;
						};
					}
				}else if (this.y > y1) {
					for (var i = this.y-1 ; i >=y1 ; i--) {
						if (Grid[x1][i] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) {
						if (Grid[x1][y1].color == 'w') {
							return true;
						};
								
					};
				}
			}else if (this.y == y1) {
				if (this.x < x1) {
					for (var i = this.x+1; i <= x1; i++) {
						if (Grid[i][y1] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'w') {
							return true;
						};
					}
				}else if (this.x > x1) {
					for (var i = this.x-1; i >= x1 ; i--) {
						if (Grid[i][y1] != undefined) {
							a = 0;
						}
					};if (a == 1) {
							return true;
					}else if (Grid[x1][y1] != undefined) { 
						if (Grid[x1][y1].color == 'w') {
							return true;
						};
					}
				};
			}
		}else{
			return false;
		}
	}

	this.moveRook = function(x1,y1){
		Grid[this.x][this.y] = undefined;
		this.x = x1;
		this.y = y1;
		this.rookObjKJS = new Kinetic.Image({
	        x: x1*cell+spaceOfCell,
	        y: y1*cell+spaceOfCell,
	        image: this.rookObj,
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
	              		x: rookObj.x,
	              		y: rookObj.y 
	              	}
	              }
	          }
		});
		var rookObj = this;

		this.rookObjKJS.on('dragend', function() {
        	rookObj.move(x,y);
    	});

		this.rookObjKJS.on('mouseover', function() {
	        document.body.style.cursor = 'pointer';
	    });

	    this.rookObjKJS.on('mouseout', function() {
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
		layer.add(this.rookObjKJS);
	}
}