const express = require('express');
const router = express.Router();
const controller = require('../controllers/applianceController');

router.post('/add', controller.addAppliance);
router.get('/view', controller.viewAll);
router.get('/view/:id', controller.viewOne);
router.put('/update/:id', controller.updateAppliance);
router.delete('/delete/:id', controller.deleteAppliance);

module.exports = router;