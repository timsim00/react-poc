var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

var CustomModalTrigger = React.createClass({
  mixins: [OverlayMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
  	if(this.props.onToggle){
  		this.props.onToggle(!this.state.isModalOpen)
  	}
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    if (this.props.icon) {
      var classes = "fa fa-lg fa-" + this.props.icon;
      return(
        <span className={classes} onClick={this.handleToggle} ></span>
      );
    }
    var style = this.props.style || "primary";
    return (
      <Button onClick={this.handleToggle} bsSize={this.props.size} bsStyle={style}>{this.props.cta}</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <span/>;
    }
	
    return (
        <Modal bsStyle="primary" title={this.props.title} onRequestHide={this.handleToggle}>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Modal>
      );
  }
});


module.exports = CustomModalTrigger;
