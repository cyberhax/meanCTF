'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/ctf-dev'
  },

  // Seed database on startup
  seedDB: false

};
