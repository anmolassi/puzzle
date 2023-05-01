const express=require('express');
const router = express.Router();
const forgotPassword=require('../controllers/forgotPassword_controller');
router.get('/:email',forgotPassword.generateForgotMail);
router.get('/',function(req,res){
    res.send('aagya')
})
module.exports=router;