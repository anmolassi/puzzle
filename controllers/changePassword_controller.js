const User = require("../models/user");
const bcrypt = require("bcryptjs");
const resetPassword=require('../models/reset_password');
module.exports.pageToChangePassword=async function(req,res){
    try {
        let resetCheck=await resetPassword.findOneAndDelete({accessToken:req.params.key}).populate('user','_id first_name last_name');
        // console.log(resetCheck);
        if(resetCheck){
            let user=await User.findOne({_id:resetCheck.user._id});
            if(user){
                return res.render('changePassword', {
                  user: user,
                });
            }else{
                res.locals.action='nosuchuser';
                res.render('action');
            }
        }
        else{
          res.locals.action='nosuchuser';
          res.render('action');
        }
      } catch (err) {
        console.log("Error", err);
        return res.redirect("/");
      }
}

module.exports.setNewPassword=async function(req,res){
  const user=await User.findOneAndUpdate({_id:req.body.user_id},{password:await bcrypt.hash(req.body.new_password, 10)},{new:true});
  console.log(user);
  const token = await user.generateAuthToken();
  console.log(token);
  res.cookie("jwt", `${token}`, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure:true
  });
  res.redirect('/');
}