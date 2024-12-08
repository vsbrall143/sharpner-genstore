const path = require('path');

const express = require('express');

const adminController = require('../controllers/user');

const router = express.Router();

const User=require('../models/User')



router.post('/user/add-user',adminController.postUser)

router.get('/user/get-users' , adminController.getUsers)
  
router.put('/user/buy_1/:prodId/:amount', adminController.reduce_quantity);
router.put('/user/buy_2/:prodId/:amount', adminController.reduce_quantity);
router.put('/user/buy_3/:prodId/:amount', adminController.reduce_quantity);
module.exports = router;
