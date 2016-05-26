'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sundererCtrlStub = {
  index: 'sundererCtrl.index',
  show: 'sundererCtrl.show',
  create: 'sundererCtrl.create',
  update: 'sundererCtrl.update',
  destroy: 'sundererCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sundererIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sunderer.controller': sundererCtrlStub
});

describe('Sunderer API Router:', function() {

  it('should return an express router instance', function() {
    expect(sundererIndex).to.equal(routerStub);
  });

  describe('GET /api/sunderers', function() {

    it('should route to sunderer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sundererCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sunderers/:id', function() {

    it('should route to sunderer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sundererCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sunderers', function() {

    it('should route to sunderer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sundererCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sunderers/:id', function() {

    it('should route to sunderer.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sundererCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sunderers/:id', function() {

    it('should route to sunderer.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sundererCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sunderers/:id', function() {

    it('should route to sunderer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sundererCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
