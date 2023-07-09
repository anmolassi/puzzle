const User = require("../models/user");
const gameProgress=require("../models/gameProgress");
const timeCalculator=require("../config/timeCalculator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
module.exports.homePage = async function (req, res) {
    const token = req.cookies.jwt_admin;
    if (token) {
        const id=jwt.decode(token,{complete:true}).payload._id;
        const userr = await User.findOne({_id:id,"tokens.token":token});
        if(userr&&userr.email=='admin@gmail.com'){
            const users = await User.find({});
            res.locals.users = users;
            res.render("Admin");
        }else{
            res.clearCookie('jwt_admin');
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
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
            let arr = new Array(8).fill(false)
            for(let i=1;i<8;i++){
                if(user.levelYN[i]==true){
                    const gameDetails=await gameProgress.findOne({userId:user._id,level:i});
                    let timeDiff=await timeCalculator.timeDifference(gameDetails.end_time,gameDetails.start_time);
                    var obj={};
                    obj['time']=`${timeDiff.days}:${timeDiff.hours}:${timeDiff.minutes}:${timeDiff.seconds}`;
                    obj['accuracy']=100/gameDetails.submissions;
                    arr[i]=obj;
                }
            }
            res.locals.gameDetails=arr;
            res.locals.users = user;
            res.render("adminDetails");
        }else{
            res.render("action");
        }
    }else{
        res.render("action");
    }
};
module.exports.deleteUser=async function(req,res){
    const token = req.cookies.jwt_admin;
    if (token) {
        const userr = await User.findOne({
        tokens: { $elemMatch: { token: token } },
        });
        if(userr&&userr.email=='admin@gmail.com'){
            const deleteUser= await User.findOneAndDelete({_id:req.params.id});
            res.redirect('/admin');
        }else{
            res.redirect('/admin');
        }
    }else{
        res.redirect('/admin');
    }
}
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