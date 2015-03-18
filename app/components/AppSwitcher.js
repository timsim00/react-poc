var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var menu =  {"items":[
  {"id": "distributed", "name" : "Distributed Sending", "link":"distributed-sending", "icon" : "email"},
  {"id": "manage", "name" : "Manage Clients", "link":"client-management", "icon" : "groups"},
  {"id": "faAdmin", "name" : "FA Administration",  "link":"fa-administration", "icon" : "contact"}
]};



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
    mixins: [Router.State],
    shouldComponentUpdate: function() {
      var current = this.getPath();
      console.log("shouldComponentUpdatePRE:" + current);
      current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
      console.log("shouldComponentUpdate:" + current);
      var links = this.state;
      links.current = current === "" ? "distributed-sending" : current;
      return links;
    },
    getInitialState: function(){
      console.log(this.props.data);

        var current = this.getPath();
        console.log("init:" + current);
        current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
        console.log("init-substring:" + current);
        var links = {};
        links.navItems = this.props.data;
        links.current = current === "" ? "distributed-sending" : current;
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

// <a className="dropdown-toggle" data-toggle="dropdown" >
//   <span className={currentClasses}></span>&nbsp;{this.state.current.name}
// </a>

// {
//   //this.state.map(function(navItem, i){
//   console.log(this.state);
//   return null;
//   //var classes="s1icon s1icon-lg s1icon-s-" + navItem.icon;
//   //return(<li key={i}><Link to={navItem.link} onClick={self.clickHandler}><span className={classes}></span>&nbsp;{navItem.name}</Link></li>)
// //})
// }

// <a className="dropdown-toggle" data-toggle="dropdown" >
//   <span className={currentClasses}></span>&nbsp;{this.state.current.name}
// </a>
// <li><Link to="distributed-sending"><span className="s1icon s1icon-lg s1icon-s-email"></span>&nbsp;Distributed Sending</Link></li>
// <li><Link to="client-management"><span className="s1icon s1icon-lg s1icon-s-groups"></span>&nbsp;Manage Clients</Link></li>
// <li><Link to="fa-administration"><span className="s1icon s1icon-lg s1icon-s-contact"></span>&nbsp;FA Administration</Link></li>

module.exports = AppSwitcher;
