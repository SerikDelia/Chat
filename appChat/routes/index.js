var checkAutch=require('../middleware/checkAutch');
module.exports=function(app){
    app.get('/',require('./frontpage').get);
    app.get('/login',require('./login').get);
    app.post('/login',require('./login').post);
    app.post('/logout',require('./logout').post);
    app.get('/chat',checkAutch,require('./chat').get);
    app.get('/createRoom',require('./createRoom').get);
    app.post('/createRoom',require('./createRoom').post);



}