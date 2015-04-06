var React = require("react");

var auth = require("./Authentication");

class Logout extends React.Component {
  componentDidMount () {
    auth.logout();
  }

  render () {
    return <p>You are now logged out</p>;
  }
}


module.exports = Logout;