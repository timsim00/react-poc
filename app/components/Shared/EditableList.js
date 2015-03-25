var React = require("react");
var ReactBootstrap = require("react-bootstrap");

var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Button = ReactBootstrap.Button;

var Shared = require("./Shared");
var ItemList = Shared.ItemList;

var Container = require("./Container");


var createLookup = function(list){
	return list.reduce(function(lookup, current){
		lookup[current] = true;
		return lookup;
	}, {});
}

var EditListModal = React.createClass({
	getInitialState: function(){
		var state = {};
		state.selected = this.props.selected;
		return state;
	},
	onHide: function(){
		this.props.onClose(this.state.selected);
		this.props.onRequestHide();
	},
	onChangeSingle: function(id){
		var selected = this.state.selected;
		if(this.refs[id].getDOMNode().checked){
			selected.push(id);
		} else {
			selected = selected.filter(function(i){return i !== id;});
		}
		this.setState({selected: selected});
	},
	render: function(){
		var selectedLookup = createLookup(this.state.selected);
		var items = this.props.source || [];
		var self = this;
		return (
			<Modal {...this.props} onRequestHide={this.onHide} bsStyle="default">
				<div className="modal-body">
					<div className="editable-list-content">
						{items.map(function(i){
							var checked = "";
							if(selectedLookup[i.id]){
								checked = "checked";
							}
							return (<div className="row" key={i.id}>
								<div className="col-md-1"><input type="checkbox" ref={i.id} checked={checked} onChange={self.onChangeSingle.bind(self,i.id)} /></div>
								<div className="col-md-4">{i.name} </div>
								<div className="col-md-7">{i.email}</div>
							</div>)
						})}
					</div>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default" onClick={this.onHide}>Done</button>
				</div>
			</Modal>
		);
	}
});

var EditableList = React.createClass({
	getInitialState: function(){
		var state = {};
		state.selected = this.props.selected;
		return state;
	},
	saveItems: function(newState){
		this.setState({selected: newState});

		if(this.props.onChange){
			this.props.onChange(ids);
		}
	},
	handleHide: function(items){
		this.saveItems(items);
	},
	componentWillReceiveProps: function(nextProps){
		var newState = {};
		if(this.props.source === nextProps.source){
			newState.source = nextProps.source;
		}
		newState.selected = nextProps.selected;
		this.setState(newState);
	},
	render: function(){
		var source = this.props.source; //probably fine as props -- shouldn't change
		var selected = this.state.selected; //might need to be based on state
		var selectedLookup = createLookup(selected);
		var selectedItems = source.filter(function(item){
			return selectedLookup[item.id];
		});

		var buttons = (<ModalTrigger modal={<EditListModal source={source} selected={selected} onClose={this.handleHide} />}>
    					<Button bsStyle="default">Edit</Button>
  				</ModalTrigger>)

		return (
		<Container buttons={buttons} title={this.props.title} >
			<div className="editable-list">
				{selectedItems.map(function(i){
					return <div className="row" key={i.id}><div className="col-md-5">{i.name}</div><div className="col-md-7">{i.email}</div></div>
				})}
			</div>
		</Container>
		);
	}
});


module.exports = EditableList;
