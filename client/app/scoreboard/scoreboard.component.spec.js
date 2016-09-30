'use strict';

describe('Component: ScoreboardComponent', function() {
  // load the controller's module
  beforeEach(module('ctfApp.scoreboard'));

  var ScoreboardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ScoreboardComponent = $componentController('scoreboard', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
