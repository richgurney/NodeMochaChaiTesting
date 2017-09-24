var Cars = require('../models/cars');

//Send JSON for all the cars in DB
function getAll(req, res) {
  Cars.find(function(error, cars){
    if(error) console.log(error)
    res.json({cars: cars});
  })
}

// Create an entry in the DB
function createCarEntry(req, res){
  var car = new Cars({
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  })

  car.save(function(error){
    if(error) console.log(error)
    res.json(car)
  });
}

// Return JSON for one car in DB
function getCar(req, res){
  var id = req.params.id;

  Cars.findById(id, function(error, car){
    if(error) console.log(error)
    res.json(car);
  })
}

// Update car in DB
function updateCar(req, res){
  var id = req.params.id;

  // Find first
  Cars.findById(id, function(error, car){
    if(error) console.log(error)

    if(car){
      car.name = req.body.name;
      car.description = req.body.description;
      car.image = req.body.image;
    }

    car.save(function(error){
      if(error) console.log(error)
      res.json(car)
    });
  });
}

// Remove the car from the DB
function removeCar(req, res){
  var id = req.params.id;

  Cars.remove({_id: id}, function(error){
    if(error) console.log(error)
    res.json("Car deleted")
  })
}

module.exports = {
  getAll: getAll,
  createCarEntry: createCarEntry,
  getCar: getCar,
  updateCar: updateCar,
  removeCar:removeCar
}
