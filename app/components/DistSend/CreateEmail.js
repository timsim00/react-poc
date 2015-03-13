var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

//components

var SearchBar = require('../Shared/Shared').SearchBar;
var FolderTree = require('../Shared/FolderTree');


var folders = [
    {
        name: "Shared Emails",
        folders: [
            {
                name: "Newsletters",
                folders: [
                    {name: "Retirement"},
                    {name: "Mortgage"}
                 ]
            },
            {name: "Webinars"},
            {name: "Whitepapers"},
            {name: "Series 7 Approved"},
    ]},
    { name: "Shared Templates"}
];


var CreateEmail = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row col-md-12">
          <h2>CreateEmail</h2>
        </div>
        <div className="row col-md-12">
          <h2>wizard</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div>
              <ContentCategories />
            </div>
            <div>
              <FilterByType/>
            </div>
          </div>
          <div className="col-md-8">
              <EmailSelect/>
          </div>
        </div>
      </div>

    );
  }

});

var ContentCategories = React.createClass({
  render: function() {
    return (
    <div>
      <h4>Content Categories</h4>
      <SearchBar />
      <div className="well">
        <FolderTree folders={folders} />
      </div>
    </div>
    );
  }

});

var FilterByType = React.createClass({
  render: function() {
    return (
    <div>
      <h4>Filter By Type</h4>
      <div className="well">

      </div>
    </div>
    );
  }

});


var EmailSelect = React.createClass({
  render: function() {
    return (
    <div>
      <h4>Retirement</h4>
      <div className="well">

      </div>
    </div>
    );
  }

});

module.exports = CreateEmail;
