const user=require('../models/user')
const jwt=require('jsonwebtoken');
const UUID = require("uuid-v4");

module.exports.home = async function (req, res) {
  const token = req.cookies.jwt;
  if(token){
    const id=await jwt.decode(token,{complete:true}).payload._id;
    const userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr&&userr.email!='admin@gmail.com'){
      res.locals.user=userr;
      res.locals.level=userr.levelYN;
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      res.render('gameNavMenu');
    }else{
      res.clearCookie('jwt');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      return res.render("welcome");
    }
  }
  else{
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
    return res.render("welcome");
  }
};