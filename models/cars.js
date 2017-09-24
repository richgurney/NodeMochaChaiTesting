var mongoose    = require('mongoose');
var carSchema   = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});

var Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
