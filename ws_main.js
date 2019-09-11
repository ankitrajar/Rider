const log_startup = require('debug')('LOG::INIT');
const log_debug = require('debug')('LOG::DEBUG');
const log_http = require('morgan');
const config = require('config');
const home = require('./routes/home');
const mgmt = require('./ws_mgmt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

global.app = express();

app.use(bodyParser.json());
app.use(function(error,req,res,next){
    if(error instanceof SyntaxError){
        return res.status(400).send('ERROR 400: Bad Request!!!');
    }
    next();
});

app.use(express.urlencoded({extended: true}));
app.use('/',home);
app.use('/mgmt',mgmt);

if(app.get('env') === 'development'){
    app.use(log_http('combined'));
    
}
else if(app.get('env') === 'production'){
    app.use(log_http('tiny'));
}
log_startup(`Starting Application : ${config.get('name')}`);

const port = config.get('server_port') || 3000;
app.listen(port,()=>log_startup(`Listening over port ${port} ...`));