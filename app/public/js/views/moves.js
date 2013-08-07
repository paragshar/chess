$(document).on('ready', function(){
	setInterval(moves, 2000);
});


function moves (){
	var moves = new Array();
	var url = '/moves';
		$.get(url, function(data){
			if (data != 'no') {
				for (var i = 0; i < data.length; i++) {
					moves[i] = data[i]['move']+'<br/>';
				}
				document.getElementById('moves_info').innerHTML = moves;
			}
		});
}