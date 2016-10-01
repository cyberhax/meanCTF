/**
 * Misc model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _misc = require('./misc.model');

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MiscEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MiscEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _misc2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    MiscEvents.emit(event + ':' + doc._id, doc);
    MiscEvents.emit(event, doc);
  };
}

exports.default = MiscEvents;
//# sourceMappingURL=misc.events.js.map
