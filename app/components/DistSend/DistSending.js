var React = require('react');

var Overview = require('./Overview')
var emails = require('../../data/emails');

var DistributedSending = React.createClass({
  render: function() {
    return (
        <Overview emails={emails} />
    );
  }

});

module.exports = DistributedSending;
