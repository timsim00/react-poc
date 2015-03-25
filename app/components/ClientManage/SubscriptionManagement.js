var React = require('react');
var Shared = require('../Shared/Shared');
var RadioList = Shared.RadioList;
var CheckListPlus = Shared.CheckListPlus;
var EditableList = require("../Shared/EditableList");
var publications = require("../../data/publications").map(function(p){
	return {id: p.id, content: <div className="col-md-11"><div>{p.name}</div><div>{p.description}</div></div> };
});
var Container =  require('../Shared/Container');

var clients = require("../../data/clients");
var members = clients.map(function(m){
	return {id: m.id, name: [m.firstName, m.lastName].join(" "), email: m.emailAddress};
});

var ListSubs = React.createClass({
  onSelectedPublicationChange: function(selectedPublicationId){
  	var selectedPublication;
  	if(selectedPublicationId){
  		selectedPublication = publications.filter(function(p){return p.id === selectedPublicationId;})[0];
  	}
	this.setState({selectedPublication: selectedPublication});

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

	var selectedPublicationId = this.state.selectedPublication? this.state.selectedPublication.id : null;

    return (
        	<div className="listsSubsMainContent">
        		<div className="col-md-6">
              <Container title="Email Subscriptions">
                <RadioList source={publications} selected={selectedPublicationId} onSelectionChange={this.onSelectedPublicationChange}/>
              </Container>
        		</div>
        		<div className="col-md-6">
                	<EditableList source={members} selected={selected} title="Subscription Clients"/>
        		</div>
        	</div>
    );
  }

});

module.exports = ListSubs;
