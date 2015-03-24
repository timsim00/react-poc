var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route;

var App = require('./App'),
    DistSending = require('./components/DistSend/DistSending'),
    CreateEmail = require('./components/DistSend/CreateEmail'),
    ContentAdmin = require('./components/DistSend/ContentAdmin'),
    ClientManagement = require('./components/ClientManage/ClientManagement'),
    ClientLists = require('./components/ClientManage/ClientLists'),
    ListManagement = require('./components/ClientManage/ListManagement'),
    SubscriptionManagement = require('./components/ClientManage/SubscriptionManagement'),
    FAadmin = require('./components/FAadmin/FAadmin');


var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="distributed-sending" handler={DistSending}/>
    <Route name="create-email" path="distributed-sending/create-email" handler={CreateEmail}/>
    <Route name="content-admin" path="distributed-sending/content-admin" handler={ContentAdmin}/>

    <Route name="client-management" handler={ClientManagement}>
      <DefaultRoute name="manage" handler={ClientLists}/>
      <Route name="lists" handler={ListManagement}/>
      <Route name="subscriptions" handler={SubscriptionManagement}/>
    </Route>

    <Route name="fa-administration" handler={FAadmin}/>


  </Route>
);

module.exports = routes;
