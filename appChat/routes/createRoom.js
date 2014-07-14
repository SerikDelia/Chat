/**
 * Created by sergey on 04.07.2014.
 */
var Room=require('../models/room').Room;
var HttpError=require('../error').HttpError;
var async=require('async');
var CreateRoomError=require('../models/room').CreateRoomError;
exports.get=function(req,res){

    res.render('createRoom');
};
exports.post=function(req,res,next){
   var roomName=req.body.name;
   var userCreate=req.body.username;
    console.log("Username for room create "+userCreate);
	console.log("name for room "+roomName);
	Room.createRoom(roomName,function(err,room){
     if(err){
         if(err instanceof CreateRoomError){
             return next(new HttpError(403,err.message));
         }else{
             return next(err);
         }

     }
        req.session.room=room._id;
        res.redirect("/chat");
    });


};
