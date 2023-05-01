const gameProgress = require("../models/gameProgress");
const User = require("../models/user");
let answers = ["0", "255", "255", "255","255","255","255","255"];
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
    const userr = await User.findOne({
      tokens: { $elemMatch: { token: token } },
    });
    if (userr._id == req.params.id) {
      const level1 = await gameProgress.findOne({
        userId: userr._id,
        level: 2,
      });
      if (level1.start_time == undefined || level1.start_time == null) {
        const level = await gameProgress.findOneAndUpdate(
          { $and: [{ userId: userr.id }, { level: 2 }] },
          { start_time: Date.now() },
          { new: true }
        );
        console.log(level);
      }
      res.locals.start_time = level1.start_time;
      res.locals.user = userr;
      res.locals.userId = req.params.id;
      res.render("level2");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};
module.exports.checkAndSubmit = async function (req, res) {
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
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
      if (answers[req.body.level] == req.body.answer) {
        let timestamp = Date.now();
        const user = await User.findOneAndUpdate(
          { _id: req.body.id },
          { $set: { "levelYN.2":true } }
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
        const newGameProgress=await gameProgress.create({
          userId:req.body.id,
          submissions:0,
          level:newlevel.level+2,
        })
        const newGameProgress2=await gameProgress.create({
          userId:req.body.id,
          submissions:0,
          level:newlevel.level+3,
        })
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
