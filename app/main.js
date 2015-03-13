var $ = require('jquery')(window);
global.jQuery = require("jquery");
var bootstrap = require('bootstrap');
var holderjs = require('holderjs');
var React = require('react'),
    Router = require('react-router'),

    Routes = require('./routes');

window.React = React;


Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
