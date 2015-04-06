var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    $ = require('jquery'),
    PubSub = require('pubsub-js');

//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");

jQuery("html").on("click.selectableDivs", ".selectableDivs", function(){
    jQuery(this).toggleClass("active");
});



var Link = Router.Link;


//components

var SearchBar = require('../Shared/Shared').SearchBar;
var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;
var ItemList =  require('../Shared/Shared').ItemList;
var Container =  require('../Shared/Container');
var EmailThumbs =  require('../Shared/EmailThumbs');

//data
var folders = require("../../data/folders");
var filterData = require("../../data/types");

/*** MAIN ***/

// var ContentAdmin = AuthenticationRequired.requireAuth(React.createClass({
//   handleFilterChange: function(selectedTypes){
//   	this.setState({selectedTypes: selectedTypes});
//   },
//   handleSearchChange: function(searchText){
//   	this.setState({searchText: searchText});
//   },
//   getInitialState: function(){
//   	var state = {};
//   	state.selectedTypes = [];
//   	state.searchText = "";
//   	return state;
//   },
//   render: function() {
//   	var types = this.state.selectedTypes;
//   	var that = this;
//     return (
// 	<div>
// 		<div className="row pageTitle">
// 			<div className="col-md-6">
// 				<h2>Content Administration</h2>
// 			</div>
// 			<div className="col-md-6 text-right">
// 				<Link to="dashboard" className="btn btn-default">
// 					<span className="glyphicon glyphicon-arrow-left" />
// 					&nbsp;Back to Dashboard
// 				</Link>
// 			</div>
// 		</div>
// 		<div className="row">
// 			<div className="col-md-4">
//         <Container title="Search" >
//           <SearchBar onChange={that.handleSearchChange}/>
//         </Container>
//         <div className="clearfix"></div>
// 				<div>
// 					<ContentCategories />
// 				</div>
// 				<div>
// 					<FilterByType data={filterData} onChange={that.handleFilterChange}/>
// 				</div>
// 			</div>
// 			<div className="col-md-8">
// 				<EmailSelect types={types} search={this.state.searchText}/>
// 			</div>
// 		</div>
// 	</div>
//     );
//   }
// }));


var ContentAdmin = React.createClass({
  handleFilterChange: function(selectedTypes){
  	this.setState({selectedTypes: selectedTypes});
  },
  handleSearchChange: function(searchText){
  	this.setState({searchText: searchText});
  },
  getInitialState: function(){
  	var state = {};
  	state.selectedTypes = [];
  	state.searchText = "";
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
				<Link to="dashboard" className="btn btn-default">
					<span className="glyphicon glyphicon-arrow-left" />
					&nbsp;Back to Dashboard
				</Link>
			</div>
		</div>
		<div className="row">
			<div className="col-md-4">
        <Container title="Search" >
          <SearchBar onChange={that.handleSearchChange}/>
        </Container>
        <div className="clearfix"></div>
				<div>
					<ContentCategories />
				</div>
				<div>
					<FilterByType data={filterData} onChange={that.handleFilterChange}/>
				</div>
			</div>
			<div className="col-md-8">
				<EmailSelect types={types} search={this.state.searchText}/>
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
			<EmailThumbs types={this.props.types} search={this.props.search} settings="true" />
		</Container>
		);
    }
});






module.exports = ContentAdmin;
