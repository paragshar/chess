var ScreenWidth = 600 ;
var ScreenHeight = 600 ;
var cell = 75;
var spaceOfCell = 21.5;
var x2 = 'b';
var params;
var is_it_my_turn;
var layer2;
var WK = 0;
var BK = 0;
var stage;
var selectedPownName;
var movedColor;
var newValX;
var newValY;
var oldValX;
var oldValY;
//image path for pawn 
	//for white
var whitePawn = '/img/game/white_pawn.gif';
var whiterook = '/img/game/white_rook.gif';
var whitebishop = '/img/game/white_bishop.gif';
var whiteknight = '/img/game/white_knight.gif';
var whiteQueen = '/img/game/white_queen.gif';
var whiteKing = '/img/game/white_king.gif';

	//for black
var blackPawn = '/img/game/black_pawn.gif';
var blackrook = '/img/game/black_rook.gif';
var blackbishop = '/img/game/black_bishop.gif';
var blackKnight = '/img/game/black_knight.gif';
var blackQueen = '/img/game/black_queen.gif';
var blackKing = '/img/game/black_king.gif';

var Grid = new Array(8)
	for (x = 0; x < 8; x++) {
	  Grid[x] = new Array(8);
	  for (y = 0; y < 8; y++) {
	  }
	}

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
	           window.webkitRequestAnimationFrame || 
	           window.mozRequestAnimationFrame || 
	           window.oRequestAnimationFrame || 
	           window.msRequestAnimationFrame ||
		        function(callback) {
		        	window.setTimeout(callback, 1000 / 60);
		        };
})();

window.onload = function () {
	
        stage = new Kinetic.Stage({
          container: 'canvas',
          width: ScreenWidth,
          height: ScreenHeight
        })
		layer2 = new Kinetic.Layer();

	    var wrook1 = new rook(layer2, 'w', 0, 0, whiterook, "rook");
	    Grid[0][0] = wrook1;

	    var wPawn1 = new pawn(layer2, 'w', 0, 1, whitePawn, "pawn");
	    Grid[0][1] = wPawn1;
	    
	    var wPawn2 = new pawn(layer2, 'w', 1, 1, whitePawn, "pawn");
	    Grid[1][1] = wPawn2;
	    
	    var wPawn3 = new pawn(layer2, 'w', 2, 1, whitePawn, "pawn");
	    Grid[2][1] = wPawn3;
	    
	    var wPawn4 = new pawn(layer2, 'w', 3, 1, whitePawn, "pawn");
	    Grid[3][1] = wPawn4;
	    
	    var wPawn5 = new pawn(layer2, 'w', 4, 1, whitePawn, "pawn");
	    Grid[4][1] = wPawn5;
	    
	    var wPawn6 = new pawn(layer2, 'w', 5, 1, whitePawn, "pawn");
	    Grid[5][1] = wPawn6;
	    
	    var wPawn7 = new pawn(layer2, 'w', 6, 1, whitePawn, "pawn");
	    Grid[6][1] = wPawn7;
	    
	    var wPawn8 = new pawn(layer2, 'w', 7, 1, whitePawn, "pawn");
	    Grid[7][1] = wPawn8;
	    
	    // for white rook 
	    var wrook2 = new rook(layer2, 'w', 7, 0, whiterook, "rook");
	    Grid[7][0] = wrook2;

	    // for white knight
	    var wknight1 = new knight(layer2, 'w', 1, 0, whiteknight, "knight");
	    Grid[1][0] = wknight1;

	    var wknight2 = new knight(layer2, 'w', 6, 0, whiteknight, "knight");
	    Grid[6][0] = wknight2;

	    //for white bishop
	    var wbishop1 = new bishop(layer2, 'w', 2, 0, whitebishop, "bishop");
	    Grid[2][0] = wbishop1;

	    var wbishop2 = new bishop(layer2, 'w', 5, 0, whitebishop, "bishop");
	    Grid[5][0] = wbishop2;

	    //for white queen
	    var wqueen = new queen(layer2, 'w', 3, 0, whiteQueen, "queen");
	    Grid[3][0] = wqueen;

	    //for white king
	    var wking = new king(layer2, 'w', 4, 0, whiteKing, "king");
	    Grid[4][0] = wking;

	    // for black pawn
	    var bPawn1 = new pawn(layer2, 'b', 0, 6, blackPawn, "pawn");
	    Grid[0][6] = bPawn1;
	    
	    var bPawn2 = new pawn(layer2, 'b', 1, 6, blackPawn, "pawn");
	    Grid[1][6] = bPawn2;
	    
	    var bPawn3 = new pawn(layer2, 'b', 2, 6, blackPawn, "pawn");
	    Grid[2][6] = bPawn3;
	    
	    var bPawn4 = new pawn(layer2, 'b', 3, 6, blackPawn, "pawn");
	    Grid[3][6] = bPawn4;
	    
	    var bPawn5 = new pawn(layer2, 'b', 4, 6, blackPawn, "pawn");
	    Grid[4][6] = bPawn5;
	    
	    var bPawn6 = new pawn(layer2, 'b', 5, 6, blackPawn, "pawn");
	    Grid[5][6] = bPawn6;
	    
	    var bPawn7 = new pawn(layer2, 'b', 6, 6, blackPawn, "pawn");
	    Grid[6][6] = bPawn7;
	    
	    var bPawn8 = new pawn(layer2, 'b', 7, 6, blackPawn, "pawn");
	    Grid[7][6] = bPawn8;

	    // for black rook
	    var brook1 = new rook(layer2, 'b', 0, 7, blackrook, "rook");
	    Grid[0][7] = brook1;

	    var brook2 = new rook(layer2, 'b', 7, 7, blackrook, "rook");
	    Grid[7][7] = brook2;

	    // for black bishop
	    var bbishop1 = new bishop(layer2, 'b', 2, 7, blackbishop, "bishop");
	    Grid[2][7] = bbishop1;

	    var bbishop2 = new bishop(layer2, 'b', 5, 7, blackbishop, "bishop");
	    Grid[5][7] = bbishop2;

	    // for black knight
	    var bknight1 = new knight(layer2, 'b', 1, 7, blackKnight, "knight");
	    Grid[1][7] = bknight1;

	    var bknight2 = new knight(layer2, 'b', 6, 7, blackKnight, "knight");
	    Grid[6][7] = bknight2;

	    // for black queen
	    var bqueen = new queen(layer2, 'b', 3, 7, blackQueen, "queen");
	    Grid[3][7] = bqueen;

	    // for black king
	    var bking = new king(layer2, 'b', 4, 7, blackKing, "king");
	    Grid[4][7] = bking;
	    
	    stage.add(layer2);

	Draw();

	function Draw(){
		layer2.removeChildren();
			var imageObj = new Image();
			for (x = 0; x < 8; x++) {
				for (y = 0; y < 8; y++) {
					if(Grid[x][y] != undefined){
						var obj = Grid[x][y];
						if(obj != undefined){
							obj.Draw();
						}
					}
				};
			};
		layer2.draw();
		requestAnimFrame(function() {
		    Draw();
		 });
	}
}	

