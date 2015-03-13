var React = require('react'),
    Router = require('react-router');

//components
var AppSwitcher = require('./components/AppSwitcher');

//router requirements
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <AppSwitcher/>
        <div className="container-fluid">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = App;
