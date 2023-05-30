const user=require('../models/user')
const jwt=require('jsonwebtoken');
const UUID = require("uuid-v4");

module.exports.home = async function (req, res) {
  const token = req.cookies.jwt;
  if(token){
    const id=jwt.decode(token,{complete:true}).payload._id;
    const userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr&&userr.email!='admin@gmail.com'){
      res.locals.user=userr;
      res.locals.level=userr.levelYN;
      res.render('gameNavMenu');
    }else{
      res.clearCookie('jwt');
      return res.render("welcome");
    }
  }
  else{
    return res.render("welcome");
  }
};