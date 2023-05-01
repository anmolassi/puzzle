const User = require("../models/user");
module.exports.homePage=async function(req,res){
    const users=await User.find({});
    res.locals.users=users;
    res.render('Admin');
}
module.exports.adminDetails=async function(req,res){
    const user=await User.findOne({_id:req.params.id});
    res.locals.users=user;
    res.render('adminDetails');
}