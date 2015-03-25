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
  onSelectedPublicationsChange: function(publications){
  	this.state.selectedClient.publications = publications;
  	this.setState({selectedPublications: publications, selectedClient: this.state.selectedClient});
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
  	var state = {selectedLists: [], selectedPublications: [], filter: "", selectedClient:null, changes: {}};
  	return state;
  },
  onSearchChange: function(searchFilter){
  	var newState = {filter: searchFilter};
	if(this.state.selectedClient && !isMatchForFilter(this.state.selectedClient, searchFilter)){
		newState.selectedClient = null;
	}
  	this.setState(newState);
  },
  onClientDetailChange: function(property){
  	var newValue = this.refs[property].getDOMNode().value;
  	this.state.selectedClient[property] = newValue;
	this.setState({selectedClient: this.state.selectedClient});
  },
  onChangeSingle: function(id){
	var selectedLists = this.state.selectedLists;
	if(this.refs[id].getDOMNode().checked){
		selectedLists.push(id);
	} else {
		selectedLists = selectedLists.filter(function(i){return i !== id;});
	}
	this.state.selectedClient.lists = this.state.selectedLists;
	this.setState({selectedLists: selectedLists, selectedClient: this.state.selectedClient});
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

	var clientListTitle = self.state.filter !== ""? "Filtered Clients": "My Clients";

    return (
        <div className="row">
          <div className="col-md-6">
          	<Container title="Search">
				<SearchBar onChange={this.onSearchChange} />          	
          	</Container>
			<Container title={clientListTitle} className="clientManagePanel">
				<div className="client-list">
					<RadioList source={filteredClients} selected={clientValues.id} onSelectionChange={this.onSelectedClientChange}/>
				</div>
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
			<Container title="Email Subscriptions">
				<CheckListPlus data={subscriptions} selected={this.state.selectedPublications} onChange={this.onSelectedPublicationsChange}/>
			</Container>
			<Container title="Upload New Clients">
				<button className="btn btn-primary">Upload</button>
				<div className="small">Upload new contacts from your desktop using a “delimited” file</div>
			</Container>
		</div>
    </div>
    );
  }
});

module.exports = ClientLists;
