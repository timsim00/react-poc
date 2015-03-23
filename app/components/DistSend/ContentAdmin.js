var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    ReactTagsInput = require('react-tagsinput')


jQuery("html").on("click.selectableDivs", ".selectableDivs", function(){
    console.log(jQuery(this));
    jQuery(this).toggleClass("active");
    console.log(jQuery(this));
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

var folders = [
    {
        name: "Shared Emails",
        folders: [
            {
                name: "Newsletters",
                folders: [
                    {name: "Retirement"},
                    {name: "Mortgage"}
                 ]
            },
            {name: "Webinars"},
            {name: "Whitepapers"},
            {name: "Series 7 Approved"},
    ]},
    { name: "Shared Templates"}
];

var filterData = {
    title: "Filter By Type"
    ,items: [
        { title: "Newsletters", id: "newsletter" }
        ,{ title: "Advice", id: "advice" }
        ,{ title: "Managed Communications", id: "managed" }
    ]
};


var ContentAdmin = React.createClass({
  handleFilterChange: function(selectedTypes){
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
      <div className="col-md-4">
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
		</div>
	</div>
    );
  }
});


var ContentCategories = React.createClass({
  render: function() {
    return (
    <Container title="Content Categories">
      		<SearchBar /><br /><br />
        	<FolderTree folders={folders} />
    </Container>
    );
  }

});

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


var EmailSelect = React.createClass({
  render: function() {
    return (
    <div>
      <Container title="Retirement">
			     <RetirementThumbs types={this.props.types}/>
    	</Container>
	<ModalTrigger modal={<MyModal />}>
	  <button className="btn btn-default" type="button">Select</button>
	</ModalTrigger>
    </div>
    );
  }
});

var thumbs = require("../../data").contentData;
var RetirementThumbs = React.createClass({
    render: function() {
	  	var types = this.props.types.map(function(t){return t.id});
  		var thumbList = thumbs.filter(function(t){
  			return t.category === "Retirement";
  		}).filter(function(t){
  			return types.length === 0 || types.indexOf(t.type) != -1;
  		});
        return(
		<div id="createEmail">
			{thumbList.map(function(t){
				return(<div className="btn btn-default selectableEmailDivs">
					<label htmlFor={t.id}>{t.title}</label>
					<div>
						<img className="retirement-img" id={t.id} src={t.imgUrl} height="220" width="200" />
					</div>
		   		</div>)
			})}
		</div>
       );
    }
});



module.exports = ContentAdmin;
