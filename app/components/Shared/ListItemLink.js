"use strict";

var React = require("react");
var Router = require('react-router');
var classSet = require("react/lib/cx");
var assign = require("react/lib/Object.assign");
var Navigation = Router.Navigation;

var State = Router.State;
// var PropTypes = Router.PropTypes;
var Route = Router.Route;

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <ListItemLink> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <ListItemLink to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <ListItemLink to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */
var ListItemLink = React.createClass({

  displayName: "ListItemLink",

  mixins: [Navigation, State],

  getDefaultProps: function getDefaultProps() {
    return {
      activeClassName: "active"
    };
  },

  handleClick: function handleClick(event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick) clickResult = this.props.onClick(event);

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

    event.preventDefault();

    if (allowTransition) this.transitionTo(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "href" attribute to use on the DOM element.
   */
  getHref: function getHref() {
    return this.makeHref(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "class" attribute to use on the DOM element, which contains
   * the value of the activeClassName property when this <Link> is active.
   */
  getClassName: function getClassName() {
    var classNames = {};

    if (this.props.className) classNames[this.props.className] = true;

    if (this.getActiveState()) classNames[this.props.activeClassName] = true;

    return classSet(classNames);
  },

  getActiveState: function getActiveState() {
    return this.isActive(this.props.to, this.props.params, this.props.query);
  },

  render: function render() {
    var props = assign({}, this.props, {
      href: this.getHref(),
      onClick: this.handleClick
    });

    if (props.activeStyle && this.getActiveState()) props.style = props.activeStyle;

    return React.DOM.li({className: this.getClassName(), role: "presentation"},React.DOM.a(props, this.props.children));
  }

});

module.exports = ListItemLink;