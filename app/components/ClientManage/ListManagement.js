var React = require('react');
var Shared = require('../Shared/Shared');
var ItemList = Shared.ItemList;
var EditableList = require("../Shared/EditableList");

var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="glyphicon glyphicon-search" />
        </div>)
    }
});
var lists = require("../../data/lists");
// var lists = [
// 	{id: "all", title: "ALL MY CLIENTS"},
// 	{id: "cf", title: "College Friends"},
// 	{id: "ic", title: "International Clients"},
// 	{id: "ciir", title: "Clients Interested in Retirement"},
// 	{id: "ccm", title: "Country Club members"},
// 	{id: "mtc", title: "Matt's Top Clients"}
// ];


var members = [
  { id:1, title: "John Smith", email: "jsmith@gmail.com" },
  { id:2, title: "Sue James", email: "sjames@gmail.com" },
  { id:3, title: "Joe Jones", email: "jjones@gmail.com" },
  { id:4, title: "Fiona Chapman", email: "fchapman@gmail.com" },
  { id:5, title: "Lilly Kennedy", email: "lkennedy@gmail.com" },
  { id:6, title: "Bradford Hill", email: "bhill@gmail.com" },
  { id:7, title: "Erika Saarland", email: "esaarland@gmail.com" },
  { id:8, title: "Peter Paulson", email: "ppaulson@gmail.com" },
  { id:9, title: "Thomas Neal", email: "tneal@gmail.com" },
  { id:10, title: "Jim Barber", email: "jbarber@gmail.com" },
  { id:11, title: "Tina Smothers", email: "tsmothers@gmail.com" },
  { id:12, title: "Billy June", email: "bjune@gmail.com" },
  { id:13, title: "John Jacobs", email: "jjacobs@gmail.com" },
  { id:14, title: "Joe Cobbs", email: "jcobbs@gmail.com" },
  { id:15, title: "Dexter Dodgers", email: "ddodgers@gmail.com" },
  { id:16, title: "Parker Peeps", email: "ppeeps@gmail.com" },
  { id:17, title: "Valerie Watts", email: "vwatts@gmail.com" },
  { id:18, title: "Vann Johnson", email: "vjohnson@gmail.com" },
  { id:19, title: "Chris Michaels", email: "cmichaels@gmail.com" },
  { id:20, title: "Brittany Johns", email: "bjohns@gmail.com" },
  { id:21, title: "Jeff Woods", email: "jwoods@gmail.com" },
  { id:22, title: "Kevin Woodard", email: "kwoodard@gmail.com" }
];

var ChecklistPlus = React.createClass({
  render: function() {
    return (
        <div className="checkLst well">
          {this.props.data.map(function(datum, index){
              var chkbxId = "chk_"+index;
              return (<div className="form-group" key={index}>
                  <label>
                  <input id={chkbxId} type="checkbox" />
                      <div className="item">
                          <div>{datum.title}</div>
                          <div className="itemInner">{datum.content}</div>
                      </div>
                      <div className="actions">
                          <SearchButton />
                      </div>
                  </label>
              </div>);
          })}
    </div>
    );
  }
});


var ListSubs = React.createClass({
  onSelectedListsChange: function(e){
	this.setState({selectedList: e[0], editedName: null});

  },
  onNameChange: function(v){
  	this.setState({editedName: this.refs.groupName.getDOMNode().value});
  },
  deleteGroup: function(){
  	if(this.state.selectedList && this.state.selectedList.id !== "all"){
  		var selected = this.state.selectedList;
  		var lists = this.state.lists.filter(function(l){return l.id !== selected.id;});
  		this.setState({lists: lists});
  	}
  },
  renameGroup: function(){
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
  getInitialState: function(){
  	var state = {};
  	state.selectedList = null;
  	state.lists = lists;
  	return state;
  },
  render: function() {
  	var selectedName = "";
  	if(this.state.selectedList){
  		selectedName = this.state.selectedList.title;
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
  	var selected = [1,4,5,7,9,11,15];
  	
    return (
        
        <div>
	        <h2>List Management</h2>
        	<div className="listsSubsMainContent container">
        		<div className="col col-md-6">
        			<div className="row">
        				<h3>Manage My Lists</h3>
        				<div className="manage-lists well">
        					<ItemList items={this.state.lists} onChange={this.onSelectedListsChange}/>
        				</div>
        			</div>
					<div className="row group-btns">
						<div className="col-md-6"><button disabled={groupAttr} className={groupOperationClasses} onClick={this.deleteGroup}>Delete Group </button></div>
						<div className="col-md-6"><button className="btn btn-default">Manage Group </button></div>
					</div>
					<div className="row group-btns">
						<div className="col-md-6"><button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Rename Group </button></div>
						<div className="col-md-6"><input type="text" disabled={groupAttr} ref="groupName" value={selectedName} onChange={this.onNameChange}/></div>
					</div>
        		</div>
        		<div className="col col-md-6">
        			<div className="row">
        				<h3>  Members </h3>
        				<div className="members well">
		        			<EditableList source={members} selected={selected} />
	        			</div>
        			</div>
        		</div>
        	</div>
        </div>
    );
  }

});

module.exports = ListSubs;
