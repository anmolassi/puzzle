const express=require('express');
const router = express.Router();
const adminController=require('../controllers/admin_controller');
router.get('/',adminController.homePage);
router.get('/:id',adminController.adminDetails);
module.exports=router;