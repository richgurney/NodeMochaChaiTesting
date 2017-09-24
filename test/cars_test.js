var expect = require("chai").expect;
var supertest = require("supertest");
var api = supertest("http://localhost:3333/api");
var mongoose = require('mongoose');

//Database setup and connection with DROP before tests
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cars');
var db = mongoose.connection;
db.dropDatabase();

describe("GET /cars", function(){
  before(function(done){
    api.post("/cars")
    .set("Accept", "application/json")
    .send({
      "name": "All cars",
      "description": "This is the /cars description",
      "image": "http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg"
    }).end(done)
  })

  it("should return a 200 response", function(done){
    api.get("/cars")
    .set("Accept", "application/json")
    .expect(200, done)
  })

  it("should return an array", function(done){
    api.get("/cars")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body.cars).to.be.an('array');
      done()
    })
  })

  it("should return an object that has a field called 'name' ", function(done){
    api.get("/cars")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body.cars[0]).to.have.property('name');
      done()
    })
  })

  it("should return an object that has a field called 'description' ", function(done){
    api
      .get("/cars")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.cars[0]).to.have.property('description');
        done()
    })
  })

  it("should return an object that has a field called 'image' ", function(done){
    api
      .get("/cars")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.cars[0]).to.have.property('image');
        done()
    })
  })
})

describe("POST /cars", function(){
  before(function(done){
    api.post("/cars")
    .set("Accept", "application/json")
    .send({
      "name": "New car",
      "description": "This is the POST /cars description",
      "image": "http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg"
    }).end(done)
  })

  it("should add a car to the database", function(done){
    api.get("/cars")
    .set("Accept", "application/json")
    .end(function(error, response){
      var carsArray = response.body.cars
      expect(carsArray[carsArray.length - 1].name).to.equal("New car");
      expect(carsArray[carsArray.length - 1].description).to.equal("This is the POST /cars description");
      done()
    })
  })
})

describe('GET /cars/:id', function() {
  var id = null;
  var name = null;
  var description = null;
  var image = null;

  before(function(done){
    api.post("/cars")
    .set("Accept", "application/json")
    .send({
      "name": "Get One",
      "description": "This is the GET /cars/:id description",
      "image": "http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg"
    }).end(function(err, response){
      api.get("/cars")
      .set("Accept", "application/json")
      .end(function(error, response){
        var carsArray = response.body.cars
        id = carsArray[carsArray.length - 1]._id
        name = carsArray[carsArray.length - 1].name
        description = carsArray[carsArray.length - 1].description
        done()
      })
    })
  })

  it('should have the correct properties & values on an individual car object', function(done) {
    api.get("/cars/" + id)
      .set('Accept', 'application/json')
      .end(function(err, response) {
        expect(response.body).to.have.property('_id', id);
        expect(response.body).to.have.property('name', name);
        expect(response.body).to.have.property('description', description);
        done();
      });
  });
});

describe('DELETE /cars/:id', function() {
  var id = null;
  var name = null;
  var description = null;
  var image = null;

  before(function(done) {
    api.post("/cars")
    .set("Accept", "application/json")
    .send({
      "name": "Delete One",
      "description": "This is the DELETE /cars/:id description",
      "image": "http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg"
    }).end(function(err, response){
      api.get("/cars/")
      .set("Accept", "application/json")
      .end(function(error, response){
        var cars = response.body.cars;
        id = cars[cars.length - 1]._id;
        api.delete('/cars/' + id)
        .set('Accept', 'application/json')
        .end(done);
      })
    })
  });
  it('should delete a car', function(done) {
    api.get('/cars/' + id)
    .set('Accept', 'application/json')
    .end(function(err, response) {
      expect(response.body).to.equal(null);
      done();
    });
  });
});

describe('PUT /cars/:id/edit', function() {
  // Before update: {id: 2, name: "Pez" , color: "Green"},
  var id = null;
  var updatedName = 'I have changed this name';
  var updatedDescription = 'Updated description';
  var updatedImage= "https://www.macleonard.co.uk/images/miscel_images/Richard-Gurney-leader-board.JPG"

  before(function(done) {
    api.get("/cars")
    .set("Accept", "application/json")
    .end(function(error, response){
      var carsArray = response.body.cars;
      var car = carsArray[carsArray.length - 1];
      id = car._id;
      api.put('/cars/' + id + '/edit')
      .set('Accept', 'application/json')
      .send({
        "id": id,
        "name": updatedName,
        "description": updatedDescription,
        "image": updatedImage
      }).end(done);
    })
  });

  it('should update car to new values', function(done) {
    api.get('/cars/' + id)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      expect(res.body.name).to.equal(updatedName);
      expect(res.body.description).to.equal(updatedDescription);
      expect(res.body.image).to.equal(updatedImage);
      done();
    });
  });
});
