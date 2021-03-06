'use strict';

var express = require('express');
var controller = require('./question.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/admin', auth.hasRole('admin'), controller.indexAdmin);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'),controller.create);
router.post('/answer/:id', controller.checkAnswer);
router.put('/:id', auth.hasRole('admin'),controller.upsert);
router.patch('/:id', auth.hasRole('admin'),controller.patch);
router.delete('/:id',auth.hasRole('admin') , controller.destroy);

module.exports = router;
