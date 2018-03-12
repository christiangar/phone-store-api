const express = require('express');
const router = express.Router();
const passportConfig = require('../configs/passport.config');
const sessionController = require('../controllers/session.controller');

router.get('/show', passportConfig.isAuthenticated, sessionController.show);
router.post('/destroy', passportConfig.isAuthenticated, sessionController.destroy);
router.post('/', sessionController.create);

module.exports = router;
