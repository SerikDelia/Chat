/**
 * Created by sergey on 03.07.2014.
 */

var mongoose=require('libs/mongoose');
var async=require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
	createUsers

],function(err){
    mongoose.disconnect();
    console.log(arguments);
});


function open(callback){
    mongoose.connection.on('open',callback);
}
function dropDatabase(callback){
    var db=mongoose.connection.db;
    db.dropDatabase(callback);
}
function requireModels(callback){
    require('models/user');
    async.each(Object.keys(mongoose.models),function(modelName,callback){
        mongoose.models[modelName].ensureIndexes(callback);
    },callback)
}

function createUsers(callback){

    var users=[
        {username: 'Вася', password: 'sypervasya'},
        {username: 'Коля', password: '123'},
        {username: 'admin',password: 'thetruehero'}
    ];
    async.each(users,function(userData,callback){
        var user=new mongoose.models.User(userData);

        user.save(callback);
    },callback);
}
function close(callback){
    mongoose.disconnect(callback);
}



