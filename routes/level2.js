const express=require('express');
const router = express.Router();
const levelController=require('../controllers/level2_controller');
router.get('/:id',levelController.getPuzzle);
router.post('/',levelController.checkAndSubmit);
module.exports=router;