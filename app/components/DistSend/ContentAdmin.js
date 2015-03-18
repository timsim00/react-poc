var React = require('react'),
    Router = require('react-router')

jQuery("html").on("click.selectableDivs", ".selectableDivs", function(){
    console.log(jQuery(this));
    jQuery(this).toggleClass("active");
    console.log(jQuery(this));
});



var Link = Router.Link;

//components

var SearchBar = require('../Shared/Shared').SearchBar;
var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;

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

var filterData = {
    title: "Filter By Type"
    ,items: [
        { title: "Newsletters", id: "newsletter" }
        ,{ title: "Advice", id: "advice" }
        ,{ title: "Managed Communications", id: "managed" }
    ]
};


var ContentAdmin = React.createClass({
  handleFilterChange: function(selectedTypes){
  	this.setState({selectedTypes: selectedTypes});
  },
  getInitialState: function(){
  	var state = {};
  	state.selectedTypes = [];
  	return state;
  },
  render: function() {
  	var types = this.state.selectedTypes;
  	var that = this;
    return (
	<div>
		<div className="col-md-6">
		  <h2>Content Administration</h2>
		</div>
    <div className="col-md-6 text-right">
    <Link to="distributed-sending" className="btn btn-default">
      <span className="glyphicon glyphicon-arrow-left" />
      &nbsp;Back to Overview
    </Link>
    </div>
		<div className="row">
    <div className="col-md-12">
      <div className="col-md-4">
        <div>
          <ContentCategories />
        </div>
        <div>
          <FilterByType data={filterData} onChange={that.handleFilterChange}/>
        </div>
      </div>
      <div className="col-md-8">
        <EmailSelect types={types}/>
      </div>
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
    	<div className="searchbar">
      		<SearchBar />
    	</div>
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
      	<FilterByType_ data={filterData} onChange={this.props.onChange} />
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
			<RetirementThumbs types={this.props.types}/>
    	</div>
    </div>
    );
  }
});

var thumbs = require("../../data").contentData;
var RetirementThumbs = React.createClass({
    render: function() {
	  	var types = this.props.types.map(function(t){return t.id});
  		var thumbList = thumbs.filter(function(t){
  			return t.category === "Retirement";
  		}).filter(function(t){
  			return types.length === 0 || types.indexOf(t.type) != -1;
  		});
        return(
		<div id="createEmail">
			{thumbList.map(function(t){
				return(<div className="btn btn-default selectableEmailDivs">
					<label htmlFor={t.id}>{t.title}</label>
					<div>
						<img className="retirement-img" id={t.id} src={t.imgUrl} height="220" width="200" />
					</div>
		   		</div>)
			})}
		</div>
       );
    }
});



module.exports = ContentAdmin;
