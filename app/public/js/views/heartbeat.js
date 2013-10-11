$(document).on('ready', function(){
	setInterval(heartbeat, 5000);
});

function heartbeat () {
		url = "/hearbeat"
		$.get(url, function(data){
			if (data.noOfNewChallenge != 0) {
				document.getElementById('notification').innerHTML = data.noOfNewChallenge;
				$(".notification").show();
			} else{
				$(".notification").hide();
			};
		})
}