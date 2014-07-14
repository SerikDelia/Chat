var Room=require('../models/room').Room;

module.exports=function(req,res,next){
    req.room= res.locals.room=null;
  if(!req.session.user) return next();
    
	Room.findById(req.session.room,function(err,room){
       if(err) return next(err);
        req.room= res.locals.room =room;
        next();
    });
};