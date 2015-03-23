var React = require('react');
var Shared = require('../Shared/Shared');

//data
var items = [
  { id: 1, title: "John Smith", email: "jsmith@gmail.com" },
  { id: 2, title: "Sue James", email: "sjames@gmail.com" },
  { id: 3, title: "Joe Jones", email: "jjones@gmail.com" },
  { id: 4, title: "Fiona Chapman", email: "fchapman@gmail.com" },
  { id: 5, title: "Lilly Kennedy", email: "lkennedy@gmail.com" },
  { id: 6, title: "Bradford Hill", email: "bhill@gmail.com" },
  { id: 7, title: "Erika Saarland", email: "esaarland@gmail.com" },
  { id: 8, title: "Peter Paulson", email: "ppaulson@gmail.com" },
  { id: 9, title: "Thomas Neal", email: "tneal@gmail.com" },
  { id: 10, title: "Jim Barber", email: "jbarber@gmail.com" },
  { id: 11, title: "Tina Smothers", email: "tsmothers@gmail.com" },
  { id: 12, title: "Billy June", email: "bjune@gmail.com" },
  { id: 13, title: "John Jacobs", email: "jjacobs@gmail.com" },
  { id: 14, title: "Joe Cobbs", email: "jcobbs@gmail.com" },
  { id: 15, title: "Dexter Dodgers", email: "ddodgers@gmail.com" },
  { id: 16, title: "Parker Peeps", email: "ppeeps@gmail.com" },
  { id: 17, title: "Valerie Watts", email: "vwatts@gmail.com" },
  { id: 18, title: "Vann Johnson", email: "vjohnson@gmail.com" },
  { id: 19, title: "Chris Michaels", email: "cmichaels@gmail.com" },
  { id: 20, title: "Brittany Johns", email: "bjohns@gmail.com" },
  { id: 21, title: "Jeff Woods", email: "jwoods@gmail.com" },
  { id: 22, title: "Kevin Woodard", email: "kwoodard@gmail.com" }
];


//components
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;

//TEMP DATA
var lists = [
	{id: "all", title: "ALL MY CLIENTS"},
	{id: "cf", title: "College Friends"},
	{id: "ic", title: "International Clients"},
	{id: "ciir", title: "Clients Interested in Retirement"},
	{id: "ccm", title: "Country Club members"},
	{id: "mtc", title: "Matt's Top Clients"}
];

//TEMP DATA
var subscriptions = [
    {
    	id:1,
        title: "Market Insights - Monthly",
        content: "Monthly publication to share MS view on Market Conditions"
    },
    {
    	id:2,
        title: "Global Investment Committee Weekly",
        content: "Weekly publication from the MS Investment Committee on GlobalMarkets"
    },
    {
    	id:3,
        title: "Retirement Planning Today - Monthly",
        content: "Retirement updates on a Monthly and Semi-Monthy Basis"
    },
    {
    	id:4,
        title: "World Point of View - Weekly",
        content: "MS View of the World-wide Markets"
    },
    {
    	id:5,
        title: "Investor Advisors Daily - Daily",
        content: "Daily updates from the MS Advisor Team on Investment Conditions"
    },
    {
    	id:6,
        title: "On the Market",
        content: "Daily Advice and Predictions on the Market for the day"
    }
];

var ClientLists = React.createClass({
  onSelectedListsChange: function(lists){
  	console.log(lists);
  },
  render: function() {
    return (
      <div>
      	<h2>Manage Client Lists</h2>
        <div className="row">
          <div className="col-md-6">
             <div className="row">
              	<div className="col-md-3">Search for Contact</div>
              	<div className="col-md-9"><SearchBar/></div>
          	</div>
            <div className="row well" id="myContactsPanel">
              <ItemList items={items}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
            	<button className="btn btn-primary">Upload New Clients</button>
                <div className="small">Upload new contacts from your desktop using a “delimited” file</div>
            </div>
            <div className="row">
              <h3> Lists </h3>
              <div className="well">
	              <ItemList items={lists} onChange={this.onSelectedListsChange}/>
              </div>
            </div>
            <div className="row">
              Subscriptions
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ClientLists;
