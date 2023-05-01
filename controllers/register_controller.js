const user = require("../models/user");
const Mailer = require("../config/Nodemailer");
module.exports.registerForm = function (req, res) {
  res.render("register");
};

module.exports.register = async function (req, res) {
  console.log(req.body.password);
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
      res.redirect("/register");
    }
  } else {
    // res.send("email already exists");
    res.redirect("/register");
  }
};
