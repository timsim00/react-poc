var React = require('react');
var Shared = require('../Shared/Shared');

//data
var items = [
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


//components
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;

var ClientLists = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>Manage Client Lists</h2>
          </div>
          <div className="col-md-6">
              Search for Contact <SearchBar/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>My Contacts</h4>
            <ItemList items={items}/>
          </div>
          <div className="col-md-6">
            <div>
              <button className="btn btn-primary">Upload New Clients</button><br />
              <small>Upload new contacts from your desktop using a “delimited” file</small>
            </div>
            <div>
              <button className="btn btn-primary">Create New List</button><br />
              <small>Create new Group to associate clients together. This will remain in the platform unless deleted</small>
            </div>
            <div>
              <button className="btn btn-primary">Add to Existing List</button><br />
              <small>Add contact to existing Group.</small>

            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ClientLists;
