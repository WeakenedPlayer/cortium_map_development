'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cortiumCtrlStub = {
  index: 'cortiumCtrl.index',
  show: 'cortiumCtrl.show',
  create: 'cortiumCtrl.create',
  update: 'cortiumCtrl.update',
  destroy: 'cortiumCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cortiumIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cortium.controller': cortiumCtrlStub
});

describe('Cortium API Router:', function() {

  it('should return an express router instance', function() {
    expect(cortiumIndex).to.equal(routerStub);
  });

  describe('GET /api/cortiums', function() {

    it('should route to cortium.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cortiumCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cortiums/:id', function() {

    it('should route to cortium.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cortiumCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cortiums', function() {

    it('should route to cortium.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cortiumCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cortiums/:id', function() {

    it('should route to cortium.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cortiumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cortiums/:id', function() {

    it('should route to cortium.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cortiumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cortiums/:id', function() {

    it('should route to cortium.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cortiumCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
