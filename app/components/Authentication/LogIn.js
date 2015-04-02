var React = require('react');
var Router = require('react-router')

var auth = require("./Authentication");

var LogIn = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func.isRequired
   },
	getInitialState : function(){
		var state = {};
		state.username = "";
		state.password = "";
		state.error = false;
		return state;
	},
	onUserNameChange: function(){
		var username = this.refs.username.getDOMNode().value;
		this.setState({username: username});
	},
	onPasswordChange: function(){
		var password = this.refs.password.getDOMNode().value;
		this.setState({password: password});
	},
	onLogIn: function(event){
		this.setState({attempted: true});
		event.preventDefault();
    	var { router } = this.context;

		var nextPath = router.getCurrentQuery().nextPath;
		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;
		auth.login(username, password, (loggedIn) => {
		  if (!loggedIn){
			return this.setState({ error: true });
		  }
		  if (nextPath) {
 			router.replaceWith(nextPath);
 		  } else {
 			router.replaceWith('/');
 		  }
		});
	},
	render: function(){
		return (
		<div className="col-md-4">
			<div className="well">
				<form className="form-horizontal" onSubmit={this.onLogIn}>
					<div className="form-group">
						<label className="col-md-3" htmlFor="username"> Username </label>
						<div className="col-md-9">
							<input type="text" className="form-control" id="username" ref="username" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-3" htmlFor="password"> Password </label>
						<div className="col-md-9">
							<input type="text" className="form-control" id="password" ref="password" />
						</div>
					</div>
					
					<div className="pull-right"> 
						<button type="submit" className="btn btn-primary" > Log In </button>
					</div>
					<div className="clearfix"> </div>
				</form>
			</div>
		</div>
		);
	}
});


module.exports = LogIn;