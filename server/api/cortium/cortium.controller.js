/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cortiums              ->  index
 * POST    /api/cortiums              ->  create
 * GET     /api/cortiums/:id          ->  show
 * PUT     /api/cortiums/:id          ->  update
 * DELETE  /api/cortiums/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Cortium} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
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

// Gets a list of Cortiums
export function index(req, res) {
	var continent = req.query.continent;
	if( continent !== undefined ){
		return Cortium.findAll({
			where: {
				continent: parseInt( continent ),
			}
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
	} else {
		return Cortium.findAll()
		.then(respondWithResult(res))
		.catch(handleError(res));
	}
}

// Gets a single Cortium from the DB
export function show(req, res) {
  return Cortium.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cortium in the DB
export function create(req, res) {
	  console.log(req.body);
  return Cortium.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Cortium in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Cortium.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cortium from the DB
export function destroy(req, res) {
  return Cortium.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
