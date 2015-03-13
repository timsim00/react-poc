var React = require('react');

var SearchBar = React.createClass({
 render: function() {
   return (
    <div className="input-group input-group-sm">
     <input type="text" className="form-control" placeholder="Search" />
     <span className="input-group-addon" id="sizing-addon1">Search</span>
   </div>
   );
 }

 module.exports = SearchBar;
