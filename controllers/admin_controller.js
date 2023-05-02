const User = require("../models/user");
const bcrypt = require("bcryptjs");
module.exports.homePage = async function (req, res) {
    const token = req.cookies.jwt_admin;
    if (token) {
        const userr = await User.findOne({
        tokens: { $elemMatch: { token: token } },
        });
        if(userr&&userr.email=='admin@gmail.com'){
            const users = await User.find({});
            res.locals.users = users;
            res.render("Admin");
        }else{
            res.locals.title = "Admin login";
            res.render("adminLoginForm");
        }
    } else {
        res.locals.title = "Admin login";
        res.render("adminLoginForm");
    }
};
module.exports.logIn = async function (req, res) {
    if(req.body.email=='admin@gmail.com'){
        const userr = await User.findOne({ email: req.body.email });
        const matchPassword = await bcrypt.compare(req.body.password,userr.password);
        if(matchPassword){
            const token = await userr.generateAuthToken();
            console.log(token);
            res.cookie("jwt_admin", `${token}`, {
            httpOnly: true,
            });
            const users = await User.find({});
            res.locals.users = users;
            res.render("Admin");
        }else{
            res.locals.title = "Admin login";
            res.render("adminLoginForm");
        }
    }else{
        res.locals.title = "Admin login";
        res.render("adminLoginForm");
    }
};
module.exports.adminDetails = async function (req, res) {
    const token = req.cookies.jwt_admin;
    if (token) {
        const userr = await User.findOne({
        tokens: { $elemMatch: { token: token } },
        });
        if(userr&&userr.email=='admin@gmail.com'){
            const user = await User.findOne({ _id: req.params.id });
            res.locals.users = user;
            res.render("adminDetails");
        }else{
            res.render("action");
        }
    }else{
        res.render("action");
    }
};
module.exports.logOutAdmin=async function(req,res){
    const token = req.cookies.jwt_admin;
    if (token) {
        const userr = await User.findOne({
        tokens: { $elemMatch: { token: token } },
        });
        if(userr&&userr.email=='admin@gmail.com'){
            res.clearCookie('jwt_admin');
            const u=await User.updateOne({email:'admin@gmail.com'}, {$pull: {'tokens':{token:`${token}`},function(err){
                console.log(err);
            }}});
            console.log('chlllllllllllll');
            res.redirect('/admin');
        }else{
            res.redirect('/admin');
        }
    }else{
        res.redirect('/admin');
    }
}