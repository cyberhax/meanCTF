'use strict';

describe('Component: MiscComponent', function() {
  // load the controller's module
  beforeEach(module('ctfApp.misc'));

  var MiscComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MiscComponent = $componentController('misc', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
