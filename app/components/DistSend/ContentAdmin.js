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
var TypeFilter = require('../Shared/FilterByType').ItemList;

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
        { title: "Newsletters", id: "1" }
        ,{ title: "Advice", id: "2" }
        ,{ title: "Managed Communications", id: "3" }
    ]
};


var ContentAdmin = React.createClass({
  render: function() {
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
        <div className="Boo">
          <FilterByType data={filterData}/>
        </div>
      </div>
      <div className="col-md-8">
        <EmailSelect/>
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
      	<TypeFilter data={filterData} />
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
			<RetirementThumbs />
    	</div>
    </div>
    );
  }
});

var RetirementThumbs = React.createClass({
    render: function() {
        return(
		<div id="contentAdmin">
		   <table>
			   <tr>
				  <td><div className="btn btn-default selectableDivs">
				  	  <label for="febNews">February Newsletter</label>
					  <div>
						 <img className="retirement-img" id="febNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
						 </div>
				  </div></td>
				  <td><div className="btn btn-default selectableDivs">
				      <label for="marchNews">March Newsletter </label>
					  <div>
						 <img className="retirement-img" id="marchNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
					   </div>
				  </div></td>
			   </tr>
			   <tr>
				  <td><div className="btn btn-default selectableDivs">
				      <label for="aprilNews">April Newsletter </label>
					  <div>
						 <img className="retirement-img" id="aprilNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
					   </div>
				  </div></td>
				  <td><div className="btn btn-default selectableDivs">
				      <label for="mayNews">May Newsletter </label>
					  <div>
						 <img className="retirement-img" id="mayNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
					   </div>
				  </div></td>
			   </tr>
		   </table>
		</div>
       );
    }
});



module.exports = ContentAdmin;
