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

var checkedTest = [0,3,4];

var filterMatch = function(text, filter){
	return text.toLowerCase().indexOf(filter) !== -1;
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
        <div className="row">
          <div className="col-md-6">
			<Container title="My Clients" class="clientManagePanel">
				<SearchBar onChange={this.onSearchChange} />
				<ItemList items={filteredClients}/>
			</Container>
          </div>
          <div className="col-md-6">
			<Container title="Client Details">
				<div className="row">
					<div className="col-md-6">
						<label htmlFor="inpFirstName form-group">First Name</label>
						<input type="text" id="inpFirstName" className="form-control" aria-label="..." />
					</div>
					<div className="col-md-6">
						<label htmlFor="inpLastName form-group">Last Name</label>
						<input type="text" id="inpLastName" className="form-control" aria-label="..." />
					</div>
				</div>
				<div className="clearfix"></div><br />
					<div className="row">
					<div className="col-md-12 form-group">
						<label htmlFor="inpEmailAddress">Email Address</label>
						<input type="text" id="inpEmailAddress" className="form-control" aria-label="..." />
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
            <!-- Email -->
				<Container title="Lists">
					<ItemList items={lists} onChange={this.onSelectedListsChange}/>
				</Container>
				<Container title="Subscriptions">
					<CheckListPlus data={subscriptions} selected={checkedTest} onChange={this.onSelectedSubscriptionsChange}/>
				</Container>
				<div className="row">
					<div className="col-md-12 text-center">
						<button className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
        </div>
      </div>
    );
  }

});

module.exports = ClientLists;
