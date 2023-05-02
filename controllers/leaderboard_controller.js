const gameProgress=require('../models/gameProgress');
const user=require('../models/user')
const timeCalculator=require("../config/timeCalculator");
module.exports.leaderboardDetails=async function(req,res){
    const token = req.cookies.jwt;
    if(token){
        const userr = await user.findOne({tokens:{$elemMatch:{token:token}}});
        res.locals.user=userr;
        let gameDetails= await gameProgress.find({level:req.params.level,end_time:{$exists: true}}).populate('userId','first_name last_name');
        for(let i=0;i<gameDetails.length;i++){
            let timeDiff=await timeCalculator.timeDifference(gameDetails[i].end_time,gameDetails[i].start_time);
            gameDetails[i]['time']=`${timeDiff.days}:${timeDiff.hours}:${timeDiff.minutes}:${timeDiff.seconds}`;
            gameDetails[i]['accuracy']=100/gameDetails[i].submissions;
        }
        gameDetails.sort(function(a,b){
            if(a.accuracy>b.accuracy){
                return 1;
            }else if(a.accuracy<b.accuracy){
                return -1;
            }else{
                return (a.time>b.time)?1:-1;
            }
        })
        res.locals.leaderboard=gameDetails;
        res.render('leaderboard');
    }else{
        res.clearCookie('jwt');
        return res.render("welcome");
    }

}