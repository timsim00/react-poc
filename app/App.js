var React = require('react'),
    Router = require('react-router');

//var auth = require("./components/Authentication/Authentication");

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

// var App = React.createClass({
//   getInitialState: function(){
//   	var state = {};
//   	state.loggedIn = auth.loggedIn();
//   	return state;
//   },
//   setStateOnAuth : function(loggedIn) {
//     this.setState({
//       loggedIn: loggedIn
//     });
//   },
//   componentWillMount: function() {
//     auth.onChange = this.setStateOnAuth.bind(this);
//     auth.login();
//   },
//   render: function() {
//
//     return (
//       <div>
//         <AppSwitcher/>
//         <div className="container-fluid">
//           <RouteHandler/>
//         </div>
//       </div>
//     );
//   }
// });

module.exports = App;
