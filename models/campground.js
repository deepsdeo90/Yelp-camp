var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  description: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
  
});

module.exports = mongoose.model('Campground', campgroundSchema);
