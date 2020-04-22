module.exports = (app) => {
  const nutritionController = require('../controllers/nutrition.controller');
  app
    .route('/products')
    .get(nutritionController.findAll)
    .post(nutritionController.create);

  app
    .route('/products/:nutritionId/comment')
    .post(nutritionController.addComment);
  app
    .route('/products/:nutritionId')
    .get(nutritionController.findOne)
    .put(nutritionController.update)
    .delete(nutritionController.delete);
}