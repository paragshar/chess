//white color = w
//black color = b

function pawn (layer, color, x, y, imgSrc, name) {
	var pawnObj = this;
	this.color = color;
	this.imgSrc = imgSrc;
	this.x = x;
	this.y = y;
	this.name = name
	this.plowObj = new Image();
	this.plowObjKJS = new Kinetic.Image({
          x: x*cell+spaceOfCell,
          y: y*cell+spaceOfCell,
          image: this.plowObj,
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
              		x: pawnObj.x,
              		y: pawnObj.y 
              	}
              }
          }
	});

	//drag events
    this.plowObjKJS.on('dragend', function() {
        pawnObj.move(x,y);
    });
	
	this.plowObj.src = this.imgSrc;

	this.plowObjKJS.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });

    this.plowObjKJS.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

	this.validateMove = function(x1,y1){
		//to check movement is true are false for white
		if (this.color == 'w') {
			if (this.x == x1){
				if (this.y == 1) {
					if (this.y+1 == y1 || this.y+2 == y1) {
						if (Grid[x1][y1] == undefined) {
								return true;
						};
					}
				}else if (this.y >= 2) {
					if (this.y+1 == y1) {
						return true;
					}
				}
			}else {
				if (this.is_vacant(x1,y1) == false){
					if(Grid[x1][y1].color == 'b'){
						if (this.y+1 == y1) {
							if (this.x+1 == x1 || this.x-1 == x1) {
								return true;
							}
						}
					}
				}
			}
		}

		//to check movement is true are false for black
		if (this.color == 'b') {
			if (this.x == x1){
				if (this.y == 6) {
					if (this.y-1 == y1 || this.y-2 == y1) {
						if (Grid[x1][y1] == undefined) {
							return true;
						};
					};
				}else if (this.y <= 5) {
					if (this.y-1 == y1) {
						return true;
					}
				}
			}else {
				if (this.is_vacant(x1,y1) == false){
					if(Grid[x1][y1].color == 'w'){
						if (this.y-1 == y1) {
							if (this.x-1 == x1 || this.x+1 == x1) {
								return true;
							}
						}
					}
				}
			}
		}else{
		    return false;
		 }
	}

	this.checkValidateMove = function(x1, y1){
		if (this.validateMove(x1, y1)) {
			if (this.color == 'w') {
				if (this.is_vacant(x1, y1)) {
					return true;
				}else{
					if (this.x+1 == x1 || this.x-1 == x1) {
						return true;
					}else{
						return false;
					 }
				}

			}else if (this.color == 'b') {
				if (this.is_vacant(x1, y1)) {
					return true;
				}else{
					if (this.x-1 == x1 || this.x+1 == x1) {
						return true;
					}else{
						return false;
					 }
				}
				
			}else{
				return false;
			 }
		}else{
			return false;
		 }
	}
	
	this.move = function(x1, y1){
		var hiddenEle = document.getElementById('is_it_my_turn').value;
		if (hiddenEle != 0) {
			if (this.turn(x2)) {
				if (this.checkValidateMove(x1, y1)) {
					x2 = Grid[this.x][this.y].color;
					var oldx = this.x;
					var oldy = this.y;
					oldValX = this.x;
					oldValY = this.y;
					this.movePawn(x1, y1);
					if(this.promotion(x1, y1)){
						// dragend(x2, oldx, oldy, x1, y1, pawnObj.name);
					}else{
						dragend(x2, oldx, oldy, x1, y1, pawnObj.name);
					}
				}else{
					this.movePawn(this.x, this.y);
					console.log("move is not correct");
				}
			}else{
				this.movePawn(this.x, this.y);
				console.log("Turn is not yours");
			}
		}else{
			alert("Turn is not yours")
			this.movePawn(this.x, this.y);
		}
	}

	this.movePawn = function(x1,y1){
		Grid[this.x][this.y] = undefined;
		this.x = x1;
		this.y = y1;
		this.plowObjKJS = new Kinetic.Image({
	        x: x1*cell+spaceOfCell,
	        y: y1*cell+spaceOfCell,
	        image: this.plowObj,
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
	              		x: pawnObj.x,
	              		y: pawnObj.y 
	              	}
	              }
	          }
		});
		var pawnObj = this;

		this.plowObjKJS.on('dragend', function() {
        	pawnObj.move(x,y);
    	});

		this.plowObjKJS.on('mouseover', function() {
	        document.body.style.cursor = 'pointer';
	    });

	    this.plowObjKJS.on('mouseout', function() {
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

	this.is_vacant = function(x1, y1){
		if (this.y == 1) {
			if (Grid[this.x][this.y].color == 'w') {
				if (this.y+1 == y1) {
					if (Grid[x1][y1] == undefined) {
						return true;
					}else{
						return false;
					}
				}else if (this.y+2 == y1) {
					if (Grid[x1][y1] == undefined && Grid[x1][y1-1] == undefined) {
						return true;
					}else {
						return false;
					}
				};
			}else if (Grid[this.x][this.y].color == 'b') {
				if (this.y-1 == y1) {
					if (Grid[x1][y1] == undefined) {
						return true;
					}else{
						return false;
					}
				};
			};

		}else if (this.y == 6) {
			if (Grid[this.x][this.y].color == 'b') {
				if (this.y-1 == y1) {
					if (Grid[x1][y1] == undefined) {
						return true;
					}else{
						return false;
					}
				}else if (this.y-2 == y1) {
					if (Grid[x1][y1] == undefined && Grid[x1][y1+1] == undefined) {
						return true;
					}else {
						return false;
					}
				};
			}else if (Grid[this.x][this.y].color == 'w') {
				if (this.y+1 == y1) {
					if (Grid[x1][y1] == undefined) {
						return true;
					}else{
						return false;
					}
				}
			};
			
		}else if (Grid[x1][y1] == undefined) {
				return true;
		}else {
			return false;
		}
	}

	this.Draw = function(){	
		layer.add(this.plowObjKJS);
	}

	this.promotion = function(x1, y1){
		if (Grid[this.x][this.y].color == 'w') {
			if (y1 == 7) {
   				$( "#newPown" ).dialog();
   				$("#newPown").show();
   				newValX = x1;
   				newValY = y1;
   				movedColor = 'w';
   				return true;
			};
		}else if (Grid[this.x][this.y].color == 'b') {
			if (y1 == 0) {
				$( "#newPown" ).dialog();
   				$("#newPown").show();
   				newValX = x1;
   				newValY = y1;
   				movedColor = 'b';
   				return true;
			};
		};
	}
}

function newpown (name) {
	selectedPownName = name;
	$('#newPown').dialog('close')
	if (selectedPownName != undefined) {
		createObj(selectedPownName)
	}else{
		alert("it is undefined")
	}
}