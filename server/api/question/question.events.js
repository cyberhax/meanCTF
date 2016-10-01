/**
 * Question model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _question = require('./question.model');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
QuestionEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _question2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    QuestionEvents.emit(event + ':' + doc._id, doc);
    QuestionEvents.emit(event, doc);
  };
}

exports.default = QuestionEvents;
//# sourceMappingURL=question.events.js.map
