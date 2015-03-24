var React = require('react');
var Shared = require('../Shared/Shared');
var ItemList = Shared.ItemList;
var CheckListPlus = Shared.CheckListPlus;
var EditableList = require("../Shared/EditableList");
var publications = require("../../data/publications");
var Container =  require('../Shared/Container');

var clients = require("../../data/clients");
var members = clients.map(function(m){
	return {id: m.id, name: [m.firstName, m.lastName].join(" "), email: m.emailAddress};
});

var ListSubs = React.createClass({
  onSelectedPublicationChange: function(e){
	this.setState({selectedPublication: e[0]});

  },
  getInitialState: function(){
  	var state = {};
  	return state;
  },
  render: function() {
  	var self = this;
  	var selected = []; 
  	if(this.state.selectedPublication){
		selected = clients.filter(function(m){
			return m.publications.indexOf(self.state.selectedPublication.id) !== -1;
		}).map(function(m){
			return m.id;
		});  	
  	}

	var selectedPublicationIds = this.state.selectedPublication? [this.state.selectedPublication.id] : [];

    return (
        	<div className="listsSubsMainContent">
        		<div className="col-md-6">
              <Container title="Subscriptions">
                <CheckListPlus data={publications} selected={selectedPublicationIds} onChange={this.onSelectedPublicationChange}/>
              </Container>
        		</div>
        		<div className="col-md-6">
              <Container title="Subscription Clients">
                <EditableList source={members} selected={selected} />
              </Container>
        		</div>
        	</div>
    );
  }

});

module.exports = ListSubs;
