const express = require('express');
const postmodel = require('../models/post.model.js');
const postController = require('../controllers/post.controller.js');
const router = express.Router();

router.get('/get',postController.getAll);
router.post('/create',postController.create)
router.delete('/delete/:id',postController.delete);
router.put('/edit/:id', postController.edit);
router.get('/get-one/:id', postController.getOne);


module.exports = router;