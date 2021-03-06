import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('bs-collapse', 'Integration | Component | bs-collapse', {
  integration: true
});

test('collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

});

test('expanded collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse collapsed=false}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');
});

test('setting collapse to false expands this item', function(assert) {
  let showAction = this.spy();
  let shownAction = this.spy();
  this.on('show', showAction);
  this.on('shown', shownAction);

  this.set('collapsed', true);
  this.render(hbs`{{#bs-collapse collapsed=collapsed onShow=(action "show") onShown=(action "shown")}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', false);

  assert.ok(showAction.calledOnce, 'onShow action has been called');
  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(shownAction.calledOnce, 'onShown action has been called');
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');

    done();
  }, 500);
});

test('setting collapse to true collapses this item', function(assert) {
  let hideAction = this.spy();
  let hiddenAction = this.spy();
  this.on('hide', hideAction);
  this.on('hidden', hiddenAction);

  this.set('collapsed', false);
  this.render(hbs`{{#bs-collapse collapsed=collapsed onHide=(action "hide") onHidden=(action "hidden")}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', true);

  assert.ok(hideAction.calledOnce, 'onHide action has been called');
  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(hiddenAction.calledOnce, 'onHidden action has been called');
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

    done();
  }, 500);
});
