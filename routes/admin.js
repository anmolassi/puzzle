const express=require('express');
const router = express.Router();
const adminController=require('../controllers/admin_controller');
router.get('/',adminController.homePage);
router.post('/',adminController.logIn);
router.get('/logout',adminController.logOutAdmin);
router.get('/:id',adminController.adminDetails);
module.exports=router;