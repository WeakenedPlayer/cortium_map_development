/**
 * Cortium model events
 */

'use strict';

import {EventEmitter} from 'events';
var Cortium = require('../../sqldb').Cortium;
var CortiumEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CortiumEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cortium.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CortiumEvents.emit(event + ':' + doc._id, doc);
    CortiumEvents.emit(event, doc);
    done(null);
  }
}

export default CortiumEvents;
