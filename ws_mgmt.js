const log_startup = require('debug')('LOG::INIT');
const log_info = require('debug')('LOG::INFO');
const express = require('express');
const app = express();
const router = express.Router();

const { serviceName,validate } = require('../model/service');

const mongo_ip = config.get('monogodbip');
log_startup(`Mongo Server Addr : ${mongo_ip}`);

async function createService(service_name){
    const new_service = require('./routes/'+service_name);
    const new_service_db = service_name+'_db';
    log_info(`Mongo Server dB : ${new_service_db}`);
    app.use('/'+service_name,new_service);
    await mongoose.connect('mongodb://'+mongo_ip+new_service_db,{useNewUrlParser: true, useFindAndModify: false})
        .then(() => log_startup('Connection to MongoDb Successfull!'))
        .catch(err => log_startup('Connection failed! Error: ',err));
}

router.post('/createService', async (req,res) => {
//Create Method
await createService(req.query.service_name);
res.status(200).send('New Service Created');
});

router.get('/', (req,res) => {
    //Read Method
    res.send('ADMIN PAGE');
});

router.get('/getService', (req,res) => {
//Read Method
res.send('ADMIN PAGE');
});

router.put('/', (req,res) => {
//Update Method
});

router.delete('/', (req,res) => {
//Delete Method
});

module.exports = router;