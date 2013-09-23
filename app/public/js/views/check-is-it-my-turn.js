$(document).on('ready', function(){
	setInterval(isItMyTurn, 2000);
});

function isItMyTurn(){
	if($('#is_it_my_turn').val() == 0){
		var url = '/is_it_my_turn';
		$.get(url, function(newData){
			if (newData.turn != 'no') {
				var data = newData.turn;
				if (data[0] != undefined) {
					document.getElementById('is_it_my_turn').value = 1;
					if (x2 == 'w') {
						x2 = 'b'
					}else{
						x2 = 'w'
					}
					WK = 0;
					BK = 0;
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
					
					if (WK == 1 && BK == 1) {
						newGrid = document.getElementById(tmpGrid);
						Grid = tmpGrid;
					}else if(WK == 1 && BK == 0){
						alert("sorry you lost the game")
						window.location.href = "/home";
					}else if(WK == 0 && BK == 1 ){
						alert("sorry you lost the game")
						window.location.href = "/home";
					}
				};
				
			}
			if (newData.moves != 'no') {
				var data = newData.moves;
				var moves = new Array();
				for (var i = 0; i < data.length; i++) {
					moves[i] = data[i]+'<br/>';
				}
				document.getElementById('moves_info').innerHTML = moves.join(" ");
			};

			if (document.getElementById('is_it_my_turn').value == 1) {
				document.getElementById('status').innerHTML = 'Turn is yours';
			}else{
				document.getElementById('status').innerHTML = 'Turn is not yours';
			}

		});
	}
}