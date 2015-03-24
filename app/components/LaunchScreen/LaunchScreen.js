var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var LaunchScreen = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Launch Screen</h2>
				<div className="col-md-6 col-md-offset-3 launcher">
					<Link to="dashboard" className="s1icon s1icon-xxl s1icon-s-dashboard"></Link>
					<Link to="create-email" className="s1icon s1icon-xxl s1icon-s-email"></Link>
					<Link to="client-management" className="s1icon s1icon-xxl s1icon-s-groups"></Link>
					<Link to="content-admin" className="s1icon s1icon-xxl s1icon-s-drafts"></Link>
					<Link to="fa-administration" className="s1icon s1icon-xxl s1icon-s-contact"></Link>
				</div>
      </div>
    );
  }

});

module.exports = LaunchScreen;
