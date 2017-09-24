var express = require('express');
var router = express.Router();

var carController = require('../controllers/carController');
var apiController = require('../controllers/apiController');

// WEB
router.route('/cars')
  .get(carController.getAll)
  .post(carController.createCarEntry)

router.route('/cars/new')
  .get(carController.newCar)

router.route('/cars/:id/edit')
  .get(carController.editCar)

router.route('/cars/:id')
  .get(carController.getCar)
  .put(carController.updateCar)
  .delete(carController.removeCar)

// API
router.route('/api/cars')
  .get(apiController.getAll)
  .post(apiController.createCarEntry)

router.route('/api/cars/:id/edit')
  .put(apiController.updateCar)

router.route('/api/cars/:id')
  .get(apiController.getCar)
  .delete(apiController.removeCar)

module.exports = router;
