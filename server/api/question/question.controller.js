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

          // console.log(!(user1.question.indexOf(question._id)>-1));
          // console.log('user1.ques',user1.question,' question._id',question._id);
          if(!(user1.question.indexOf(question._id)>-1)){

          user1.point += question.point;
          user1.question.push(req.params.id);
          return user1.save()
          .then(() => {
            res.status(204).end();
          })
        }
      });
      }
    })
    //.then(checkAnswer(res))
    .catch(handleError(res));
}
