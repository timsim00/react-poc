var React = require('react'),
    Router = require('react-router'),
    moment = require('moment'),
    _ = require('lodash');

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
var lists = require('../../data/lists');
var clients = require('../../data/clients');

var Overview = React.createClass({
  getInitialState: function() {
    var result = {};

    var sortedEmails = this.props.emails.sort(function(a,b){
      return moment(b.modifiedDate).unix() - moment(a.modifiedDate).unix();
    });
    var sortedSends = this.props.sends.sort(function(a,b){
      return moment(b.sentDate).unix() - moment(a.sentDate).unix();
    });

    _.map(sortedEmails, function(obj) {
      obj.createDate = moment(obj.createDate).format("M/D/YY h:MM A");
      obj.modifiedDate = moment(obj.modifiedDate).format("M/D/YY h:MM A");
    });

    _.map(sortedSends, function(obj) {
      obj.sentDate = moment(obj.sentDate).format("M/D/YY h:MM A");
    });

    var emailHash = _.reduce(sortedEmails, function(memo, extended, key){
      memo[extended.id] = extended;
      return memo;
    }, {});

    var sortedSendDetails = _.map(sortedSends, function(base){
        return _.extend(base, emailHash[base.email]);
    });

    var pageData = {
        pageIndex: 0,
        pageSize: 25,
        items: 2,
        pageSizeOptions: [25,50]
    };

    var emailCols = [
      {data:"name", col:"Name"},
      {data:"subject", col:"Subject"},
      {data:"createDate", col:"Created"},
      {data:"modifiedDate", col:"Last Modified"}
    ];

    var sendCols = [
      {data:"name", col:"Email Name"},
      {data:"subject", col:"Subject"},
      {data:"sentDate", col:"Sent On"},
      {data:"status", col:"Status"},
      {data:"subscribers", col:"Clients"},
      {data:"opens", col:"Opens"},
      {data:"clicks", col:"Clicks"},
      {data:"bounces", col:"Bounced"},
    ]

    result.emails = {"rows":sortedEmails, "columns": emailCols, "pageData": pageData};
    result.sends = {"rows":sortedSendDetails, "columns": sendCols, "pageData": pageData};

    result.lastModified = sortedEmails[0];
    result.lastSend = sortedSendDetails[0];

    return result;
  },
  render: function() {
    return (
      <div>
        <div className="row pageTitle">
          <div className="col-md-6"><h2>Dashboard</h2></div>
          <div className="col-md-6 text-right">
            <Link to="create-email" className="btn btn-default">
              <span className="glyphicon glyphicon-plus" />
              &nbsp;Send Email
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 detail-box">
            <MostRecentSend email={this.state.lastSend} />
          </div>
          <div className="col-md-4 detail-box">
            <MostRecentModify email={this.state.lastModified} />
          </div>
          <div className="col-md-4 detail-box">
            <SubscriberOverview/>
          </div>
        </div>
        <div>
          <OverviewTabs emails={this.state.emails} sends={this.state.sends} />
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
          <EmailPreview data={this.props.email} />
        </div>
        <div className="col-md-9">
          <EmailDetails data={this.props.email} />
          <TrackingDetails data={this.props.email} />
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
          <EmailPreview data={this.props.email} />
        </div>
        <div className="col-md-9">
          <EmailDetails data={this.props.email} />
          <LastModifiedDetails data={this.props.email} />
        </div>
        <div className="clearfix"></div>
    </Container>
    );
  }
});

var SubscriberOverview = React.createClass({
  render: function() {
    return (
    <Container title="Clients" class="subscriber-overview">
      <div className="col-md-6">
        <ListCount data={lists} />
      </div>
      <div className="col-md-6">
        <SubscriberCount data={clients} />
      </div>
      <div className="clearfix"></div>
      <div className="row" id="subscriber-buttons">
        <div className="pull-right">
        	 <Link to="client-management" className="btn btn-sm btn-primary btn-xs">Manage Clients</Link>
        </div>
      </div>
    </Container>
    );
  }
});

var OverviewTabs = React.createClass({
  getInitialState: function(){
    var state = {filter: "", openTab:"email", emails:this.props.emails, sends:this.props.sends};
    return state;
  },
  changeTabs: function(c){
    this.setState({openTab: c});
  },
  onSearchChange: function(filter) {

    var filteredEmails = _.filter(this.props.emails.rows, function(obj){
      var name = obj.name.toLowerCase();
      var subject = obj.subject.toLowerCase();
      filter = filter.toLowerCase();
      if (name.indexOf(filter) !== -1 || subject.indexOf(filter) !== -1) {
        return obj;
      }
      return;
    });

    this.setState({emails : {rows:filteredEmails ,columns:this.state.emails.columns ,pageData:this.state.emails.pageData}});

    var filteredSends = _.filter(this.props.sends.rows, function(obj){
      var name = obj.name.toLowerCase();
      var subject = obj.subject.toLowerCase();
      filter = filter.toLowerCase();
      if (name.indexOf(filter) !== -1 || subject.indexOf(filter) !== -1) {
        return obj;
      }
      return;
    });
    this.setState({sends : {rows:filteredSends ,columns:this.state.sends.columns ,pageData:this.state.sends.pageData}});
  },
  render: function() {
    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          <li className="active"><a href="#email" data-toggle="tab" onClick={this.changeTabs.bind(this,"emails")}>Emails</a></li>
          <li><a href="#sends" data-toggle="tab" onClick={this.changeTabs.bind(this, "sends")}>Sends</a></li>
        </ul>
        <br/>
        <div className="row">
         <div id="searchbar" className="col-md-3">
           <SearchBar onChange={this.onSearchChange} />
         </div>
        </div>
        <br/>
        <div className="tab-content well">
          <div className="tab-pane active" id="email"><GridView data={this.state.emails} /></div>
          <div className="tab-pane" id="sends"><GridView data={this.state.sends} /></div>
        </div>

      </div>
    );
  }
});

module.exports = Overview;
