module.exports = (app) => {
  const storeController = require('../controllers/store.controller.js');
  app
    .route('/stores')
    .get(storeController.findAll)
    .post(storeController.create);

  app
    .route('/stores/:typeOfStore')
    .get(storeController.findAllStoreByType);

  app
    .route('/stores/:storeId/comment')
    .get(storeController.getAllComment)
    .post(storeController.addComment);

  app
    .route('/stores/detail/:storeId')
    .get(storeController.findOne)
    .put(storeController.update)
    .delete(storeController.delete);
  app
    .route('/stores/detail/:storeId/products')
    .post(storeController.addProduct);

}