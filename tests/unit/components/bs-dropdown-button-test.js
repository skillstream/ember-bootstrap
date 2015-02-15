import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-dropdown-button', 'BsDropdownButtonComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('dropdown button has correct default markup', function() {
    equal(this.$().prop('tagName'), 'BUTTON', 'dropdown button is a button');
    equal(this.$().hasClass('dropdown-toggle'), true, 'has dropdown-toggle class');
    equal(this.$().attr('data-toggle'), 'dropdown', 'has data-toggle=dropdown attribute');
    equal(this.$().attr('role'), 'button', 'has role=button');
});

test('clicking dropdown button sends toggleDropdown action', function() {
    var actionHandler = Ember.Controller.extend({
            actions: {
                toggleDropdown: function() {
                    ok(true, 'toggleDropdown action has been called');
                }
            }
        }).create(),
        component = this.subject({
            targetObject: actionHandler
        });
    expect(1);
    this.$().click();
});