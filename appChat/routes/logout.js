/**
 * Created by sergey on 04.07.2014.
 */
exports.post=function(req,res){
    req.session.destroy();
    res.redirect('/');
}
