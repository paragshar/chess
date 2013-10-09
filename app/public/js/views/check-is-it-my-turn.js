$(document).on('ready', function(){
	setInterval(isItMyTurn, 2000);
});

function isItMyTurn(){
	if($('#is_it_my_turn').val() == 0){
		var url = '/is_it_my_turn';
		$.get(url, function(newData){
			// document.getElementById('player1').innerHTML=newData.turn[0]['player1'];
			// document.getElementById('player2').innerHTML=newData.turn[0]['player2'];
			if (newData.turn != 'no' ) {
				var data = newData.turn;
				if (data[0] != null ) {
					document.getElementById('is_it_my_turn').value = 1;
					document.getElementById('player1').innerHTML=newData.turn[0]['player1'];
					document.getElementById('player2').innerHTML=newData.turn[0]['player2'];
					WK = 0;
					BK = 0;
					// animation(data[0]["x"], data[0]["y"], data[0]["x1"], data[0]["y1"], data[0]["last_move_color"])
					var tmpGrid = new Array();
					for (var i = 0; i < 8; i++) {
						tmpGrid[i] = new Array();
						for (var j = 0; j < 8; j++) {
							if (data[0]["grid"][i][j] != null) {
								elmObj = createGameObject(data[0]["grid"][i][j]);
								tmpGrid[i][j] = elmObj;
							}
						}
					}
					hideEle(data[0]["x"], data[0]["y"], data[0]["x1"], data[0]["y1"], data[0]["moved_coin"], data[0]["last_move_color"]);
					Grid = tmpGrid;
					// console.log(data[0]["last_move_color"]);
					
					if (WK == 1 && BK == 1) {
						newGrid = document.getElementById(tmpGrid);
						Grid = tmpGrid;
						if (x2 == 'w') {
							x2 = 'b'
						}else{
							x2 = 'w'
						}
					}else if(WK == 1 && BK == 0){
						$(".congrads").show();
						$(".play-inner").hide();
						window.location.href = "/home";
					}else if(WK == 0 && BK == 1 ){
						$(".sorry").show();
						$(".play-inner").hide();
						window.location.href = "/home";
					}
				};
				
			}
			if (newData.moves != 'no') {
				var playersname = new Array();
				var moves_info = new Array();
				var data = newData.moves;
				var moves = new Array();
				for (var i = 0; i < data.length; i++) {
					moves[i] = data[i]+">";
				}
				var newmoves = moves.join(" ");
				var newmoves1 = newmoves.split(">");
				for (var i = 0; i < newmoves1.length; i += 2) {
					playersname.push( newmoves1[i]);
				};
				for (var i = 1; i < newmoves1.length; i += 2) {
					moves_info.push( newmoves1[i]);
					
				};
				document.getElementById('moves_info').innerHTML = moves_info.join(" ");
				document.getElementById('playersname').innerHTML = playersname.join(" ");
			};

			if (document.getElementById('is_it_my_turn').value == 1) {
				document.getElementById('status').innerHTML = 'Turn is yours';
			}else{
				document.getElementById('status').innerHTML = 'Turn is not yours';
			}

		});
	}
}