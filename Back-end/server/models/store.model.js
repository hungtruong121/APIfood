const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StoreSchema = Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  nutrition: {
    type: String,
    require: true,
  },
  typeOffood: [{
    type: String,
    enum: ['training', 'vet', 'care', 'beauty', 'normal'],
    require: true
  }],
  linkFB: String,
  image: String,
  belongToUser: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Production' }],
}, {
    timestamps: true
  });

module.exports = mongoose.model('Store', StoreSchema);