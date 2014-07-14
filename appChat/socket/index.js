/**
 * Created by sergey on 04.07.2014.
 */
var log=require('../libs/log')(module);
var config=require('../config');
var connect=require('connect');
var async=require('async');
var cookie=require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore=require('../libs/sessionStore');
var HttpError=require('../error').HttpError;
var User=require('../models/user').User;
var Room=require('../models/room').Room;
var usrArray=new Array();
var idSockets= new Array();
var data={};
var user={};

module.exports=function(server) {
       
 

   

    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);



    io.sockets.on('connection', function(socket) {
          
		  socket.emit('connection');
		  
         


        var usernameMain;
        
		socket.on('message', function(username, text, userSocket, callback) {
               
			if(userSocket){
			
			  for(var s= 0 ; s < io.sockets.sockets.length ; s++){
			   
			   if(io.sockets.sockets[s].id === userSocket){
			     
			     io.sockets.sockets[s].emit('message', username, text);
			     socket.emit('message', username, text);
			
			     }
			}
			}else{
			io.emit('message',username, text);
			}
           
		    //cb && cb();
        });
		
		socket.on('connectUser',function(username) {
			
			var isUser=false;
			if(usrArray.length==0){
			  
			   idSockets[username]=socket.id;
			   usrArray.push(username);
			   isUser=true;
			   socket.broadcast.emit('connectUser',username);		 
			   io.emit('listUserOnLine',usrArray);
              
			}else{
			for(var i=0; i<usrArray.length; i++ ){
			   if(usrArray[i] === username){
			        
                    isUser=true;				
			    };
				
			  };
			
			  
				if(!isUser){						
				  
				   idSockets[username]=socket.id;
				  usrArray.push(username);
				  var usersInfo=JSON.stringify(usrArray);
				  isUser=false;
		          socket.broadcast.emit('connectUser',username);		
			      io.emit('listUserOnLine',usrArray);
                  
				};
			
			};
					   
        });
       
	   socket.on('disconnectUser', function(username) {
            for(var i=0; i<usrArray.length; i++ ){
			  if(usrArray[i]=== username){
			   
			    var rem=usrArray.splice(i,1);
			    console.log("rem "+rem);
			   io.emit('disconnectUser', username);
			   
			  };
			};
			
			
           
        });
       
	  socket.on('connectUpload',function(getList ) {
	 
	  var usersInfo=JSON.stringify(usrArray);
	  socket.emit('connectUpload', usersInfo);
	  
	  });
	   socket.on('ChooseUser', function(userSocket) {
         
		
           data.username=userSocket;
		   data.id=idSockets[userSocket];
		   var strData=JSON.stringify(data);
		   
		   socket.emit('ChooseUser',strData);
          

        });

      
	  socket.on('changeStatus', function(status){
	      var userStatus = JSON.parse(status);
		    var usersInfo=JSON.stringify(usrArray);
		  
		  userStatus =JSON.stringify(userStatus);
		  io.emit('changeStatus',userStatus);
		  io.emit('listUserOnLine',usrArray);
	  });
	 

    });

    return io;
};