function createGameObject(obj){
	if(obj.imgSrc == "/img/game/white_pawn.gif"){
		el = new pawn(layer2, 'w', obj.x, obj.y, whitePawn, obj.name);
	}else if (obj.imgSrc == "/img/game/white_king.gif") {
		WK = 1;
		el = new king(layer2, 'w', obj.x, obj.y, whiteKing, obj.name);
	}else if (obj.imgSrc == "/img/game/white_rook.gif") {
		el = new rook(layer2, 'w', obj.x, obj.y, whiterook, obj.name);
	}else if (obj.imgSrc == "/img/game/white_bishop.gif") {
		el = new bishop(layer2, 'w', obj.x, obj.y, whitebishop, obj.name);
	}else if (obj.imgSrc == "/img/game/white_knight.gif") {
		el = new knight(layer2, 'w', obj.x, obj.y, whiteknight, obj.name);
	}else if (obj.imgSrc == "/img/game/white_queen.gif") {
		el = new queen(layer2, 'w', obj.x, obj.y, whiteQueen, obj.name);
	}else if(obj.imgSrc == "/img/game/black_pawn.gif")
		el = new pawn(layer2, 'b', obj.x, obj.y, blackPawn, obj.name);
	else if(obj.imgSrc == "/img/game/black_king.gif"){
		BK = 1;
		el = new king(layer2, 'b', obj.x, obj.y, blackKing, obj.name);
	}else if (obj.imgSrc == "/img/game/black_rook.gif") {
		el = new rook(layer2, 'b', obj.x, obj.y, blackrook, obj.name);
	}else if (obj.imgSrc == "/img/game/black_bishop.gif") {
		el = new bishop(layer2, 'b', obj.x, obj.y, blackbishop, obj.name);
	}else if (obj.imgSrc == "/img/game/black_knight.gif") {
		el = new knight(layer2, 'b', obj.x, obj.y, blackKnight, obj.name);
	}else if (obj.imgSrc == "/img/game/black_queen.gif") {
		el = new queen(layer2, 'b', obj.x, obj.y, blackQueen, obj.name);
	}
	return el;
}

