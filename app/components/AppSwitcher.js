var React = require('react');
var Router = require('react-router');

var FA = require('../data/fa-info');
//var auth = require("./Authentication/Authentication");
var Link = Router.Link;

var menu =  {"items":[
  {"id": "launcher", "name" : "Home", "link":"launch-screen", "icon" : "portal"},
  {"id": "distributed", "name" : "Dashboard", "link":"dashboard", "icon" : "dashboard"},
  {"id": "email", "name" : "Send Email", "link":"create-email", "icon" : "email"},
  {"id": "manage", "name" : "Manage Clients", "link":"client-management", "icon" : "groups"},
  {"id": "content", "name" : "Content Admin", "link":"content-admin", "icon" : "file"},
  {"id": "faAdmin", "name" : "FA Administration",  "link":"fa-administration", "icon" : "avatar"}
]};



// var AppSwitcher = React.createClass({
//
//   render: function() {
//
//   	var logOut = auth.loggedIn()? (<div className="navbar-header pull-right">
//   			<ul className="nav navbar-nav">
//   				<li><Link to="log-out">Log Out</Link></li>
//   			</ul>
// 	    </div>): "";
//
//     return (
//     <nav className="navbar navbar-default">
//       <div className="container-fluid">
// 	    {logOut}
//         <div className="navbar-header pull-right">
//           <a className="navbar-brand" href="#">
//             <img src="./images/ms-logo.png" />
//           </a>
//         </div>
//         <div className="pull-right">
//           <BUDropDown data={menu} />
//         </div>
//           <AppSwitcherDropDown data={menu} />
//       </div>
//     </nav>
//     );
//   }
// });

var AppSwitcher = React.createClass({

  render: function() {

    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header pull-right">
          <a className="navbar-brand" href="#">
            <img src="./images/ms-logo.png" />
          </a>
        </div>
        <div className="pull-right">
          <BUDropDown data={menu} />
        </div>
          <AppSwitcherDropDown data={menu} />
      </div>
    </nav>
    );
  }
});

var BUDropDown = React.createClass({
    render: function() {
        var self = this;
        return(
            <div className="btn-group bu">
              <a className="bu-toggle" data-toggle="dropdown" >
                Tom Niehaus
                <img className="img-circle" src="./images/FA-tniehaus110.png" />
              </a>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a>
                    Kelly Andrews
                    <img className="img-circle" src="./images/kja-thumb.png" />
                  </a>
                </li>
                <li>
                  <a>
                    Falk Gottlob
                    <img className="img-circle" src="./images/falk-thumb.jpg" />
                  </a>
                </li>
              </ul>
            </div>
        );
    }
});




var AppSwitcherDropDown = React.createClass({
    mixins: [Router.State],
    shouldComponentUpdate: function() {
      var current = this.getPath();
      current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
      var links = this.state;
      links.current = current === "" ? "launch-screen" : current;
      return links;
    },
    getInitialState: function(){
        var current = this.getPath();
        current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
        var links = {};
        links.navItems = this.props.data;
        links.current = current === "" ? "launch-screen" : current;
        return links;
    },
    render: function() {
        var self = this;
        return(
            <div className="btn-group">
            {
              this.state.navItems.items.filter(function(e) {
                return e.link === self.state.current;
              })
              .map(function(navItem){
              var classes="s1icon s1icon-lg s1icon-s-" + navItem.icon;
              return(
                <a key={navItem.id} className="dropdown-toggle" data-toggle="dropdown" >
                  <span className={classes}></span>&nbsp;{navItem.name}
                </a>
              )
            })
            }

              <ul className="dropdown-menu" role="menu">
              {
                this.state.navItems.items.filter(function(e) {
                  return e.link !== self.state.current;
                })
                .map(function(navItem){
                var classes="s1icon s1icon-lg s1icon-s-" + navItem.icon;
                return(<li key={navItem.id}><Link to={navItem.link} onClick={self.clickHandler}><span className={classes}></span>&nbsp;{navItem.name}</Link></li>)
              })
              }
              </ul>
            </div>
        );
    }
});

module.exports = AppSwitcher;
