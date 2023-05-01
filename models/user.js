//building schema
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  levelYN:[
    {
        type: Boolean,
    }
  ],
  level1:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level2:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level3:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level4:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level5:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level6:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
  level7:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameProgress",
  },
});

userSchema.methods.generateAuthToken = async function () {
    // const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); //const anmol
    const token = jwt.sign({ _id: this._id }, "secretkey_likhdo_koi_v"); //const anmol
    this.tokens = this.tokens.concat({ token: token }); //token:anmol
    await this.save();
    return token;
};
// userSchema.pre("findOneAndUpdate", async function (next) {
//   console.log("chleyaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//   const docToUpdate = await this.model.findOne(this.getQuery());

//   docToUpdate.botconfiguration.forEach((item, i) => {
//     docToUpdate.configuration[i].password = bcrypt.hash(this.password, 10);
//   });
//   await docToUpdate.save();
//   next();
// });
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
