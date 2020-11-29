const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/', mainController.allItems);
router.post('/addNewItem', mainController.addItem);
router.post('/updateItem/:id', mainController.updateItem);
router.get('/deleteItem/:id', mainController.removeItem);
router.get('/change/completed/:id', mainController.updateCompleted)
module.exports = router;