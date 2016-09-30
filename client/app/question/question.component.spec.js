'use strict';

describe('Component: QuestionComponent', function() {
  // load the controller's module
  beforeEach(module('ctfApp.question'));

  var QuestionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionComponent = $componentController('question', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