function dragend(color, x, y, x1, y1, name)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	is_it_my_turn = 'false';
	xmlhttp.open("post","/move?moved_pawn_color=" + color + "&x=" + x + "&y=" + y +"&x1=" + x1 +"&y1=" +y1 + "&moved_coin=" + name,true);
	var trgrid = getTransformedGrid();
	xmlhttp.send(trgrid);
		if (BK == 0 && WK == 0) {
			document.getElementById('is_it_my_turn').value = 0;
			document.getElementById('pgrid').value = trgrid;
		}else if(BK == 1 && WK == 0){
			alert("Game Over White is \n WINNER")
			document.getElementById('is_it_my_turn').value = 1;
			window.location.href = "/home";
		}else if(BK == 0 && WK == 1){
			alert("Game Over Black is \n WINNER")
			document.getElementById('is_it_my_turn').value = 1;
			window.location.href = "/home";
		}
}

function getTransformedGrid(){
	var transformedGrid = new Array(8);
	for(var i = 0; i < Grid.length; i++){
		transformedGrid[i] = new Array(8);
		for(var j = 0; j < Grid[i].length; j++){
			var el = Grid[i][j];
			if(el != undefined){
				if (el.imgSrc == "/img/game/black_king.gif") {
					var obj = {color:el.color, x:el.x, y:el.y, imgSrc:el.imgSrc, name:el.name};
					transformedGrid[i][j] = obj;
					BK = 0
				}else if (el.imgSrc == "/img/game/white_king.gif") {
					var obj = {color:el.color, x:el.x, y:el.y, imgSrc:el.imgSrc, name:el.name};
					transformedGrid[i][j] = obj;
					WK = 0
				}else{
					var obj = {color:el.color, x:el.x, y:el.y, imgSrc:el.imgSrc, name:el.name};
					transformedGrid[i][j] = obj;
				}
			}
		}
	}
	return JSON.stringify(transformedGrid);
}

function getParam( name )
{
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ){
		return "";
	}
	else{
		return results[1];
	}
}


function animation (x, y, x1, y1, color) {
	var cellspace = 21.5;
    var cell = 75
    if (color == 'b') {
		var layer = new Kinetic.Layer();
		var rect = new Kinetic.Rect({
			x: x*cell,
			y: y*cell,
			width: 75,
			height: 75,
			stroke: 'black',
			strokeWidth: 4
		});
	}else{
		var layer = new Kinetic.Layer();
		var rect = new Kinetic.Rect({
			x: x*cell,
			y: y*cell,
			width: 75,
			height: 75,
			stroke: 'white',
			strokeWidth: 4
		});
	}

		layer.add(rect);
		stage.add(layer);

		var tween = new Kinetic.Tween({
		node: rect, 
		x: x1*cell,
		y: y1*cell,
		});

		setTimeout(function() {
		tween.play();
		},500);

		setTimeout(function(){
			clearlayer()
		},4000)

		function clearlayer(){
			layer.remove();
		}
}

function createObj (Objname) {
 	if (movedColor == 'w') {
 		if (Objname == 'bishop') {
 			var obj = new bishop(layer2, 'w', newValX, newValY, whitebishop, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('w', oldValX, oldValY, newValX, newValY, Objname);
 		}else if (Objname == 'queen') {
 			var obj = new queen(layer2, 'w', newValX, newValY, whiteQueen, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('w', oldValX, oldValY, newValX, newValY, Objname);
 		}else if (Objname == 'knight') {
 			var obj = new knight(layer2, 'w', newValX, newValY, whiteknight, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('w', oldValX, oldValY, newValX, newValY, Objname);
 		}else if(Objname == 'rook'){
 			var obj = new rook(layer2, 'w', newValX, newValY, whiterook, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('w', oldValX, oldValY, newValX, newValY, Objname);
 		}
 	}else if (movedColor == 'b') {
 		if (Objname == 'bishop') {
 			var obj = new bishop(layer2, 'b', newValX, newValY, blackbishop, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('b', oldValX, oldValY, newValX, newValY, Objname);
 		}else if (Objname == 'queen') {
 			var obj = new queen(layer2, 'b', newValX, newValY, blackQueen, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('b', oldValX, oldValY, newValX, newValY, Objname);
 		}else if (Objname == 'knight') {
 			var obj = new knight(layer2, 'b', newValX, newValY, blackKnight, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('b', oldValX, oldValY, newValX, newValY, Objname);
 		}else if(Objname == 'rook'){
 			var obj = new rook(layer2, 'b', newValX, newValY, blackrook, Objname)
 			Grid[newValX][newValY] = obj;
 			dragend('b', oldValX, oldValY, newValX, newValY, Objname);
 		}
 	}
} 