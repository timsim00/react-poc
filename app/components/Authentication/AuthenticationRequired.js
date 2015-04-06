var React = require("react");

var auth = require("./Authentication");

module.exports.requireAuth = (Component) => {
	return class Authenticated extends React.Component {
		static willTransitionTo(transition) {
		  if (!auth.loggedIn()) {
			transition.redirect('/log-in', {}, {'nextPath' : transition.path});
		  }
		}
		render () {
		  return <Component {...this.props}/>
		}
	  }
	};
