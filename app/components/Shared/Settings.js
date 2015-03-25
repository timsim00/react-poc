var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    $ = require('jquery'),
    PubSub = require('pubsub-js'),
    ModalContainer = require('./ModalContainer');

var Shared = require('../Shared/Shared');
var Container =  require('../Shared/Container');
var ItemList = Shared.ItemList;
var RadioList = Shared.RadioList;
var folders = require("../../data/folders");
var filterData = require("../../data/types");
var entitlements = require("../../data/entitlements");
var tagData = require("../../data/tags");

/*** SETTINGS ***/

var Settings = React.createClass({
    subscriptions: {},

	getNextId : (function(){
	  	var id = tagData.map(function(t){return t.id}).reduce(function(m,c){if(c>m){return c}return m}) + 1;
	  	return function(){
		  	return id++;
	  	};
	})(),

	getInitialState: function(){
		return {
			 tags: this.props.email.tags || [],
			 tagData: tagData,
			 entitlements: this.props.email.entitlements || [],
			 types: this.props.email.type || []
		}
	},
	addTag: function () {
		var tagId;
		var tagName = this.refs.tagname.getDOMNode().value;
		var existing = this.state.tagData.filter(function(t){
			return t.name === tagName;
		})[0];
		if(existing){
			tagId = existing.id;
		} else {
			tagId = this.getNextId();
		}
		this.state.tagData.push({id: tagId, name: tagName});
		this.state.tags.push(tagId);
		this.setState({tags: this.state.tags});
		if(this.props.onChange){
			this.props.onChange({tags: this.state.tags});
		}
	},
	removeTag : function (id) {
		var filteredArray = this.state.tags.filter(function(t){
			return t !== id;
		});

		this.setState({tags:filteredArray});
		if(this.props.onChange){
			this.props.onChange({tags: filteredArray});
		}
	},
	handleContentSelected: function(msg, data) {
		var title = $('*[data-reactid="'+ data +'"]').text();
		console.log($('*[data-reactid="'+ data +'"]'));
		this.setState({emailname: title});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Content-Selected', this.handleContentSelected );
		this.subscriptions['Content-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Content-Selected'] );
	},
	onEntitlementChange: function(values){
		this.setState({entitlements: values});
		if(this.props.onChange){
			this.props.onChange({entitlements: values});
		}
	},
	onTypeChange: function(values){
		this.setState({types: values});
		if(this.props.onChange){
			this.props.onChange({types: values});
		}
	},
  	render: function() {
  		var imgStyle = {width:'80%;'};
  		var tagStyle = {padding: '5px;', 'background-color': 'white;'};
  		var tagLookup = this.state.tagData.reduce(function(lookup, tag){
  			lookup[tag.id] = tag;
  			return lookup;
  		},{});
  		var self = this; 	
    	return (
		<div className="email-content-settings">
			<Container title="Entitlements">
				<RadioList check={true} source={entitlements} selected={this.state.entitlements} onSelectionChange={this.onEntitlementChange}/>
			</Container>
			<Container title="Types">
				<RadioList check={true} source={filterData} selected={this.state.types} onSelectionChange={this.onTypeChange}/>
			</Container>
			<Container title="Tags">
				<div id="selectedTags">
					<div className = "input-group" >
						<input type="text" className="form-control" aria-label="..." placeholder="tagname" id="tagname" ref="tagname" />
						<div className="input-group-btn" >
							<button type="button" className="btn btn-default" onClick={this.addTag}>Add</button>
						</div>
					</div>
					<div>
						{ this.state.tags.map(function(tagId) {
							var tag = tagLookup[tagId];
							return <button className="btn btn-default"> { tag.name } <span className="glyphicon glyphicon-remove-circle" onClick={self.removeTag.bind(self, tag.id)} /> </button> 
						}) }
					</div>
				</div>
			</Container>
		</div>
    	);
  	}

});

module.exports = Settings;
