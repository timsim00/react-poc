var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route;

var App = require('./App'),
    DistSending = require('./components/DistSend/DistSending'),
    CreateEmail = require('./components/DistSend/CreateEmail'),
    SendEmail = require('./components/DistSend/SendEmail'),
    ContentAdmin = require('./components/DistSend/ContentAdmin'),
    ClientManagement = require('./components/ClientManage/ClientManagement'),
    ClientLookup = require('./components/ClientManage/ClientLookup'),
    ClientLists = require('./components/ClientManage/ClientLists'),
    ListSubs = require('./components/ClientManage/ListSubs'),
    FAadmin = require('./components/FAadmin/FAadmin');


var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="distributed-sending" handler={DistSending}/>
    <Route name="create-email" path="distributed-sending/create-email" handler={CreateEmail}/>
    <Route name="send-email" path="distributed-sending/send-email" handler={SendEmail}/>
    <Route name="content-admin" path="distributed-sending/content-admin" handler={ContentAdmin}/>

    <Route name="client-management" handler={ClientManagement}>
      <DefaultRoute name="lookup" handler={ClientLookup}/>
      <Route name="manage" handler={ClientLists}/>
      <Route name="lists-subscriptions" handler={ListSubs}/>
    </Route>

    <Route name="fa-administration" handler={FAadmin}/>


  </Route>
);

module.exports = routes;
