/**
 * Created by sergey on 03.07.2014.
 */
var mongoose = require('mongoose');
var config=require('../config');
mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));
module.exports=mongoose;