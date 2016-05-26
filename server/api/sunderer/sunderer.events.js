/**
 * Sunderer model events
 */

'use strict';

import {EventEmitter} from 'events';
var Sunderer = require('../../sqldb').Sunderer;
var SundererEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SundererEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sunderer.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SundererEvents.emit(event + ':' + doc._id, doc);
    SundererEvents.emit(event, doc);
    done(null);
  }
}

export default SundererEvents;
