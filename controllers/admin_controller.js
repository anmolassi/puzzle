const User = require("../models/user");
const gameProgress=require("../models/gameProgress");
const resetPassword=require("../models/reset_password");
const timeCalculator=require("../config/timeCalculator");
const ipDatabase=require('../models/permittedIP');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
module.exports.homePage = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        const token = req.cookies.jwt_admin;
        if (token) {
            const id=jwt.decode(token,{complete:true}).payload._id;
            const userr = await User.findOne({_id:id,"tokens.token":token});
            if(userr&&userr.email=='admin@gmail.com'){
                const users = await User.find({});
                res.locals.users = users;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
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
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.logIn = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        if(req.body.email=='admin@gmail.com'){
            const userr = await User.findOne({ email: req.body.email });
            const matchPassword = await bcrypt.compare(req.body.password,userr.password);
            if(matchPassword){
                const token = await userr.generateAuthToken();
                console.log(token);
                res.cookie("jwt_admin", `${token}`, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
                });
                const users = await User.find({});
                res.locals.users = users;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }else{
                res.locals.title = "Admin login";
                res.redirect('/admin');
            }
        }else{
            res.locals.title = "Admin login";
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.adminDetails = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
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
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.render("adminDetails");
            }else{
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.locations = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                const ips = await ipDatabase.find({});
                res.locals.ips = ips;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.render("AdminIPs");
            }else{
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.deleteUser=async function(req,res){
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                await User.findOneAndDelete({_id:req.params.id});
                await gameProgress.deleteMany({userId:req.params.id});
                await resetPassword.deleteMany({user:req.params.id})
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }else{
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
}
module.exports.addLocation=async function(req,res){
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                try{
                    await ipDatabase.create({ipAddress:req.params.ipaddress});
                }catch(err){
                    console.log('LOCATIONS ALREADY EXISTS');
                }
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin/locations');
            }else{
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
}
module.exports.deleteLocation=async function(req,res){
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    if(ipp){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                await ipDatabase.deleteOne({ipAddress:req.params.ipaddress});
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin/locations');
            }else{
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
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
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin');
        }else{
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin');
        }
    }else{
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.redirect('/admin');
    }
}