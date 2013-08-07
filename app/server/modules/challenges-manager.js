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
	}	else{
	}
});
var challenges = db.collection('challenges');
var games = db.collection('games');

exports.addNewChallenge = function(newData, callback)
{
	// append date stamp when record was created //
	challenges.insert(newData, {safe: true}, callback);
	return(newData._id);
};

exports.getAllChallenges = function(callback)
{
	challenges.find().toArray(
		function(e, res) {
			if (e)
				callback(e)
			else 
				callback(null, res);
		}
	);
};

exports.updateAccpect = function(challengeId, callback)
{
	challenges.update(
	 { '_id': ObjectID(challengeId.challengeId) }, { $set: { accept :1 } } ,
    function(err,res){
        if (err){
            callback(err);
        }
    });
}

exports.check_if_challenge_accepted = function(challengeId, callback)
{
	challenges.find({'_id':ObjectID(challengeId)}).toArray(
		function(e, res){
		    if(res[0]['accept'] == 1){
		    	games.find({'challengeId' : challengeId}).toArray(
					function(e, res){
						callback(res[0]['_id'])
					}
				)
		    }else{
		    	callback('no');
		    }
		}
	);
}