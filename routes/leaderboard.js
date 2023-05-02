const express=require('express');
const router = express.Router();
const leaderboardController=require('../controllers/leaderboard_controller');
router.get('/:level',leaderboardController.leaderboardDetails);
module.exports=router;