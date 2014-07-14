/**
 * Created by sergey on 02.07.2014.
 */
var nconf = require('nconf');
var path=require('path');
nconf.argv()
    .env()
    .file({ file: path.join(__dirname,'config.json') });
module.exports=nconf;
