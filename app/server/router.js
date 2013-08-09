var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var CM = require('./modules/challenges-manager');
var GM = require('./modules/game-manager');
var data;
var challengeId;
var request = require("request");

module.exports = function(app) {

// main login page //

	app.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/home');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	app.post('/', function(req, res){
		AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
			if (!o){
				res.send(e, 400);
			}else{
			    req.session.user = o;
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.send(o, 200);
			}
		});
	});
	
// logged-in user homepage //
	
	app.get('/home', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   else{
			res.render('home', {
				title : 'Control Panel',
				countries : CT,
				udata : req.session.user
			});
	    }
	});
	
	app.post('/home', function(req, res){
		if (req.param('user') != undefined) {
			AM.updateAccount({
				user 		: req.param('user'),
				name 		: req.param('name'),
				email 		: req.param('email'),
				country 	: req.param('country'),
				pass		: req.param('pass')
			}, function(e, o){
				if (e){
					res.send('error-updating-account', 400);
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.send('ok', 200);
				}
			});
		}	else if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		}
	});
	
// creating new accounts //
	
	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : CT });
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.param('name'),
			email 	: req.param('email'),
			user 	: req.param('user'),
			pass	: req.param('pass'),
			country : req.param('country')
		}, function(e){
			if (e){
				res.send(e, 400);
			}	else{
				res.send('ok', 200);
			}
		});
	});
// for challenges
	app.get('/addchallenge', function(req, res){
		challengeId = CM.addNewChallenge({
			challanged_user_id 	: req.query["challengedUserId"],
			challanger_user_id 	: req.query["challengerUserId"],
			accept				: 0,
			challanged_user_name: req.query["challengedUserName"],
			challanger_user_name: req.query["challengerUserName"],
		},function(){
				res.render('waiting',{'challenge_id':challengeId});
		});
	});

	app.get('/check_if_challenge_accepted', function(req, res){
		CM.check_if_challenge_accepted(req.query['challenge_id'], function(gameId){
			res.send(gameId);
			req.session.gameId = gameId;
		})
	});

	app.get('/is_it_my_turn', function(req, res){
		var userId = req.session.user._id;
		GM.find_turn({gameId: req.session.gameId,
					userid : userId
			}, function(turn){
			res.send(turn);
		})
	});

	app.get('/moves',function(req, res){
		GM.getAllMoves({
			gameId : req.session.gameId
		}, function(moves){
			res.send(moves)
		})
	})
	app.get('/challenges', function(req, res){
		CM.getAllChallenges( function(e, challengers){
			res.render('challenges', { title : 'Challengers List', challenge : challengers});
		})
	});

// for accepte list
	app.get('/addaccept', function(req, res){
		gameId = GM.createNewGame({
				player1_id 				: req.query["challengedUserId"],
				player1_color 			: 'w',
				player2_id 				: req.query["challengerUserId"],
				player2_color			: 'b',
				challengeId 			: req.query["challengeId"],
				grid 					: 0,
				last_move_player_id		: req.query["challengerUserId"],
				last_move_color			: 'w',
				x						: 0,
				y 						: 0,
				x1						: 0,
				y1						: 0,
		},function(){
				req.session.gameId = gameId;
				res.redirect("/play");
		});
		CM.updateAccpect({
			challengeId : req.query["challengeId"]
		})
	});

//game players list
	app.get('/playlist', function(req, res){
		GM.getAllGames( function(e, games){
			res.render('playlist', { title : 'Play List', game : games});
		})
	});

	

// password reset //

	app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.param('email'), function(o){
			if (o){
				res.send('ok', 200);
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// should add an ajax loader to give user feedback //
					if (!e) {
					//	res.send('ok', 200);
					}	else{
						res.send('email-server-error', 400);
						for (k in e) console.log('error : ', k, e[k]);
					}
				});
			}	else{
				res.send('email-not-found', 400);
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		var nPass = req.param('pass');
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o){
			if (o){
				res.send('ok', 200);
			}	else{
				res.send('unable to update password', 400);
			}
		})
	});
	
// view & delete accounts //
	
	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});
	
	app.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
	            req.session.destroy(function(e){ res.send('ok', 200); });
			}	else{
				res.send('record not found', 400);
			}
	    });
	});
	
	app.get('/reset', function(req, res) {
		AM.delAllRecords(function(){
			res.redirect('/print');	
		});
	});
	
	app.get('/playerslist', function(req, res) {
	    AM.getAllRecords( function(e, accounts){
			res.render('playerslist', { title : 'Players List', accts : accounts });
		})
	});

	app.get('/play', function(req, res) {
	    var user = req.session.user;
	    var game_id = req.session.gameId;
	    GM.findById(game_id, function(e, o){
	    	if(o){
	    		if(o.player1_id == user._id){
	    			res.render('play', {
	        			title: 'Play',
	        			is_it_my_turn:1,
	    			});
	    		}else{
	    			res.render('play', {
	        			title: 'Play',
	        			is_it_my_turn:0,
	    			});
	    		}
	    	}
	    });
	    
	});

	app.post('/move', function(req, res) {
		var movement = req.session.user.name +" > move "+req.query["moved_coin"] +" from x is "+ req.query["x"] +" and" +" y is " +req.query["y"] +" to "+"x is " + req.query["x1"] +" and"+ " y is " +req.query["y1"]
		var userid = user._id
		req.on('data', function (grid) {
			data = grid;
    	});
    	req.on('end', function () {
            res.end();
	        GM.gameUpdate(
	        	{grid 				: JSON.parse(data),
	        	 gameId 			: req.session.gameId,
	        	 moved_pawn_color	: req.query["moved_pawn_color"],
	        	 user_Id 			: req.session.user._id ,
	        	 x  				: req.query["x"],
	        	 y 					: req.query["y"],
	        	 x1 				: req.query["x1"],
	    		 y1 				: req.query["y1"]}, 
	        	function(){
					res.send();
				}
			);
    	});
    	GM.move({
			gameId : req.session.gameId,
			move   : movement
		},function(){
			res.send();
		})

	});
	
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
};