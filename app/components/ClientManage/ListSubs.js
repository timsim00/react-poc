var React = require('react');
var Shared = require('../Shared/Shared');
var ItemList = Shared.ItemList;

var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="glyphicon glyphicon-search" />
        </div>)
    }
});

var subscriptions = [
    {
        title: "Market Insights - Monthly",
        content: "Monthly publication to share MS view on Market Conditions"
    },
    {
        title: "Global Investment Committee Weekly",
        content: "Weekly publication from the MS Investment Committee on GlobalMarkets"
    },
    {
        title: "Retirement Planning Today - Monthly",
        content: "Retirement updates on a Monthly and Semi-Monthy Basis"
    },
    {
        title: "World Point of View - Weekly",
        content: "MS View of the World-wide Markets"
    },
    {
        title: "Investor Advisors Daily - Daily",
        content: "Daily updates from the MS Advisor Team on Investment Conditions"
    },
    {
        title: "On the Market",
        content: "Daily Advice and Predictions on the Market for the day"
    }
];

var lists = [
	{id: "all", title: "ALL MY CLIENTS"},
	{id: "cf", title: "College Friends"},
	{id: "ic", title: "International Clients"},
	{id: "ciir", title: "Clients Interested in Retirement"},
	{id: "ccm", title: "Country Club members"},
	{id: "mtc", title: "Matt's Top Clients"}
];


var members = [
  { title: "John Smith", email: "jsmith@gmail.com" },
  { title: "Sue James", email: "sjames@gmail.com" },
  { title: "Joe Jones", email: "jjones@gmail.com" },
  { title: "Fiona Chapman", email: "fchapman@gmail.com" },
  { title: "Lilly Kennedy", email: "lkennedy@gmail.com" },
  { title: "Bradford Hill", email: "bhill@gmail.com" },
  { title: "Erika Saarland", email: "esaarland@gmail.com" },
  { title: "Peter Paulson", email: "ppaulson@gmail.com" },
  { title: "Thomas Neal", email: "tneal@gmail.com" },
  { title: "Jim Barber", email: "jbarber@gmail.com" },
  { title: "Tina Smothers", email: "tsmothers@gmail.com" },
  { title: "Billy June", email: "bjune@gmail.com" },
  { title: "John Jacobs", email: "jjacobs@gmail.com" },
  { title: "Joe Cobbs", email: "jcobbs@gmail.com" },
  { title: "Dexter Dodgers", email: "ddodgers@gmail.com" },
  { title: "Parker Peeps", email: "ppeeps@gmail.com" },
  { title: "Valerie Watts", email: "vwatts@gmail.com" },
  { title: "Vann Johnson", email: "vjohnson@gmail.com" },
  { title: "Chris Michaels", email: "cmichaels@gmail.com" },
  { title: "Brittany Johns", email: "bjohns@gmail.com" },
  { title: "Jeff Woods", email: "jwoods@gmail.com" },
  { title: "Kevin Woodard", email: "kwoodard@gmail.com" }
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
  console.log("Selected Change...");
  console.log(e);
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
  	
  	var groupOperationClasses = "btn btn-primary";
  	var groupAttr = "";
  	if(this.state.selectedList && this.state.selectedList.id === "all"){
  		groupOperationClasses += "disabled";
  		groupAttr += "disabled";
  		selectedName = "";
  	}
  	
  	
    return (
        
        <div>
	        <h2>Lists & Subscriptions</h2>
        	<div className="listsSubsMainContent container">
        		<div className="col col-md-5">
        			<div className="row">
        				<h3>Manage My Lists</h3>
        				<div className="manage-lists well">
        					<ItemList items={this.state.lists} onChange={this.onSelectedListsChange}/>
        				</div>
        			</div>
					<div className="row group-btns">
						<div className="col-md-6"><button disabled={groupAttr} className={groupOperationClasses} onClick={this.deleteGroup}>Delete Group </button></div>
						<div className="col-md-6"><button className="btn btn-primary">Manage Group </button></div>
					</div>
					<div className="row group-btns">
						<div className="col-md-6"><button disabled={groupAttr} className={groupOperationClasses} onClick={this.renameGroup}>Rename Group </button></div>
						<div className="col-md-6"><input type="text" disabled={groupAttr} ref="groupName" value={selectedName} onChange={this.onNameChange}/></div>
					</div>
        			<div className="row">
        				<h3>Subscriptions</h3>
	        			<ChecklistPlus data={subscriptions}/>
        			</div>
        		</div>
        		<div className="col col-md-4">
        			<div className="row">
        			<h3>Members</h3>
						<div className="members well">
							<ItemList items={members} />
						</div>
        			</div>
        			<div className="row">
	        			<button className="btn btn-primary"> View Publication Members </button>
        			</div>
        		</div>
        		<div className="col btn-col col-md-2">
        			<h3>&nbsp;</h3>
        			<div className="row">
        				<button className="btn btn-primary"> Remove from Group</button>
        			</div>
        			<div className="row">
        				<button className="btn btn-primary"> Add to Publication</button>
        			</div>
        			<div className="row">
        				<button className="btn btn-primary"> Remove from Publication</button>
        			</div>
        		</div>
        	</div>
        </div>
    );
  }

});

module.exports = ListSubs;
