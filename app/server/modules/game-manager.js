var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');
var ObjectID 	= require('mongodb').ObjectID;
var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'node-login';

/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}
});

var games = db.collection('games');
var moves = db.collection('moves');

exports.createNewGame = function(newData, callback)
{
	// append date stamp when record was created //
	games.insert(newData, {safe: true}, callback);
	return(newData._id)
};

exports.getAllGames = function(callback)
{
	games.find().toArray(
		function(e, res) {
			if (e) 
				callback(e)
			else 
				callback(null, res)
		}
	);
};

exports.gameUpdate = function(newData, callback)
{
	games.find({'_id' : ObjectID(newData.gameId)}).toArray(
		function(err, res){
	    if(err){
	    	callback(err);
	    }else{
	    	if(res[0]['player1_id'] == newData.user_Id){
	    		games.update(
				{ '_id' :ObjectID(newData.gameId) }, { $set: { grid: newData.grid , last_move_player_id : newData.user_Id, last_move_color : newData.moved_pawn_color , x : newData.x , y : newData.y , x1 : newData.x1 , y1: newData.y1} } ,
		    	function(err, res){
				    if(err){
				    	callback(err);
				    }
				});
	    	}else if(res[0]['player2_id'] == newData.user_Id){
	    		games.update(
				{ '_id' :ObjectID(newData.gameId) }, { $set: { grid: newData.grid , last_move_player_id : newData.user_Id, last_move_color : newData.moved_pawn_color , x : newData.x , y : newData.y , x1 : newData.x1 , y1: newData.y1} } ,
		    	function(err, res){
				    if(err){
				    	callback(err);
				    }
				});
	    	}
	    }
	});
};

exports.find_turn = function(newData, callback){
	games.find({'_id' : ObjectID(newData.gameId)}).toArray(
		function(e, res) {
			if (res[0]['last_move_player_id'] != newData.userid) {
				callback(res)
			}else{
				callback('no')
			}
		}
	);
}

exports.findById = function(gameId, callback){
	games.findOne({_id:ObjectID(gameId)}, callback);
};

exports.move = function(newData, callback){
	moves.insert(newData, {safe: true}, callback);
}

exports.getAllMoves = function(newData, callback){
	moves.find({gameId : newData.gameId}).toArray(
		function(e, res) {
				if (res.length != 0) {
					callback(res)
				}else{
					callback('no')
				}
		}
	)
}