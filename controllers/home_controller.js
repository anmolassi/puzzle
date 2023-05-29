const user=require('../models/user')
const jwt=require('jsonwebtoken');
const UUID = require("uuid-v4");

module.exports.home = async function (req, res) {
  // res.sendStatus( 403 )
  const token = req.cookies.jwt;
  if(token){
    const id=jwt.decode(token,{complete:true}).payload._id;
    const userr = await user.findOne({_id:id});
    if(userr&&userr.email!='admin@gmail.com'){
      res.locals.user=userr;
      // res.status(200).send(`Welcome! ${userr.first_name} ${userr.last_name}.`);
      // console.log(userr.levelYN);
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