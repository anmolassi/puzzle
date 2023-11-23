const express=require('express');
const router = express.Router();
const registerController=require('../controllers/register_controller');
router.get('/',registerController.registerForm);
router.post('/',registerController.register);
module.exports=router;