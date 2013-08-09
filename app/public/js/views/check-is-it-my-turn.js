$(document).on('ready', function(){
	setInterval(isItMyTurn, 2000);
});

function isItMyTurn(){
	if($('#is_it_my_turn').val() == 0){
		var url = '/is_it_my_turn';
		$.get(url, function(data){
			if (data != 'no') {
				document.getElementById('is_it_my_turn').value = 1;
					if (x2 == 'w') {
						x2 = 'b'
					}else{
						x2 = 'w'
					}
				WK = 0;
				BK = 0;
				// console.log("color="+data[0]["last_move_color"]);
				animation(data[0]["x"], data[0]["y"], data[0]["x1"], data[0]["y1"], data[0]["last_move_color"])
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
				Grid = tmpGrid;
				if (WK == 1 && BK == 1) {
					newGrid = document.getElementById(tmpGrid);
					Grid = tmpGrid;
				}else if(WK == 1 && BK == 0){
					alert("Game Over White is \n WINNER")
					window.location.href = "/home";
				}else if(WK == 0 && BK == 1 ){
					alert("Game Over Black is \n WINNER")
					window.location.href = "/home";
				}
			}
			if (document.getElementById('is_it_my_turn').value == 1) {
				document.getElementById('status').innerHTML = 'Turn is yours';
			}else{
				document.getElementById('status').innerHTML = 'Turn is not yours';
			}
		});
	}
}