var React = require('react');
var Shared = require('../Shared/Shared');
var SearchBar = Shared.SearchBar;

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
