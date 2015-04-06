var React = require('react');

var Overview = require('./Overview')
var emails = require('../../data/emails');
var sends = require('../../data/sends');

//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");

// var DistributedSending = AuthenticationRequired.requireAuth(React.createClass({
//   render: function() {
//     return (
//         <Overview emails={emails} sends={sends} />
//     );
//   }
//
// }));

var DistributedSending = React.createClass({
  render: function() {
    return (
        <Overview emails={emails} sends={sends} />
    );
  }

});


module.exports = DistributedSending;
