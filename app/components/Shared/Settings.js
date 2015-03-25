var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    $ = require('jquery'),
    PubSub = require('pubsub-js'),
    ModalContainer = require('./ModalContainer');

    var Shared = require('../Shared/Shared');
    var Container =  require('../Shared/Container');
    var ItemList = Shared.ItemList;
    var folders = require("../../data/folders");
    var filterData = require("../../data/types");

    var entitlements = [
    	{ id: 1, title: "High Net Worth" },
    	{ id: 2, title: "Series 7" },
    	{ id: 3, title: "Mortgage" },
    	{ id: 4, title: "Retirement" },
    	{ id: 5, title: "Investing" },
    	{ id: 6, title: "Options" }
    ];

/*** SETTINGS ***/

var Settings = React.createClass({
    subscriptions: {},

	getNextId : (function(){
	  	var id = 0;
	  	return function(){
		  	return id++;
	  	};
	})(),

	getInitialState: function(){
		return {
			emailname: "< Select an Email >", tags: []
		}
	},
	addTag : function () {
		this.state.tags.push({id: this.getNextId(), value: this.refs.tagname.getDOMNode().value});
		this.setState({tags: this.state.tags});
	},
	removeTag : function (id) {
		var filteredArray = this.state.tags.filter(function(t){
			return t.id !== id;
		});
		console.log(filteredArray);
		this.setState({tags:filteredArray});
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
  	render: function() {
  		var imgStyle = {width:'80%;'};
  		var tagStyle = {padding: '5px;', 'background-color': 'white;'};
  		var self = this;
    	return (
		<Container title="Settings">
			<label id="emailLabel">{this.state.emailname}</label><br/>
			<hr className="divider" />
			<div id="setEntitlements">
				<label htmlFor="selectedEntitlements">Entitlements</label>
				<ItemList items={entitlements} />
			</div>
			<hr className="divider" />
			<div id="setTypes">
				<label htmlFor="setTypes">Types</label>
				<ItemList items={filterData} />
			</div>
			<hr className="divider" />
			<div id="setTags">
				<label htmlFor="setTypes">Tags</label><br/>
				<div id="selectedTags">
					<div className = "input-group" >
						<input type="text" className="form-control" aria-label="..." placeholder="tagname" id="tagname" ref="tagname" />
						<div className="input-group-btn" >
							<button type="button" className="btn btn-default" onClick={this.addTag}>Add</button>
						</div>
					</div>
					<div>
						{ this.state.tags.map(function(tag) { return <button className="btn btn-default"> { tag.value } <span className="glyphicon glyphicon-remove-circle" onClick={self.removeTag.bind(self, tag.id)} /> </button> }) }
					</div>
				</div>
			</div>
		</Container>
    	);
  	}

});


module.exports = Settings;
