'use strict';

import { userController} from '../controllers';
import { Authentication, RoleManagement } from '../middlewares';

module.exports = (app) => {
    app.route('/user/getAllUsers')
        .get(userController.getAllUser);
    app.route('/user/:id')
        .get(userController.getUserById);
    app.route('/user/register')
        .post(userController.createNewUser);
    app.route('/user/login')
        .post(userController.login);
    app.route('/user/delete/:id')
        .delete(userController.deleteUser);
    app.route('/user/update/:id')
        .put(userController.updateUser);
}