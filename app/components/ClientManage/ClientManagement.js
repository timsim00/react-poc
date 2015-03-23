var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var ListItemLink = require("../Shared/ListItemLink");

var ClientManagement = React.createClass({
  render: function() {
    return (
	<div>
    <h2>Client Management</h2>
    <div className="col-md-2">
      <ul className="nav nav-pills nav-stacked">
        <ListItemLink to="lookup">Client Lookup</ListItemLink>
        <ListItemLink to="manage">Manage Clients</ListItemLink>
        <ListItemLink to="lists">List Management</ListItemLink>
        <ListItemLink to="subscriptions">Subscription Management</ListItemLink>
      </ul>
    </div>
    <div className="col-md-10">
      <RouteHandler/>
    </div>
	</div>
    );
  }

});

module.exports = ClientManagement;
