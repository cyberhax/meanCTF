/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  upsert
 * PATCH   /api/questions/:id          ->  patch
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Question from './question.model';
import User from '../user/user.model';

var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic ZWNiMjQ4MGYtNzUyZi00ODMzLTlmZTEtNTkxYzQ4MmJjYzY5"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};



function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Questions
export function index(req, res) {
  return Question.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Upserts the given Question in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Question.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function checkAnswer(req, res) {

  return Question.findById(req.params.id).exec()
    .then((question)=>{
      // console.log('checkAnswer',question);
      if(question.answer==req.body.answer){
        // console.log('user>.>:',req.body);
        User.findById(req.body.user._id).exec()
        .then(user1=>{

          if(!(user1.question.includes(question._id))){
          let message = {
              app_id: "096f58c1-3373-464e-b782-724d935fc12b",
              contents: { "en": `${user1.name} answered question\r\n\r\n${question.info}` },
              included_segments: ["All"]
            };
          sendNotification(message);
          
          user1.point += question.point;
          user1.question.push(req.params.id);
          return user1.save()
          .then(() => {
            res.status(204).end();
          })
        }
      });
      }
      else{
        res.status(444).end();
      }
    })
    //.then(checkAnswer(res))
    .catch(handleError(res));
}
