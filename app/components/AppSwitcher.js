var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var menu =  [
    {"name" : "Distributed Sending", "link" : "distributed-sending", "icon" : "email", "current":true},
    {"name" : "Manage Clients", "link" : "client-management", "icon" : "groups"},
    {"name" : "FA Administration", "link" : "fa-administration", "icon" : "contact"},
  ];



var AppSwitcher = React.createClass({
  render: function() {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
          <div>
              <AppSwitcherDropDown data={menu} />
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
              <a className="dropdown-toggle" data-toggle="dropdown" >
                <span className="s1icon s1icon-lg s1icon-s-email"></span>&nbsp;{this.props.currentApp}
              </a>
              <ul className="dropdown-menu" role="menu">
              {this.props.data.map(function(navItem, i){
                var classes="s1icon s1icon-lg s1icon-s-" + navItem.icon;
                return(<li key={i}><Link to={navItem.link}><span className={classes}></span>&nbsp;{navItem.name}</Link></li>)
              })}

              </ul>
            </div>
        );
    }
});


// <li><Link to="distributed-sending"><span className="s1icon s1icon-lg s1icon-s-email"></span>&nbsp;Distributed Sending</Link></li>
// <li><Link to="client-management"><span className="s1icon s1icon-lg s1icon-s-groups"></span>&nbsp;Manage Clients</Link></li>
// <li><Link to="fa-administration"><span className="s1icon s1icon-lg s1icon-s-contact"></span>&nbsp;FA Administration</Link></li>

module.exports = AppSwitcher;
