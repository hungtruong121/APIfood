const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = mongoose.Schema({

  name: {
    type: String,
    require
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('nutrition', nutritionSchema);
