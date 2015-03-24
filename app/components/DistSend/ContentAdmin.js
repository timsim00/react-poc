var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    //ReactTagsInput = require('react-tagsinput'),
    $ = require('jquery'),
    PubSub = require('pubsub-js');


jQuery("html").on("click.selectableDivs", ".selectableDivs", function(){
    jQuery(this).toggleClass("active");
});



var Link = Router.Link;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Modal = ReactBootstrap.Modal;

//components

var SearchBar = require('../Shared/Shared').SearchBar;
var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;
var ItemList =  require('../Shared/Shared').ItemList;
var Container =  require('../Shared/Container');

//data
var folders = require("../../data/folders");
var filterData = require("../../data/types");

/*** MAIN ***/

var ContentAdmin = React.createClass({
  handleFilterChange: function(selectedTypes){
  	console.log('selectedTypes:',selectedTypes);
  	this.setState({selectedTypes: selectedTypes});
  },
  getInitialState: function(){
  	var state = {};
  	state.selectedTypes = [];
  	return state;
  },
  render: function() {
  	var types = this.state.selectedTypes;
  	var that = this;
    return (
	<div>
		<div className="row pageTitle">
			<div className="col-md-6">
				<h2>Content Administration</h2>
			</div>
			<div className="col-md-6 text-right">
				<Link to="distributed-sending" className="btn btn-default">
					<span className="glyphicon glyphicon-arrow-left" />
					&nbsp;Back to Overview
				</Link>
			</div>
		</div>
		<div className="row">
			<div className="col-md-2">
				<div>
					<ContentCategories />
				</div>
				<div>
					<FilterByType data={filterData} onChange={that.handleFilterChange}/>
				</div>
			</div>
			<div className="col-md-8">
				<EmailSelect types={types}/>
			</div>
			<div className="col-md-2">
				<Settings />
			</div>			
		</div>
	</div>
    );
  }
});

/****  Content Categories ****/

var ContentCategories = React.createClass({
  render: function() {
    return (
    <Container title="Content Categories">
      <FolderTree folders={folders} />
    </Container>
    );
  }

});


/*** FILTER BY TYPE ***/

var FilterByType = React.createClass({
  render: function() {
    return (
    <Container title="Filter By Type">
      	<FilterByType_ data={filterData} onChange={this.props.onChange} />
    </Container>
    );
  }

});


var entitlements = [
	{ id: 1, title: "High Net Worth" },
	{ id: 2, title: "Series 7" },
	{ id: 3, title: "Mortgage" },
	{ id: 4, title: "Retirement" },
	{ id: 5, title: "Investing" },
	{ id: 6, title: "Options" }
];

var selectedEmails = [
	{ id: 1, title: "October" },
	{ id: 2, title: "December" }
]

var validateTag = function (tag) {
  return tag !== "" && !/_/.test(tag); // lets not allow underscore in our tags.
};

var keyCodes = [13, 9, 32]; // add tags when keys Enter (13), Tab (9) or Space (32) is down.

{/*
var ContentTags = React.createClass({
  getInitialState: function () {
    return {
      text: ""
    };
  }

  , onChange: function (tags) {
    this.setState({
      text: tags.join(", ")
    });
  }

  , render: function () {
    var source = this.state.text;
    return (
      <div>
        <label>Content Tags</label>
        <ReactTagsInput validate={validateTag} onChange={this.onChange} addKeys={[13, 9, 32]} />
      </div>
    );
  }
});
*/}

/*** SETTINGS ***/

var Settings = React.createClass({
    subscriptions: {},
	getInitialState: function() {
		return {
			emailname: "< Select an Email >"
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
  render: function() {
  	var imgStyle = {width:'80%;'};
  	var tagStyle = {padding: '5px;', 'background-color': 'white;'};
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
		<div id="setTypes">
            <label htmlFor="setTypes">Tags</label><br/>
            <div className="well" style={tagStyle}>
				<img src="/images/tags.png" style={imgStyle} />
			</div>
		</div>				     	
    </Container>
    );
  }

});

var MyModal = React.createClass({
  render: function() {
    return (
        <Modal {...this.props} bsStyle="primary" title="Set Selected Content Properties" animation={false}>

	  <div className="col-md-12 ">

	     <div id="selectedEmails" className="col-md-4 well listBoxNoChecks">
	        <label htmlFor="selectedEmails">Selected Emails</label>
		<ItemList items={selectedEmails} />
	     </div>
	     <div id="selectedEntitlements" className="well col-md-8">
                <label htmlFor="selectedEntitlements">Set Email Entitlements</label>
		<ItemList items={entitlements} />
	     </div>
	  </div>
          <div className="modal-footer">
            <button className="btn btn-default" type="button" onClick={this.props.onRequestHide}>Save</button>
            <button className="btn btn-default" type="button" onClick={this.props.onRequestHide}>Cancel</button>
          </div>
        </Modal>
      );
  }
});


/****  Email Select ****/

var EmailSelect = React.createClass({
	subscriptions: {},
	handleFolderSelected: function(msg, data) {
		this.setState({FolderName: data.name});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Folder-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
	},
    getInitialState: function(){
		return { FolderName: "Retirement" };
    },
    render: function() {
    	var searchStyle = {'padding-top':'10px;'};
		return (
		<Container title={ this.state.FolderName }>
			<div className="row col-md-4 pull-right" style={searchStyle} >
				<SearchBar />
			</div>
			<div className="clearfix"></div>
			<EmailThumbs types={this.props.types}/>
		</Container>
		);
    }
});



/****  Content Thumbnails ****/

var thumbs = require("../../data/emails");
var imgPath = '/images/';
var EmailThumbs = React.createClass({
	subscriptions: {},
	getInitialState: function() {
		return {
			selectedId: null,
			folder: 7
		}
	},
	handleThumbClick: function(e) {
		e.preventDefault();
		var $ele = $(e.target);
		if (!$ele.hasClass('selectableEmailDivs')) $ele = $ele.closest('.selectableEmailDivs');
		var thisId = $ele.data('reactid');
		var $check = $ele.find('.selected-indicator');

		if (this.state.selectedId) {
			var $prev = $('*[data-reactid="'+ this.state.selectedId +'"]');
			$prev.removeClass('active');
			$prev.find('.selected-indicator').addClass('hidden');
		}
		this.state.selectedId = thisId;
		$ele.addClass('active');
		$check.addClass('content-selected').removeClass('hidden');

		PubSub.publish( 'Content-Selected', thisId );
	},
	handleFolderSelected: function(msg, data) {
		this.setState({folder: data.id});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Folder-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
	},
    render: function() {
    	var that = this;
	  	var types = this.props.types.map(function(t){return t.id});
	  	//var selectedStyle = {visibility:"hidden"};
  		var thumbList = thumbs.filter(function(t){
  				return t.folder === that.state.folder;
  			}).filter(function(t){
  				return types.length === 0 || types.indexOf(t.type) != -1;
  			});
        return(
		<div id="createEmail">
			{thumbList.map(function(t){
				return(
				<div onClick={that.handleThumbClick} className="btn btn-default selectableEmailDivs">
					<label htmlFor={t.id}>{t.name}</label><div className="selected-indicator hidden fa fa-check fa-lg" />
					<div>
						<img className="retirement-img" id={t.id} src={imgPath + t.previewImage} height="220" width="200" />
					</div>
		   		</div>
		   		)
			})}
		</div>
       );
    }
});



module.exports = ContentAdmin;
