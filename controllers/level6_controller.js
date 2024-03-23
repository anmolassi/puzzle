const gameProgress = require("../models/gameProgress");
const User = require("../models/user");
const jwt=require('jsonwebtoken');
let answers = ["0", "fence", "breath", "fire","silence","future","flag","footprints"];
let answersCapital = ["0", "Fence", "Breath", "Fire","Silence","Future","Flag","Footprints"];
let answersCapitalThe = ["0", "The Fence", "The Breath", "The Fire","The Silence","The Future","The Flag","The Footprints"];
let answersthe = ["0", "the fence", "the breath", "the fire","the silence","the future","the flag","the footprints"];
async function timeDifference(date1, date2) {
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);
  var timedetails = {
    days: daysDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference,
  };
  return timedetails;
}
module.exports.getPuzzle = async function (req, res) {
  const token = req.cookies.jwt;
  if (token) {
    const id=jwt.decode(token,{complete:true}).payload._id;
    const userr = await User.findOne({_id:id,"tokens.token":token});
    if(userr){
      if (userr._id == req.params.id) {
        const level1 = await gameProgress.findOne({
          userId: userr._id,
          level: 6,
        });
        if (level1.start_time == undefined || level1.start_time == null) {
          const level = await gameProgress.findOneAndUpdate(
            { $and: [{ userId: userr.id }, { level: 6 }] },
            { start_time: Date.now() },
            { new: true }
          );
          console.log(level);
        }
        res.locals.start_time = level1.start_time;
        res.locals.user = userr;
        res.locals.userId = req.params.id;
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
        res.setHeader("Content-Security-Policy", "default-src 'self' https://www.youtube.com/embed/; style-src 'self' 'unsafe-inline'; frame-src 'self' https://www.youtube.com/embed/ ;img-src 'self' https://i.ytimg.com/ ;connect-src 'self'  https://anmol-assi-puzzle-game.azurewebsites.net/level1/;script-src 'self' 'unsafe-inline'");
        res.render("level6");
      } else {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.redirect("/login");
      }
    }else{
      res.clearCookie('jwt');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      res.redirect("/login");
    }
  } else {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
    res.redirect("/login");
  }
};
module.exports.checkAndSubmit = async function (req, res) {
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
    res.render("action");
  }

  const level1 = await gameProgress.findOne({
    $and: [{ userId: req.body.id }, { level: req.body.level }],
  });
  if (user.levelYN[req.body.level] == true) {
    // success
    const newlevel = await gameProgress.findOne({
      $and: [{ userId: req.body.id }, { level: req.body.level }],
    });
    var data = {
      accuracy: Math.round(100 / (newlevel.submissions)),
      time: await timeDifference(newlevel.end_time, newlevel.start_time),
      message: "success",
    };
    res.send(data);
  } 
  else 
  {
    if (level1.end_time == undefined || level1.end_time == null) 
    {
      req.body.answer=req.body.answer.toLowerCase();
      if (answers[req.body.level] == req.body.answer||answersCapital[req.body.level] == req.body.answer||answersCapitalThe[req.body.level] == req.body.answer||answersthe[req.body.level] == req.body.answer) {
        let timestamp = Date.now();
        const user = await User.findOneAndUpdate(
          { _id: req.body.id },
          { $set: { "levelYN.6":true } }
        );
        const newlevel = await gameProgress.findOneAndUpdate(
          { $and: [{ userId: req.body.id }, { level: req.body.level }] },
          {
            end_time: new Date(timestamp),
            submissions: level1.submissions + 1,
          },
          { new: true }
        );
        var data = {
          accuracy: Math.round(100 / newlevel.submissions),
          time: await timeDifference(newlevel.end_time, newlevel.start_time),
          message: "success",
        };
        res.send(data);
      } 
      else 
      {
        if (req.body.answer == '') {
          var data = {
            message: "empty",
            startTime: level1.start_time,
          };
          res.send(data);
        } else {
          const newlevel = await gameProgress.findOneAndUpdate(
            { $and: [{ userId: req.body.id }, { level: req.body.level }] },
            {
              submissions: level1.submissions + 1,
            },
            { new: true }
          );
          var data = {
            message: "wrong",
          };
          res.send(data);
        }
      }
    }
  }
};
