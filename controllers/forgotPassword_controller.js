const mailer = require('../config/Nodemailer');
const User = require("../models/user");
const resetPassword=require('../models/reset_password');
const crypto = require("crypto");
module.exports.generateForgotMail=async function(req,res){
    try {
        let token = crypto.randomBytes(20).toString("hex");
        let userr = await User.findOne({ email: req.body.email });
        if (userr) {
          let resetPass = await resetPassword.create({
            user: userr._id,
            accessToken: token,
            isValid: true,
          });
          resetPass = await resetPass.populate("user", "first_name last_name email");
          console.log(token);
          mailer.setPasswordMailSend(resetPass);
        }
        else{
          res.locals.action='nosuchuser';
          res.render('action');
        }
        return res.redirect("/");
      } catch (err) {
        console.log("Error", err);
        return res.redirect("/");
      }
}