var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var AppSwitcher = React.createClass({
  render: function() {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
          <div>
              <AppSwitcherDropDown currentApp="Distributed Sending" />
          </div>
      </div>
    </nav>
    );
  }
});


var AppSwitcherDropDown = React.createClass({
    render: function() {
        return(
            <div className="btn-group">
              <a className="dropdown-toggle" data-toggle="dropdown" >{this.props.currentApp}</a>
              <ul className="dropdown-menu" role="menu">
                <li><Link to="distributed-sending">Distributed Sending</Link></li>
                <li><Link to="client-management">Manage Clients</Link></li>
                <li><Link to="fa-administration">FA Administration</Link></li>
              </ul>
            </div>
        );
    }
});

module.exports = AppSwitcher;
