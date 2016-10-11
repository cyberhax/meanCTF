/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
const spdy = require('spdy')


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = spdy.createServer({
  spdy: {
    protocols: [ 'h2','spdy/3.1', 'spdy/3', 'spdy/2' ],
    plain: true,
    ssl: false,
 
    // **optional** 
    // Parse first incoming X_FORWARDED_FOR frame and put it to the 
    // headers of every request. 
    // NOTE: Use with care! This should not be used without some proxy that 
    // will *always* send X_FORWARDED_FOR 
    'x-forwarded-for': true,
 
    connection: {
      windowSize: 1024 * 1024, // Server's window size 
 
      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy 
      autoSpdy31: false
    }
  }
},app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);



// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    // console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
