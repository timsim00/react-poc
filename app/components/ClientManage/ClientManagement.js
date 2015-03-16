var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

// var tabs = [
//     {
//         title: "Managed Publications",
//         content: "managed publications content -----------"
//     },
//     {
//         title: "Manage Clients",
//         content: "manage clients content-------------"
//     },
//     {
//         title: "Lists & Subscriptions",
//         content: "lists and subscriptions content --------------"
//     }
// ]
//
//
//
// var convertToId = function(title){
//     var text = title.replace(/\W+/g,"").replace("&","And");
//     return text.substring(0, 1).toLowerCase()+text.substring(1);
// }
//
// var VerticalTabs = React.createClass({
//   render: function() {
//     return (
//      <div className="vertical-tabs" role="tabpanel">
//           <ul className="nav nav-pills nav-stacked" role="tablist">
//               {tabs.map(function(tab, index){
//                   var classes = index===0? "active": "";
//                   var href = "#"+ convertToId(tab.title);
//                   return (<li role="presentation" className={classes} key={index}>
//                       <a href={href} aria-control="home" data-toggle="tab">
//                       {tab.title}
//                       </a>
//                    </li>);
//               })}
//           </ul>
//           <div className="tab-content">
//               {tabs.map(function(tab, index){
//                   var classes = index === 0? "tab-pane active": "tab-pane";
//                   var id = convertToId(tab.title);
//                   return (<div role="tabpanel" className={classes} id={id} key={index}>
//                       {tab.content}
//                   </div>)
//               })}
//           </div>
//     </div>
//     );
//   }
// });




var ClientManagement = React.createClass({
  render: function() {
    return (
	<div>
    <h2>ClientManagement</h2>
    <div className="col-md-4">
      <ul>
        <li><Link to="lookup">Client Lookup</Link></li>
        <li><Link to="manage">Manage Clients</Link></li>
        <li><Link to="lists-subscriptions">Lists &amp; Subscriptions</Link></li>
      </ul>
    </div>
    <div className="col-md-8">
      <RouteHandler/>
    </div>
	</div>
    );
  }

});

module.exports = ClientManagement;
