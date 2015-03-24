var React = require('react');
var Shared = require('../Shared/Shared');
var ItemList = Shared.ItemList;
var EditableList = require("../Shared/EditableList");
var CheckListPlus = Shared.CheckListPlus;
var Container =  require('../Shared/Container');


var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="glyphicon glyphicon-search" />
        </div>)
    }
});
var lists = require("../../data/lists");
var clients = require("../../data/clients");

// var members = [
//   { id:1, title: "John Smith", email: "jsmith@gmail.com" },
//   { id:2, title: "Sue James", email: "sjames@gmail.com" },
//   { id:3, title: "Joe Jones", email: "jjones@gmail.com" },
//   { id:4, title: "Fiona Chapman", email: "fchapman@gmail.com" },
//   { id:5, title: "Lilly Kennedy", email: "lkennedy@gmail.com" },
//   { id:6, title: "Bradford Hill", email: "bhill@gmail.com" },
//   { id:7, title: "Erika Saarland", email: "esaarland@gmail.com" },
//   { id:8, title: "Peter Paulson", email: "ppaulson@gmail.com" },
//   { id:9, title: "Thomas Neal", email: "tneal@gmail.com" },
//   { id:10, title: "Jim Barber", email: "jbarber@gmail.com" },
//   { id:11, title: "Tina Smothers", email: "tsmothers@gmail.com" },
//   { id:12, title: "Billy June", email: "bjune@gmail.com" },
//   { id:13, title: "John Jacobs", email: "jjacobs@gmail.com" },
//   { id:14, title: "Joe Cobbs", email: "jcobbs@gmail.com" },
//   { id:15, title: "Dexter Dodgers", email: "ddodgers@gmail.com" },
//   { id:16, title: "Parker Peeps", email: "ppeeps@gmail.com" },
//   { id:17, title: "Valerie Watts", email: "vwatts@gmail.com" },
//   { id:18, title: "Vann Johnson", email: "vjohnson@gmail.com" },
//   { id:19, title: "Chris Michaels", email: "cmichaels@gmail.com" },
//   { id:20, title: "Brittany Johns", email: "bjohns@gmail.com" },
//   { id:21, title: "Jeff Woods", email: "jwoods@gmail.com" },
//   { id:22, title: "Kevin Woodard", email: "kwoodard@gmail.com" }
// ];
var members = clients.map(function(m){
	return {id: m.id, name: [m.firstName, m.lastName].join(" "), email: m.emailAddress};
});

var ListSubs = React.createClass({
  onSelectedListsChange: function(e){
	this.setState({selectedList: e[0], editedName: null});

  },
  onNameChange: function(v){
  	this.setState({editedName: this.refs.groupName.getDOMNode().value});
  },
  deleteList: function(){
  	if(this.state.selectedList && this.state.selectedList.id !== "all"){
  		var selected = this.state.selectedList;
  		var lists = this.state.lists.filter(function(l){return l.id !== selected.id;});
  		this.setState({lists: lists});
  	}
  },
  renameList: function(){
  	if(this.state.selectedList && this.state.selectedList.id !== "all"){
  		var edited = this.state.editedName;
  		if(edited != null && edited != ''){
  			var selected = this.state.selectedList;
  			var matched = this.state.lists.filter(function(l){return l.id === selected.id;})[0];
  			matched.title = edited;
  			this.setState({lists: this.state.lists});
  		}
  	}
  },
  addList: function(){  	
	var edited = this.state.editedName;
	if(edited != null && edited != ''){
		this.state.lists.push({id: (new Date()).getTime(), name: edited});
		this.setState({lists: this.state.lists, editedName: null});
	}
  },
  getInitialState: function(){
  	var state = {};
  	state.selectedList = lists[0];
  	state.lists = lists;
  	return state;
  },
  render: function() {
  	var self = this;
  	var selectedName = "";
  	if(this.state.selectedList){
  		selectedName = this.state.selectedList.name;
  	}
  	if(this.state.editedName != null){
  		selectedName = this.state.editedName;
  	}

  	var groupOperationClasses = "btn btn-default";
  	var groupAttr = "";
  	if(this.state.selectedList && this.state.selectedList.id === "all"){
  		groupOperationClasses += "disabled";
  		groupAttr += "disabled";
  		selectedName = "";
  	}

  	//TODO generate from central data store.
  	var selected = clients.filter(function(m){
  		return self.state.selectedList == null || m.lists.indexOf(self.state.selectedList.id) !== -1;
  	}).map(function(m){
  		return m.id;
  	});  	
  	
  	console.log(selected);
  	
    return (
        <div>
          <div className="col-md-6 listsSubsMainContent">
            <Container title="My Lists">
              <ItemList items={this.state.lists} onChange={this.onSelectedListsChange}/>
            </Container>
				<div className="row group-btns">
					<div className="col-md-6">
						<button disabled={groupAttr} className={groupOperationClasses} onClick={this.deleteGroup}>Delete Group </button>
					</div>
              		<div className="col-md-6">
              			<button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Rename Group </button>
              		</div>
            	</div>
  					<div className="row group-btns">
  						<div className="col-md-6">
  							<input type="text" className="form-control" disabled={groupAttr} ref="groupName" value={selectedName} onChange={this.onNameChange}/>
  						</div>
              			<div className="col-md-6">
              				<button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Add New Group </button>
              			</div>
            		</div>
        		</div>
        		<div className="col-md-6">
              	<Container title="List Memebers">
		        		<EditableList source={members} selected={selected} />
        		</Container>
        	</div>
        </div>
    );
  }

});

module.exports = ListSubs;
