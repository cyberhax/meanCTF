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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;
exports.checkAnswer = checkAnswer;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _question = require('./question.model');

var _question2 = _interopRequireDefault(_question);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Questions
function index(req, res) {
  return _question2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Question from the DB
function show(req, res) {
  return _question2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Question in the DB
function create(req, res) {
  return _question2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Question in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _question2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Question in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _question2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Question from the DB
function destroy(req, res) {
  return _question2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function checkAnswer(req, res) {

  return _question2.default.findById(req.params.id).exec().then(function (question) {
    // console.log('checkAnswer',question);
    if (question.answer == req.body.answer) {
      // console.log('user>.>:',req.body);
      _user2.default.findById(req.body.user._id).exec().then(function (user1) {

        // console.log(!(user1.question.indexOf(question._id)>-1));
        // console.log('user1.ques',user1.question,' question._id',question._id);
        if (!(user1.question.indexOf(question._id) > -1)) {

          user1.point += question.point;
          user1.question.push(req.params.id);
          return user1.save().then(function () {
            res.status(204).end();
          });
        }
      });
    } else {
      res.status(444).end();
    }
  })
  //.then(checkAnswer(res))
  .catch(handleError(res));
}
//# sourceMappingURL=question.controller.js.map
