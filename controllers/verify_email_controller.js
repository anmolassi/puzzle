const user=require('../models/user');
const gameProgress=require('../models/gameProgress')
const verifyMail=require('../models/user_verification');
const mongoose=require('mongoose');

module.exports.verifyUser = async function (req, res) {
  console.log(req.params['code']);
  console.log(req.params['id']);
  let verifyCode=req.params['code'];
  let verifyId=req.params['id'];
  var id = new mongoose.Types.ObjectId(verifyId);
  const details= await verifyMail.findOne({_id:id})
    if(details!=null&&details.accessToken===verifyCode){
      let arr = new Array(8).fill(false)
      const userr=await user.findOneAndUpdate({_id:details.userId},{verified:true,levelYN:arr});
      console.log(userr);
      const token = await userr.generateAuthToken();
      console.log(token);
      res.cookie("jwt", `${token}`, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      await verifyMail.deleteOne({_id:id});
      await gameProgress.create({
        userId:userr._id,
        submissions:0,
        level:1,
        // start_time: Date. now() ,
      })
      res.redirect('/');
    }else{
      res.redirect('/');
    }
};