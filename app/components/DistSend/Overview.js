var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

//components
var Shared = require('../Shared/Shared');
var SearchBar = Shared.SearchBar;
var EmailPreview = Shared.EmailPreview;
var EmailDetails = Shared.EmailDetails;
var TrackingDetails = Shared.TrackingDetails;
var LastModifiedDetails = Shared.LastModifiedDetails;
var ListCount = Shared.ListCount;
var SubscriberCount = Shared.SubscriberCount;
var GridView = require('../Shared/GridView');



var recentSendData = {
    "subject": "Did you forget something?",
    "name": "Abandoned Cart - Low Value"
}

var recentModifiedData = {
    "subject": "Check out our latest news",
    "name": "Sample Email 1"
}

var dates = {
    "created": "2/20/15 12:06 PM",
    "modified": "3/1/15 10:32 AM"
}

var Overview = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6"><h2>Overview</h2></div>
          <div className="col-md-6 text-right"><Link to="create-email" className="btn btn-default">Create Email</Link></div>
        </div>
        <div className="row">
          <div className="col-md-4 detail-box">
            <MostRecentSend/>
          </div>
          <div className="col-md-4 detail-box">
            <MostRecentModify/>
          </div>
          <div className="col-md-4 detail-box">
            <SubscriberOverview/>
          </div>
        </div>
        <div>
          <OverviewTabs/>
        </div>
      </div>
    );
  }

});


var MostRecentSend = React.createClass({
  render: function() {
    return (
    <div>
    <h4>Most Recent Send</h4>
      <div className="well">
        <div className="col-md-3">
          <EmailPreview/>
        </div>
        <div className="col-md-9">
          <EmailDetails data={recentSendData}/>
          <TrackingDetails/>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
    );
  }
});


var MostRecentModify = React.createClass({
  render: function() {
    return (
    <div>
    <h4>Most Recent Modified Email</h4>
      <div className="well">
        <div className="col-md-3">
          <EmailPreview/>
        </div>
        <div className="col-md-9">
          <EmailDetails data={recentModifiedData}/>
          <LastModifiedDetails data={dates}/>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
    );
  }
});

var SubscriberOverview = React.createClass({
  render: function() {
    return (
    <div>
    <h4>Subscribers</h4>
    <div className="well">
      <div className="col-md-6">
        <ListCount/>
      </div>
      <div className="col-md-6">
        <SubscriberCount/>
      </div>
      <div className="clearfix"></div>
      <div className="pull-right">
      
      	 <button className="btn btn-sm btn-primary">Manage Subscribers</button>
      	  <div className="btn-group">
      	  	  <button className="btn btn-sm btn-primary">Add Subscribers </button>
			  <button type="button" className="btn btn-sm btn-primary dropdown-toggle" aria-expanded="false">
				<span className="caret"></span>
			  </button>
		  </div>
      </div>
    </div>
    </div>
    );
  }
});

var OverviewTabs = React.createClass({
  render: function() {
    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          <li className="active"><a href="#email" data-toggle="tab">Emails</a></li>
          <li><a href="#sends" data-toggle="tab">Sends</a></li>
        </ul>
        <div className="row">
         <div className="col-md-3">
          <SearchBar/>
         </div>
        </div>
        <div className="tab-content well">
          <div className="tab-pane active" id="email"><GridView/></div>
          <div className="tab-pane" id="sends"><GridView/></div>
        </div>

      </div>
    );
  }
});

module.exports = Overview;
