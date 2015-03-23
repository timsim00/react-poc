var React = require("react");
var ReactBootstrap = require("react-bootstrap");

var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Button = ReactBootstrap.Button;

var Shared = require("./Shared");
var ItemList = Shared.ItemList;


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
	onHide: function(a){
		this.props.onClose(a, this.state.selected);
		this.props.onRequestHide();
	},
	onSelectionChange: function(selectedItems){
		this.setState({selected: selectedItems});
	},
	render: function(){
		var selectedLookup = createLookup(this.state.selected);
		var items = (this.props.source || []).map(function(i){
			i.selected = selectedLookup[i.id];
			return i;
		});
		return (
			<Modal {...this.props} onRequestHide={this.onHide} bsStyle="default">
				<div className="modal-body">
					<ItemList items={items} onChange={this.onSelectionChange} />
				</div>
				<div className="modal-footer">
					<Button onClick={this.onHide.bind(this, true)} bsStyle="primary"> Save </Button>
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
		var ids = newState.map(function(i){ return i.id;});
		this.setState({selected: ids});
		
		if(this.props.onChange){
			this.props.onChange(ids);
		}
	},
	handleHide: function(save, items){
		if(save){
			this.saveItems(items);
		}
	},
	render: function(){
		var source = this.props.source; //probably fine as props -- shouldn't change
		var selected = this.state.selected; //might need to be based on state
		var selectedLookup = createLookup(selected);
		var selectedItems = source.filter(function(item){
			return selectedLookup[item.id];
		});
		
		return (<div className="editable-list">
			<div className="row">
				<div className="pull-right">{this.state.a}
					<ModalTrigger modal={<EditListModal source={source} selected={selected} onClose={this.handleHide} />}>
      					<Button bsStyle="default">Edit</Button>
    				</ModalTrigger>
				</div>
			</div>
			<div className="row">
				<ItemList items={selectedItems} noCheck={true}/>
			</div>
		</div>);
	}
});


module.exports = EditableList;