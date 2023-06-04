const express = require('express');
let cluster = require('cluster');
let bodyParser = require('body-parser');
const {Authorization, Redirect} = require('./authHelper');

require('dotevn').config();

let port = 4000;

process.env.NODE_NO_WARNINGS = 1;

let cCPUs = 1;

if(cluster.isMaster){
    for(let i = 0; i < cCPUs; i++){
        cluster.fork()
    }

    cluster.on('online', function (worker){
        console.log('Worker' + worker.process.pid + 'is on line.')
    });
    cluster.on('exit', function (worker, code, signal){
        console.log('Worker' + worker.process.pid + 'died.')
    });
} else {
    let app = express();

    app.use(bodyParser.urlencoded({
        extended : true
    }));

    app.use(bodyParser.json());

    app

     .listen(port);
    
    app.get('api/linkedin/authorize'), (req, res) => {
        return res.redirect(Authorization());
    }

    app.get('api/linkedin/authorize'), async(req, res) => {
        return res.json(Redirect(req.query.code));
    }

}