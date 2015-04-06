var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");

// var LaunchScreen = AuthenticationRequired.requireAuth(React.createClass({
//   render: function() {
//     return (
//       <div>
// 				<div className="col-md-8 col-md-offset-2 launcher text-center">
//           <h1>FA Communicator</h1>
// 					<Link to="dashboard" >
//             <div className="s1icon s1icon-xxl s1icon-s-dashboard"></div>
//             <div className="text">Dashboard</div>
//           </Link>
// 					<Link to="create-email">
//             <div className="s1icon s1icon-xxl s1icon-s-email"></div>
//             <div className="text">Send Email</div>
//           </Link>
// 					<Link to="client-management">
//             <div className="s1icon s1icon-xxl s1icon-s-groups"></div>
//             <div className="text">Manage Clients</div>
//           </Link>
// 					<Link to="fa-administration">
//             <div className="s1icon s1icon-xxl s1icon-s-avatar"></div>
//             <div className="text">FA Administration</div>
//           </Link>
// 				</div>
//       </div>
//     );
//   }
//
// }));

var LaunchScreen = React.createClass({
  render: function() {
    return (
      <div>
				<div className="col-md-8 col-md-offset-2 launcher text-center">
          <h1>FA Communicator</h1>
					<Link to="dashboard" >
            <div className="s1icon s1icon-xxl s1icon-s-dashboard"></div>
            <div className="text">Dashboard</div>
          </Link>
					<Link to="create-email">
            <div className="s1icon s1icon-xxl s1icon-s-email"></div>
            <div className="text">Send Email</div>
          </Link>
					<Link to="client-management">
            <div className="s1icon s1icon-xxl s1icon-s-groups"></div>
            <div className="text">Manage Clients</div>
          </Link>
					<Link to="fa-administration">
            <div className="s1icon s1icon-xxl s1icon-s-avatar"></div>
            <div className="text">FA Administration</div>
          </Link>
				</div>
      </div>
    );
  }

});

module.exports = LaunchScreen;
