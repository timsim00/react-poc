var React = require('react');
var Shared = require('../Shared/Shared');
var RadioList = Shared.RadioList;
var EditableList = require("../Shared/EditableList");
var CheckListPlus = Shared.CheckListPlus;
var Container =  require('../Shared/Container');


var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="fa fa-eye" />
        </div>)
    }
});

var lists = require("../../data/lists");
var clients = require("../../data/clients");


var members = clients.map(function(m){
	return {id: m.id, name: [m.firstName, m.lastName].join(" "), email: m.emailAddress};
});

var ListSubs = React.createClass({
  onSelectedListsChange: function(selectedListId){
  	var selectedList;
  	if(selectedListId){
  		selectedList = this.state.lists.filter(function(l){return l.id === selectedListId;})[0];
  	}
	this.setState({selectedList: selectedList, editedName: null});

  },
  onNameChange: function(v){
  	this.setState({editedName: this.refs.groupName.getDOMNode().value});
  },
  deleteList: function(){
  	if(this.state.selectedList){
  		var selected = this.state.selectedList;
  		var lists = this.state.lists.filter(function(l){return l.id !== selected.id;});
  		this.setState({lists: lists});
  	}
  },
  renameList: function(){
  	if(this.state.selectedList){
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
  	state.selectedList = null;
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

  	var selected = [];
  	var selectedId = null;
  	if(this.state.selectedList){
  		selectedId = this.state.selectedList.id;
		selected = clients.filter(function(m){
			return m.lists.indexOf(self.state.selectedList.id) !== -1;
		}).map(function(m){
			return m.id;
		});
  	}

    return (
        <div>
          <div className="col-md-6 listsSubsMainContent">
            <Container title="My Lists">
              <RadioList source={this.state.lists} selected={selectedId} onSelectionChange={this.onSelectedListsChange}/>
            </Container>
				<div className="row group-btns">
					<div className="col-md-6">
						<button disabled={groupAttr} className={groupOperationClasses} onClick={this.deleteGroup}>Delete List </button>
					</div>
              		<div className="col-md-6">
              			<button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Rename List </button>
              		</div>
            	</div>
  					<div className="row group-btns">
  						<div className="col-md-6">
  							<input type="text" className="form-control" disabled={groupAttr} ref="groupName" value={selectedName} onChange={this.onNameChange}/>
  						</div>
              			<div className="col-md-6">
              				<button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Add New List </button>
              			</div>
            		</div>
        		</div>
        		<div className="col-md-6">
					<EditableList source={members} selected={selected} title="List Members"/>
				</div>
			</div>
    );
  }

});

module.exports = ListSubs;
