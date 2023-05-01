const user=require('../models/user');
module.exports.logout=async function(req,res){
    try{
        res.clearCookie('jwt');
        console.log('logout successfully');
        // console.log(req.token);
        const u=await user.updateOne({_id:req.user._id}, {$pull: {'tokens':{token:`${req.token}`},function(err){
            console.log(err);
        }}});
        // console.log(u);
        res.locals.title='Home';
        res.redirect('/');
    }catch(error){
        res.redirect('/');
    }
}