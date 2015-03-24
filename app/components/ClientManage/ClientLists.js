var React = require('react');
var Shared = require('../Shared/Shared');
var CheckListPlus = Shared.CheckListPlus;

//components
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;
var Container =  require('../Shared/Container');

//data
var clients = require("../../data/clients");
var lists = require("../../data/lists");
var subscriptions = require("../../data/publications");

var filterMatch = function(text, filter){
	var t = text.toLowerCase();
	var f = filter.toLowerCase();
	return t.indexOf(f) !== -1;
};

var ClientLists = React.createClass({
	//May not be needed
  onSelectedListsChange: function(lists){
  	this.setState({selectedLists: lists});
  },
	//May not be needed
  onSelectedPublicationsChange: function(publications){
  	this.setState({selectedPublications: publications});
  },
  onSelectedClientChange : function(client){
  	//currently client is an array (ideally of length 1)
  	console.log("Client change");
  	var selected = null;
  	if(client[0]){
  		selected = clients.filter(function(c){return c.id === client[0].id;})[0];
  	}
  	this.setState({selectedUser: selected});
  	
  },
  getInitialState: function(){
  	var state = {selectedLists: [], selectedPublications: [], filter: "", selectedUser:{}};
  	return state;
  },
  onSearchChange: function(searchFilter){
  	this.setState({filter: searchFilter});
  },
  render: function() {
  console.log("ClientLists Render!");
  	var self = this;
  	var filteredClients = clients.filter(function(c){
  		return self.state.filter === "" ||
  		 filterMatch(c.firstName, self.state.filter) ||
  		  filterMatch(c.lastName, self.state.filter) ||
  		  filterMatch(c.emailAddress, self.state.filter);
  	}).map(function(c){
		return {id: c.id, name: [c.firstName, c.lastName].join(" "), email: c.emailAddress};
	});
	
	var userValues = {first: "", last: "", email: "", lists: [], publications: []};
	if(this.state.selectedUser){
		userValues.first = this.state.selectedUser.firstName || "";
		userValues.last = this.state.selectedUser.lastName || "";
		userValues.email = this.state.selectedUser.emailAddress || "";
		userValues.lists = this.state.selectedUser.lists || [];
		userValues.publications = this.state.selectedUser.publications || [];
	}
	console.log(userValues.lists);
	var listCopy = lists.map(function(l){
		return {id: l.id, name: l.name, selected: (userValues.lists.indexOf(l.id) !== -1)};
	});
    return (
        <div className="row">
          <div className="col-md-6">
			<Container title="My Clients" class="clientManagePanel">
				<SearchBar onChange={this.onSearchChange} />
				<ItemList items={filteredClients} onChange={this.onSelectedClientChange} />
			</Container>
          </div>
          <div className="col-md-6">
			<Container title="Client Details">
				<div className="row">
					<div className="col-md-6">
						<label htmlFor="inpFirstName form-group">First Name</label>
						<input type="text" id="inpFirstName" className="form-control" aria-label="..." value={userValues.first}/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inpLastName form-group">Last Name</label>
						<input type="text" id="inpLastName" className="form-control" aria-label="..." value={userValues.last} />
					</div>
				</div>
				<div className="clearfix"></div><br />
					<div className="row">
					<div className="col-md-12 form-group">
						<label htmlFor="inpEmailAddress">Email Address</label>
						<input type="text" id="inpEmailAddress" className="form-control" aria-label="..." value={userValues.email} />
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="row">
					<div className="col-md-7 pull-right text-right">
						<button className="btn btn-primary">Upload New Clients</button>
						<div className="small">Upload new contacts from your desktop using a “delimited” file</div>
					</div>
				</div>
            </Container>
			<Container title="Lists">
				<ItemList items={listCopy} onChange={this.onSelectedListsChange}/>
			</Container>
			<Container title="Subscriptions">
				<CheckListPlus data={subscriptions} selected={userValues.publications} onChange={this.onSelectedPublicationsChange}/>
			</Container>
			<div className="row">
				<div className="col-md-12 text-center">
					<button className="btn btn-primary">Save</button>
				</div>
			</div>
		</div>
    </div>
    );
  }

});

module.exports = ClientLists;
