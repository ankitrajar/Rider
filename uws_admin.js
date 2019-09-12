const log_startup = require('debug')('LOG::INIT');
const log_info = require('debug')('LOG::INFO');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = express.Router();

const { serviceName, validate } = require('./model/service');

const mongo_ip = "localhost";
log_startup(`Mongo Server Addr : ${mongo_ip}`);

async function createService(service_name) {
    const new_service = require("./routes/" + service_name);

    log_info(`Service Name : ${service_name}`);
    await app.use("/" + service_name, new_service);

}

async function connectToDB(service_name) {
    const new_service_db = service_name + "-DB";
    log_info(`Mongo Server dB : ${new_service_db}`);
    await mongoose.connect("mongodb://" + mongo_ip + "/" + new_service_db,
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(() => log_startup('Connection to MongoDb Successfull!'))
        .catch(err => log_startup('Connection failed! Error: ', err));
}

router.post('/createService', async (req, res) => {
    //Create Method
    await createService(req.query.service_name);
    await connectToDB(req.query.service_name);
    res.send('New Service Created');
});

router.get('/', (req, res) => {
    //Read Method
    res.send('ADMIN PAGE');
});

router.get('/getService', (req, res) => {
    //Read Method
    res.send('SERVICE PAGE');
});

router.put('/', (req, res) => {
    //Update Method
});

router.delete('/deleteService', (req, res) => {
    res.send('Service Deleted');
});

module.exports = router;