const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/oderSos', adminController.getOderSos);

router.get('/addOderSo',adminController.getAddOderSo);

router.post('/addOderSo', adminController.postAddOderSo);

router.post('/delOderSo', adminController.delOderSo)

router.post('/editOderSo', adminController.editOderSo)

router.post('/updateOderSo', adminController.updateOderSo)

router.get('/',adminController.admin);

module.exports = router;
