var React = require('react');
var Shared = require('../Shared/Shared');
var CheckListPlus = Shared.CheckListPlus;

//components
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;

//data
var clients = require("../../data/clients");
var lists = require("../../data/lists");
var subscriptions = require("../../data/publications");

var checkedTest = [0,3,4];

var filterMatch = function(text, filter){
	return text.indexOf(filter) !== -1;
};

var ClientLists = React.createClass({
  onSelectedListsChange: function(lists){
  	this.setState({selectedLists: lists});
  },
  onSelectedSubscriptionsChange: function(subscriptions){
  	this.setState({selectedSubscriptions: subscriptions});
  },
  getInitialState: function(){
  	var state = {selectedLists: [], selectedSubscriptions: [], filter: ""};
  	return state;
  },
  onSearchChange: function(searchFilter){
  	this.setState({filter: searchFilter});
  },
  render: function() {
  	var self = this;
  	var filteredClients = clients.filter(function(c){
  		return self.state.filter === "" ||
  		 filterMatch(c.firstName, self.state.filter) ||
  		  filterMatch(c.lastName, self.state.filter) || 
  		  filterMatch(c.emailAddress, self.state.filter);
  	}).map(function(c){
		return {id: c.id, name: [c.firstName, c.lastName].join(" "), email: c.emailAddress};
	});
    return (
      <div>
      	<h2>Manage Clients</h2>
        <div className="row">
          <div className="col-md-6">
             <div className="row">
              	<div className="col-md-3">Search for Contact</div>
              	<div className="col-md-9"><SearchBar onChange={this.onSearchChange} /></div>
          	</div>
            <div className="row well" id="myContactsPanel">
              <ItemList items={filteredClients}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
            	<button className="btn btn-primary">Upload New Clients</button>
                <div className="small">Upload new contacts from your desktop using a “delimited” file</div>
            </div>
            <div className="row"> 
	            <label htmlFor="inpFirstName">First Name</label>
    	        <input type="text" id="inpFirstName" className="form-control" aria-label="..." />
            </div>
            <div className="row">
	            <label htmlFor="inpLastName">Last Name</label>
    	        <input type="text" id="inpLastName" className="form-control" aria-label="..." />
            </div>
            <!-- Email -->
            <div className="row">
              <h3> Lists </h3>
              <div className="well">
	              <ItemList items={lists} onChange={this.onSelectedListsChange}/>
              </div>
            </div>
            <div className="row">
              <h3>Subscriptions</h3>
              <div className="well">
              	<CheckListPlus data={subscriptions} selected={checkedTest} onChange={this.onSelectedSubscriptionsChange}/>
              </div>
            </div>
            <div className="row">
            	<button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ClientLists;
