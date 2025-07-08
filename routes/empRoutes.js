const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');

router.get('/emp', empController.getAllEmployees);
router.post('/emp', empController.createEmployee);
router.put('/emp/:id', empController.updateEmployee);
router.delete('/emp/:id', empController.deleteEmployee);

module.exports = router;
