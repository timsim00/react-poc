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
var Container =  require('../Shared/Container');

//data
var data = require('../../data');

var EmailGridData = data.emailData;
EmailGridData.pageData = {
    pageIndex: 0,
    pageSize: 25,
    items: 2,
    pageSizeOptions: [25,50]
}

var SendsGridData = data.sendsData;
SendsGridData.pageData = {
    pageIndex: 0,
    pageSize: 25,
    items: 2,
    pageSizeOptions: [25,50]
}

var recentSendData = data.recentSendData;
var recentModifiedData = data.recentModifiedData;


var Overview = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row pageTitle">
          <div className="col-md-6"><h2>Overview</h2></div>
          <div className="col-md-6 text-right">
            <Link to="content-admin" className="btn btn-default">
              <span className="glyphicon glyphicon-pencil" />
              &nbsp;Content Admin
            </Link>&nbsp;&nbsp;
            <Link to="create-email" className="btn btn-default">
              <span className="glyphicon glyphicon-plus" />
              &nbsp;Create Email
            </Link>
          </div>
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
    <Container title="Most Recent Send">
        <div className="col-md-3">
          <EmailPreview/>
        </div>
        <div className="col-md-9">
          <EmailDetails data={recentSendData}/>
          <TrackingDetails/>
        </div>
        <div className="clearfix"></div>
    </Container>
    );
  }
});


var MostRecentModify = React.createClass({
  render: function() {
    return (
    <Container title="Recent Modified Email">
        <div className="col-md-3">
          <EmailPreview/>
        </div>
        <div className="col-md-9">
          <EmailDetails data={recentModifiedData}/>
          <LastModifiedDetails data={recentModifiedData.dates}/>
        </div>
        <div className="clearfix"></div>
    </Container>
    );
  }
});

var SubscriberOverview = React.createClass({
  render: function() {
    return (
    <Container title="Subscribers" class="subscriber-overview">
      <div className="col-md-6">
        <ListCount/>
      </div>
      <div className="col-md-6">
        <SubscriberCount/>
      </div>
      <div className="clearfix"></div>
      <div className="row" id="subscriber-buttons">
        <div className="pull-right">
        	 <button className="btn btn-sm btn-primary btn-xs">Manage Subscribers</button>&nbsp;
        	  <div className="btn-group">
        	  	  <button className="btn btn-sm btn-primary btn-xs">Add Subscribers</button>
  			        <button type="button" className="btn btn-xs btn-primary dropdown-toggle" aria-expanded="false">
  				            <span className="caret"></span>
  			        </button>
  		      </div>
        </div>
      </div>
    </Container>
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
        <br/>
        <div className="row">
         <div className="col-md-3">
          <SearchBar/>
         </div>
        </div>
        <br/>
        <div className="tab-content well">
          <div className="tab-pane active" id="email"><GridView data={EmailGridData} /></div>
          <div className="tab-pane" id="sends"><GridView data={SendsGridData} /></div>
        </div>

      </div>
    );
  }
});

module.exports = Overview;
