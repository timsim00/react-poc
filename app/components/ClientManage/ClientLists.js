var React = require('react');
var Shared = require('../Shared/Shared');
var CheckListPlus = Shared.CheckListPlus;

//components
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;
var RadioList = Shared.RadioList;
var Container =  require('../Shared/Container');

//data
var clients = require("../../data/clients");
var lists = require("../../data/lists");
var subscriptions = require("../../data/publications");



var isMatchForFilter = function(data, filter){
	var filterMatch = function(text, filter){
		var t = text.toLowerCase();
		var f = filter.toLowerCase();
		return t.indexOf(f) !== -1;
	};

	return filterMatch(data.firstName, filter) ||
	  filterMatch(data.lastName, filter) ||
	  filterMatch(data.emailAddress, filter)
}

var ClientLists = React.createClass({
	//May not be needed
  onSelectedListsChange: function(lists){
  	this.setState({selectedLists: lists});
  },
	//May not be needed
  onSelectedPublicationsChange: function(publications){
  	this.setState({selectedPublications: publications});
  },
  onSelectedClientChange : function(clientId){
  	var selectedClient = null;
  	if(clientId){
  		selectedClient = clients.filter(function(c){return c.id === clientId;})[0];
  	}

  	this.setState({
  		selectedClient: selectedClient,
  		changes: {},
  		selectedPublications: selectedClient.publications,
  		selectedLists: selectedClient.lists
  	});
  	
  },
  getInitialState: function(){
  	var state = {selectedLists: [], selectedPublications: [], filter: "", selectedClient:{}, changes: {}};
  	return state;
  },
  onSearchChange: function(searchFilter){
  	var newState = {filter: searchFilter}
	if(this.state.selectedClient && !isMatchForFilter(this.state.selectedClient, searchFilter)){
		newState.selectedClient = null;
	}
  	this.setState(newState);
  },
  onClientDetailChange: function(property){
  	var newValue = this.refs[property].getDOMNode().value;
  	var changes = this.state.changes;
  	if(newValue !== this.state.selectedClient[property]){
  		changes[property] = newValue;
  	} else {
  		changes[property] = null;
  	}
  	this.setState({changes: changes});
  },
  onSave : function(){
	if(this.state.changes.firstName){
		this.state.selectedClient.firstName = this.state.changes.firstName;
	}
	
	if(this.state.changes.lastName){
		this.state.selectedClient.lastName = this.state.changes.lastName;
	}
	
	if(this.state.changes.emailAddress){
		this.state.selectedClient.emailAddress = this.state.changes.emailAddress;
	}
	
	this.state.selectedClient.lists = this.state.selectedLists;
	this.state.selectedClient.publications = this.state.selectedPublications;
	
	this.setState({selectedClient: this.state.selectedClient, changes: {}});
  },
  onChangeSingle: function(id){
	var selectedLists = this.state.selectedLists;
	if(this.refs[id].getDOMNode().checked){
		selectedLists.push(id);
	} else {
		selectedLists = selectedLists.filter(function(i){return i !== id;});
	}
	this.setState({selectedLists: selectedLists});
},
  render: function() {

  	var self = this;
  	var filteredClients = clients.filter(function(c){
  		return self.state.filter === "" || isMatchForFilter(c, self.state.filter);
  	}).map(function(c){
		return {id: c.id, name: [c.firstName, c.lastName].join(" "), email: c.emailAddress};
	});
	
	var clientValues = {id: null, firstName: "", lastName: "", emailAddress: "", lists: [], publications: []};
	if(this.state.selectedClient){
		clientValues.id = this.state.selectedClient.id;
		clientValues.firstName = this.state.changes.firstName || this.state.selectedClient.firstName || "";
		clientValues.lastName = this.state.changes.lastName || this.state.selectedClient.lastName || "";
		clientValues.emailAddress = this.state.changes.emailAddress || this.state.selectedClient.emailAddress || "";
	}
	
	var listCopy = lists.map(function(l){
		return {id: l.id, name: l.name, selected: (clientValues.lists.indexOf(l.id) !== -1)};
	});
	
	var selectedListsLookup = this.state.selectedLists.reduce(function(lookup, lst){
		lookup[lst] = true;
		return lookup;
	}, {});

    return (
        <div className="row">
          <div className="col-md-6">
			<Container title="My Clients" class="clientManagePanel">
				<SearchBar onChange={this.onSearchChange} />
				<RadioList source={filteredClients} selected={clientValues.id} onSelectionChange={this.onSelectedClientChange}/>
			</Container>
          </div>
          <div className="col-md-6">
			<Container title="Client Details">
				<div className="row">
					<div className="col-md-6">
						<label htmlFor="inpFirstName form-group">First Name</label>
						<input type="text" id="inpFirstName" ref="firstName" className="form-control" aria-label="..." onChange={this.onClientDetailChange.bind(this, "firstName")} value={clientValues.firstName}/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inpLastName form-group">Last Name</label>
						<input type="text" id="inpLastName" ref="lastName" className="form-control" aria-label="..." onChange={this.onClientDetailChange.bind(this, "lastName")} value={clientValues.lastName} />
					</div>
				</div>
				<div className="clearfix"></div><br />
					<div className="row">
					<div className="col-md-12 form-group">
						<label htmlFor="inpEmailAddress">Email Address</label>
						<input type="text" id="inpEmailAddress" ref="emailAddress" className="form-control" aria-label="..." onChange={this.onClientDetailChange.bind(this, "emailAddress")} value={clientValues.emailAddress} />
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
				<div>
					{lists.map(function(i){
						var checked = "";
						if(selectedListsLookup[i.id]){;
							checked = "checked";
						}
						return (<div className="row" key={i.id}>
							<div className="col-md-1"><input type="checkbox" ref={i.id} checked={checked} onChange={self.onChangeSingle.bind(self,i.id)} /></div>
							<div className="col-md-5">{i.name} </div>
							<div className="col-md-6">{i.email}</div>
						</div>)
					})}
					</div>
			</Container>
			<Container title="Subscriptions">
				<CheckListPlus data={subscriptions} selected={this.state.selectedPublications} onChange={this.onSelectedPublicationsChange}/>
			</Container>
			<div className="row">
				<div className="col-md-12 text-center">
					<button className="btn btn-primary" onClick={this.onSave}>Save</button>
				</div>
			</div>
		</div>
    </div>
    );
  }
});

//<ItemList items={listCopy} onChange={this.onSelectedListsChange}/>
module.exports = ClientLists;
