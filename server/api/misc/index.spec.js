'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var miscCtrlStub = {
  index: 'miscCtrl.index',
  show: 'miscCtrl.show',
  create: 'miscCtrl.create',
  upsert: 'miscCtrl.upsert',
  patch: 'miscCtrl.patch',
  destroy: 'miscCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var miscIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './misc.controller': miscCtrlStub
});

describe('Misc API Router:', function() {
  it('should return an express router instance', function() {
    expect(miscIndex).to.equal(routerStub);
  });

  describe('GET /api/miscs', function() {
    it('should route to misc.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'miscCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/miscs/:id', function() {
    it('should route to misc.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'miscCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/miscs', function() {
    it('should route to misc.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'miscCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/miscs/:id', function() {
    it('should route to misc.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'miscCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/miscs/:id', function() {
    it('should route to misc.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'miscCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/miscs/:id', function() {
    it('should route to misc.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'miscCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
