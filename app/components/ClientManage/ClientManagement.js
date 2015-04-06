var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var ListItemLink = require("../Shared/ListItemLink");


//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");

// var ClientManagement = AuthenticationRequired.requireAuth(React.createClass({
//   render: function() {
//     return (
// 	<div>
//     <div className="row pageTitle">
//       <div className="col-md-12"><h2>Client Management</h2></div>
//     </div>
//     <div className="row">
//       <div className="col-md-2">
//         <ul className="nav nav-pills nav-stacked">
//           <ListItemLink to="manage">Manage Clients</ListItemLink>
//           <ListItemLink to="lists">Manage Lists</ListItemLink>
//           <ListItemLink to="subscriptions">Manage Email Subscriptions</ListItemLink>
//         </ul>
//       </div>
//       <div className="col-md-10">
//         <RouteHandler/>
//       </div>
//     </div>
// 	</div>
//     );
//   }
//
// }));

var ClientManagement = React.createClass({
  render: function() {
    return (
	<div>
    <div className="row pageTitle">
      <div className="col-md-12"><h2>Client Management</h2></div>
    </div>
    <div className="row">
      <div className="col-md-2">
        <ul className="nav nav-pills nav-stacked">
          <ListItemLink to="manage">Manage Clients</ListItemLink>
          <ListItemLink to="lists">Manage Lists</ListItemLink>
          <ListItemLink to="subscriptions">Manage Email Subscriptions</ListItemLink>
        </ul>
      </div>
      <div className="col-md-10">
        <RouteHandler/>
      </div>
    </div>
	</div>
    );
  }

});

module.exports = ClientManagement;
