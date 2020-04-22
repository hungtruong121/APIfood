'use strict';

import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import FS from 'fs-extra';
import Http from 'http';
import Path from 'path';

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//import model
require('./models/store.model');
require('./models/user.model');;
require('./models/nutrition.model');



const app = Express();
global.__rootDir = __dirname.replace('/server', '');

app
    .use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({ extended: true }))
    .use(Express.static(Path.resolve(__dirname, '..', 'public'), { maxAge: 31557600000 }))
    .set('views', Path.join(__dirname, '..', 'public', 'views'))
    .set('view engine', 'ejs');

const routePath = `${__dirname}/routes/`;
FS.readdirSync(routePath).forEach((file) => {
    require(`${routePath}${file}`)(app);
});




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.remoteUrl2, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


Http.createServer(app).listen(4000, () => {
    console.log(`App listening on 4000!`);
});

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my API",
        nutrition: "/nutrition",
        store: "/store",
    });
});