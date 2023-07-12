const gameProgress=require('../models/gameProgress');
const user=require('../models/user')
const jwt=require('jsonwebtoken');
const timeCalculator=require("../config/timeCalculator");
module.exports.leaderboardDetails=async function(req,res){
    console.log('chelllllleee');
    const token = req.cookies.jwt;
    if(token){
        const id=jwt.decode(token,{complete:true}).payload._id;
        const userr = await user.findOne({_id:id,"tokens.token":token});
        if(userr){
            res.locals.user=userr;
            let gameDetails= await gameProgress.find({level:req.params.level,end_time:{$exists: true}}).populate('userId','first_name last_name');
            for(let i=0;i<gameDetails.length;i++){
                let timeDiff=await timeCalculator.timeDifference(gameDetails[i].end_time,gameDetails[i].start_time);
                gameDetails[i]['time']=`${timeDiff.days}:${timeDiff.hours}:${timeDiff.minutes}:${timeDiff.seconds}`;
                gameDetails[i]['accuracy']=100/gameDetails[i].submissions;
            }
            gameDetails.sort(function(a,b){
                if(a.accuracy>b.accuracy){
                    return -1;
                }else if(a.accuracy<b.accuracy){
                    return 1;
                }else{
                    var atemp=(a.time).replace(/:/g, '');
                    var btemp=(b.time).replace(/:/g, '');
                    atemp=Number(atemp);
                    btemp=Number(btemp);
                    return (atemp>btemp)?1:-1;
                }
            })
            res.locals.leaderboard=gameDetails;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.render('leaderboard');
        }else{
            res.clearCookie('jwt');
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            return res.redirect("/login");
        }
    }else{
        res.clearCookie('jwt');
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        return res.redirect("/login");
    }

}