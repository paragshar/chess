$(document).ready(function(){
	function check(){
		var url = '/check_if_challenge_accepted?challenge_id='+$('#challenge_id').val();
		$.get(url, function(data){
			if(data != 'no'){
				window.location.href = "/play";
			}
		});
	}
	setInterval(check, 1000);
});