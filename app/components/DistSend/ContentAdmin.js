var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    ReactTagsInput = require('react-tagsinput')
    




var Link = Router.Link;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Modal = ReactBootstrap.Modal;

//components

var SearchBar = require('../Shared/Shared').SearchBar;
var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;
var ItemList =  require('../Shared/Shared').ItemList

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
		<div className="col-md-6">
		  <h2>Content Administration</h2>
		</div>
    <div className="col-md-6 text-right">
    <Link to="distributed-sending" className="btn btn-default">
      <span className="glyphicon glyphicon-arrow-left" />
      &nbsp;Back to Overview
    </Link>
    </div>
		<div className="row">
    <div className="col-md-12">
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
	</div>
    );
  }
});


var ContentCategories = React.createClass({
  render: function() {
    return (
    <div>
    	<h4>Content Categories</h4>
    	<div className="searchbar">
      		<SearchBar />
    	</div>
    	<div className="well">
        	<FolderTree folders={folders} />
    	</div>
    </div>
    );
  }

});

var FilterByType = React.createClass({
  render: function() {
    return (
    <div>
      <h4>Filter By Type</h4>
      <div className="well">
      	<FilterByType_ data={filterData} onChange={this.props.onChange} />
      </div>
    </div>
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



var MyModal = React.createClass({
  getNextId : (function(){
	  var id = 0;
	  return function(){
		  return id++;
	  };
  })(),
  	
  getInitialState: function(){
  	var state = {};
  	state.tags = [];
  	return state;
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
  render: function() {
    var self = this;
    return (
        <Modal {...this.props} bsStyle="primary" title="Set Selected Content Properties" animation={false}>

	  <div >
             
	     <div id="selectedTags" className="col-md-8">
	        <div className = " well input-group" >
	           <input type="text" className="form-control" aria-label="..." placeholder="tagname" id="tagname" ref="tagname" />
                   <div className="input-group-btn" >
                     <button type="button" className="btn btn-default" onClick={this.addTag}>Add</button>
                   </div> 
		</div>
		<div>
		     { this.state.tags.map(function(tag) { return <button className="btn btn-default"> { tag.value } <span className="glyphicon glyphicon-remove-circle" onClick={self.removeTag.bind(self, tag.id)} /> </button> }) } 
		</div>
	     </div>
	     <div id="selectedEntitlements" className="well col-md-4">
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
    	<h4>Retirement</h4>
    	<div className="well">
	    <RetirementThumbs types={this.props.types}/>
    	</div>

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
				return(<div className="btn btn-default selectableDivs">
					<label htmlFor={t.id}>{t.title}</label>
					<ModalTrigger modal={<MyModal />}>
					  <div>
					  	<img className="retirement-img" id={t.id} src={t.imgUrl} height="220" width="200" />
					  </div>
    					</ModalTrigger>
		   		</div>)
			})}
		</div>
       );
    }
});



module.exports = ContentAdmin;
