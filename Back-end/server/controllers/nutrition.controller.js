const mongoose = require('mongoose');
const nutrition = mongoose.model('Nutrition');


exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(404).send({
        message: "Nutrition content can not be empty"
      });
    }
    const nutrition = await new nutrition(req.body);
    await nutrition.save();
    return res.status(200).json({
      success: true,
      data: nutrition
    });
  } catch (err) {
    return res.status(500).send({
      message:
        err.message || "Some error occurred while creating the nutrition."
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const nutritions = await nutrition.find().populate('category','name');
    return res.status(200).json({
      success: true,
      data: nutritions
    });
  } catch (err) {
    return res.status(500).send({
      message:
        err.message || "Some error occurred while creating the nutrition."
    });
  };
};


exports.findOne = async (req, res) => {
  try {
    const nutrition = await nutrition.findById(req.params.nutritionId).populate({ path: 'comments', populate: { path: 'userId' } });
    const store = await Store.findOne({ products: req.params.nutritionId })
    if (!nutrition) {
      return res.status(400).json({
        success: false,
        error: 'nutrition is not found'
      });
    }
    return res.status(200).json({
      success: true,
      data: nutrition,
      store: store
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "nutrition not found with id " + req.params.nutritionId
      });
    }
    return res.status(500).send({
      message: "Error retrieving Store with id " + req.params.nutritionId
    });
  }
};

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    const nutrition = req.params.nutritionId;

    await nutrition.findByIdAndUpdate(nutrition, req.body, { new: true }, (err, data) => {
      if (err) return res.status(400).json({
        success: false,
        error: err.message
      });
      return res.status(200).json({
        success: true,
        data: data
      });
    })
  } catch (err) {
    return res.status(500).send({
      message:
        err.message || "Some error occurred while updating the nutrition."
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const nutrition = await nutrition.findByIdAndRemove(req.params.nutritionId);
    return res.status(200).json({
      success: true,
      data: true
    })
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "nutrition not found with id " + req.params.nutritionId
      });
    }
    return res.status(500).send({
      message: "Could not delete nutrition with id " + req.params.nutritionId
    });
  }
};
