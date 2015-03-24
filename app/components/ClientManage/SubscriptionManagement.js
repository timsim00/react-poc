var React = require('react');
var Shared = require('../Shared/Shared');
var ItemList = Shared.ItemList;
var CheckListPlus = Shared.CheckListPlus;
var EditableList = require("../Shared/EditableList");
var subscriptions = require("../../data/publications");
var Container =  require('../Shared/Container');


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

var ListSubs = React.createClass({
  onSelectedListsChange: function(e){
	this.setState({selectedList: e[0], editedName: null});

  },
  getInitialState: function(){
  	var state = {};
  	return state;
  },
  render: function() {
  	//TODO generate from central data store.
  	var selected = [1,2,5,7,8,16,19, 22];

    return (
        	<div className="listsSubsMainContent">
        		<div className="col-md-6">
              <Container title="Subscriptions">
                <CheckListPlus data={subscriptions}/>
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
