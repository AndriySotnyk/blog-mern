const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');

const router = require(`./routes/${config.api_version}`);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes

app.use(`/api/${config.api_version}`, router);

//Not Found middleware
app.use(function(req, res, next) {
    res.status(404).json({error:"Not Found"});
});

//Error middleware
app.use(function(error, req, res, next) {
    console.error(error?.message || error);
    res.status(error?.status || 500).json({error:error?.message || error});
});

//Bootstrap method
async function bootstrap(){
    await mongoose.connect(config.mongoURI);
    return app;
}


module.exports = bootstrap;
