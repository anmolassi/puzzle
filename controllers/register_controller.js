const user = require("../models/user");
const Mailer = require("../config/Nodemailer");
var validRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var validRegexName = /^[a-zA-Z]+$/;
let symbols=/^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*]).{1,}$/;
let capitals=/^(?=.*[A-Z]).{1,}$/;
let numbers=/^(?=.*\d).{1,}$/;
module.exports.registerForm = function (req, res) {
  res.render("register");
};

module.exports.register = async function (req, res) {
  console.log(req.body.password);
  if(!req.body.email.match(validRegex)){
    res.render('oversmart');
    return;
  }
  if(!req.body.first_name.match(validRegexName)){
    res.render('oversmart');
    return;
  }
  if(!req.body.last_name.match(validRegexName)){
    res.render('oversmart');
    return;
  }
  if(!(req.body.password.match(symbols)&&req.body.password.match(capitals)&&req.body.password.match(numbers)&&req.body.password.length>=8)){
    res.render('oversmart');
    return;
  }
  const userr = await user.findOne({ email: req.body.email });
  if (!userr) {
    if (req.body.password == req.body.confirm_password) {
      const newuser = await user.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        verified: false,
        email: req.body.email,
      });
      console.log(newuser);
      res.locals.action = "checkMail";
      res.render("action");
      Mailer.verifyNewUser(newuser);
    } else {
      // res.send("passwords doesn't match");
      res.render('oversmart');
    }
  } else {
    // res.send("email already exists");
    res.render('oversmart');
  }
};
