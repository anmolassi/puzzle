const express=require('express');
const router = express.Router();
const verifyController=require('../controllers/verify_email_controller');
router.get('/:code/:id',verifyController.verifyUser);
module.exports=router;