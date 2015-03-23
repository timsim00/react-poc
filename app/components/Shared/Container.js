var React = require('react');


var Container = React.createClass({
  render: function(){
    var classes = "well" + (this.props.class ? " " + this.props.class : '')
    return (
      <div>
        <div className={classes}>
          <div className="titlebar navbar navbar-default">
            <h4>{this.props.title}</h4>
          </div>
          <div className="clearfix"></div>
          {this.props.children}
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
})


module.exports = Container;
