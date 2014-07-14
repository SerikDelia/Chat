//var crypto=require('crypto');
var async=require('async');
var util = require('util');
var mongoose=require('../libs/mongoose'),
   Schema=mongoose.Schema;
var schema_room = new Schema({
    name:{
        type:String,       
        unique:true,
		required: true
    },   
	created:{
        type: Date,
        default:Date.now
    }
});

/*schema.methods.encryptPassword=function(password){

  return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
};*/

/*schema.virtual('password')
    .set(function(password){
        this._plainPassword=password;
        this.salt=Math.random()+'';
        this.hashedPassword=this.encryptPassword(password);
    })
    .get(function(){return this._plainPassword});*/

/*schema.methods.checkPassword=function(password){
  return this.encryptPassword(password) === this.hashedPassword;
};*/

schema_room.statics.createRoom=function(roomName, callback){
    var Room=this;
    async.waterfall([
        function(callback){
            Room.findOne({roomName:roomName},callback);
        },
        function(room ,callback){
            if(room){             
               callback(new CreateRoomError("Error : Room is done already"));
            }else{
                var room=new Room({name: roomName});
                room.save(function(err){
                    if(err) return callback(err);
                    callback(null,room);
                });

            }
        }
    ],callback);
};
exports.Room=mongoose.model('Room',schema_room);

function CreateRoomError(message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, CreateRoomError);


    this.message=message ;
}
util.inherits(CreateRoomError, Error);
CreateRoomError.prototype.name='CreateRoomError';

exports.CreateRoomError=CreateRoomError;