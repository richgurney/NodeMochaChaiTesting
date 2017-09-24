var Cars = require('../models/cars');

//Show all the cars on the index page
function getAll(req, res) {
  debugger;
  Cars.find(function(error, cars){
    if(error) console.log(error)
    res.render('index', {cars: cars});
  })
}

// Render the new form when you go to ./cars/new
function newCar(req, res){
  res.render('new');
}

function createCarEntry(req, res){
  console.log(req)
  var car = new Cars({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  })

  car.save(function(error){
    if(error) console.log(error)
    res.redirect('/cars/')
  });
}

function getCar(req, res){
  var id = req.params.id;
  Cars.findById(id, function(error, car){
    if(error) console.log(error)
    res.render('show', {car: car});
  })
}

function editCar(req, res){
  var id = req.params.id;
  Cars.findById(id, function(error, car){
    if(error) console.log(error)
    res.render('edit', {car: car})
  })
}

function updateCar(req, res){
  var id = req.params.id;
  Cars.findById(id, function(error, car){
    if(error) console.log(error)
    if(car){
      car.name = req.body.name;
      car.description = req.body.description;
      car.image = req.body.image;
    }
    car.save(function(error){
      if(error) console.log(error)
      res.redirect('/cars/' + id)
    });
  });
}

function removeCar(req, res){
  var id = req.params.id;
  Cars.remove({_id: id}, function(error){
    if(error) console.log(error)
    res.redirect('/cars')
  })
}
module.exports = {
  getAll: getAll,
  newCar: newCar,
  createCarEntry: createCarEntry,
  getCar: getCar,
  updateCar: updateCar,
  editCar: editCar,
  removeCar:removeCar
}
