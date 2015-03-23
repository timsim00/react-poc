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
      current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
      var links = this.state;
      links.current = current === "" ? "distributed-sending" : current;
      return links;
    },
    getInitialState: function(){
        var current = this.getPath();
        current = current.indexOf("/", 1) !== -1 ? current.substring(1, current.indexOf("/", 1)) : current.substring(1);
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

module.exports = AppSwitcher;
