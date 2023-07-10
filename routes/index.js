const express=require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');
const logOutController=require('../controllers/logout_controller');
const auth = require('../middleware/auth');
const reedirect=require('../middleware/reedirect');
const user=require('../models/user');


router.get('/',homeController.home);
router.use('/register',require('./register'));
router.use('/login',require('./login'));
router.use('/verify',require('./verify'));
router.use('/forgotPassword',require('./forgotPassword'));
router.use('/changePassword',require('./changePassword'));
router.use('/passwordChanged',require('./changePassword'));
router.use('/level1',require('./level1'));
router.use('/level2',require('./level2'));
router.use('/level3',require('./level3'));
router.use('/level4',require('./level4'));
router.use('/level5',require('./level5'));
router.use('/level6',require('./level6'));
router.use('/level7',require('./level7'));
router.use('/emailCheck',require('./emailCheck'));
router.use('/admin',require('./admin'));
router.use('/leaderboard',require('./leaderboard'));
router.get('/logout',auth,logOutController.logout);  
module.exports=router;