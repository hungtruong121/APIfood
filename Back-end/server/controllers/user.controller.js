const User = require('../models/user.model');
const Store = require('../models/store.model');
const bcrypt = require('bcryptjs');
import { JWTHelper } from '../helpers';

export default class UserController {
    login = async (req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            if (email === undefined) {
                return res.json({
                    success: false,
                    error: "email is required filed"
                })
            }
            if (password === undefined) {
                return res.json({
                    success: false,
                    error: "password is required filed"
                })
            }
            const user = await User.findOne({
                email: email
            });
            if (!user) {
                console.log("user not found");
                return res.json({
                    success: false,
                    error: "Email is wrong"
                })
            }
            const userOfStore = user._id;
            const store = await Store.findOne({
                belongToUser: userOfStore
            });
            console.log(store);
            const isValidPassword = await bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.json({
                    success: false,
                    error: "Password is wrong"
                })
            }
            // Gen token
            const token = await JWTHelper.sign({
                id: user._id,
                username: user.username
            });

            console.log(token);
            let storeId
            if (store) {
                storeId = store._id;
            } else {
                storeId = false;
            }
            return res.json({
                success: true,
                data:
                {
                    token: token,
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    myStore: storeId
                }
            });

        } catch (e) {
            console.log(e);
            return res.json({
                success: false,
                error: e.message
            })
        }
    };
    createNewUser = async (req, res, next) => {
        try {
            const newUser = {
                'email': req.body.email,
                'password': req.body.password,
                'username': req.body.username,
                'role': req.body.role,
            };
            if (await User.findOne({ email: newUser.email })) {
                console.log('Email is already taken!');
                return res.json({
                    success: false,
                    data: 'Email "' + newUser.email + '" is already taken'
                });
            }
            newUser.password = bcrypt.hashSync(newUser.password, 10);
            await User.create(newUser, function (err, data) {
                if (err) {
                    console.log('ERROR:', err);
                }
                console.log('Created success!', data);
                return res.status(200).json({
                    success: true,
                    data: newUser
                });
            });

        } catch (e) {
            console.log(e);
            return res.json({
                success: false,
                error: e.message
            })
        }
    };
    getUserById = async (req, res, next) => {
        try {
            const user = req.params.id;
            await User.findById(user, function (err, data) {
                if (err) {
                    console.log('ERROR:', err);
                }
                return res.status(200).json({
                    success: true,
                    data: data
                });
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };
    getAllUser = async (req, res, next) => {
        try {
            await User.find({}, function (err, data) {
                if (err) {
                    console.log('ERROR:', err);
                }
                return res.status(200).json({
                    success: true,
                    data: data
                });
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };
    deleteUser = async (req, res, next) => {
        try {
            const user = req.params.id;
            await User.deleteOne({ _id: user }, function (err) {
                if (!err) {
                    return res.status(200).json({
                        success: true,
                        data: "Delete successful!"
                    });
                }
                console.log('ERROR:', err);
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    }
    updateUser = async (req, res, next) => {
        try {
            const user = req.params.id;
            await User.findByIdAndUpdate(user, req.body, { new: true },
                (err, data) => {
                    if (!err) {
                        return res.status(200).json({
                            success: true,
                            data: data
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        data: err.message
                    });
                });

        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

};