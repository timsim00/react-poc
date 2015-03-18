var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery');

jQuery("html").on("click.selectableEmailDivs", ".selectableEmailDivs", function(){
    jQuery(this).toggleClass("active");
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
        { title: "Newsletters", id: "1" }
        ,{ title: "Advice", id: "2" }
        ,{ title: "Managed Communications", id: "3" }
    ]
};


var CreateEmail = React.createClass({
  render: function() {
    return (
	<div>
    <div className="row">
  		<div className="col-md-12">
  		  <h2>Create Email</h2>
  		</div>
    </div>
    <div className="row">
  		<div className="col-md-12">
  			<Wizard />
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
  console.log("***");
  	console.log(this.props.types);
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
		<div id="createEmail">
		   <table>
			   <tr>
				  <td><div className="btn btn-default selectableEmailDivs">
				  	  <label for="febNews">February Newsletter</label>
					  <div>
						 <img className="retirement-img" id="febNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
						 </div>
				  </div></td>
				  <td><div className="btn btn-default selectableEmailDivs">
				      <label for="marchNews">March Newsletter </label>
					  <div>
						 <img className="retirement-img" id="marchNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
					   </div>
				  </div></td>
			   </tr>
			   <tr>
				  <td><div className="btn btn-default selectableEmailDivs">
				      <label for="aprilNews">April Newsletter </label>
					  <div>
						 <img className="retirement-img" id="aprilNews" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="220" width="200" />
					   </div>
				  </div></td>
				  <td><div className="btn btn-default selectableEmailDivs">
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

var HTMLView = React.createClass({
    render: function() {
        return(
        <div>
			<div className="col-md-12">
				<div className="well">
				<form className="form-horizontal" role="form">
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="emailName">Email Name</label>
						<div className="col-sm-3">
							<input type="text" id="emailName" className="form-control col-sm-4" placeholder=""/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="emailSubject">Email Subject</label>
						<div className="col-sm-3">
							<input type="text" id="emailSubject" className="form-control" placeholder=""/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="preheader">Preheader</label>
						<div className="col-sm-3">
							<textarea cols="40" rows="5" id="preheader" className="form-control" placeholder=""/>
						</div>
					</div>
				</form>
				</div>
			</div>
			<div className="col-md-12">
				<div id="btnSave" className="pull-right text-right wiz-btn"><button className="btn btn-default">Save</button></div>
				<div id="btnTestSend" className="pull-right text-right wiz-btn"><button className="btn btn-default">Preview / Test Send</button></div>
			</div>
			<div className="col-md-12">

			</div>
			<div className="col-md-12">
				<ul className="nav nav-tabs">
					<li className="active"><a data-toggle="tab" href="#edit">Edit</a></li>
					<li><a data-toggle="tab" href="#preview-mobile">Preview Mobile</a></li>
					<li><a data-toggle="tab" href="#preview-web">Preview Web</a></li>
				</ul>
				<div className="tab-content">
					<div id="edit" className="tab-pane fade in active">
						<div className="preview">
							<div className="crop">
								<img className="col-md-12" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/htmlLayout.png" />
							</div>
						</div>
					</div>
					<div id="preview-mobile" className="tab-pane fade in">
						<iframe height="800px" width="30%" className="col-md-12" src="http://pages.exacttarget.com/page.aspx?QS=773ed3059447707d9d701ccb4b27e72ab11c8f42980a76838c0411c92774c29a" />
					</div>
					<div id="preview-web" height="100%" width="100%" className="tab-pane fade in">
						<iframe height="800px" width="100%" src="http://view.exacttarget.com/?j=fe6215727161077f7c17&m=fe6a1570706407787711&ls=fdf8117776640c7d771c7675&l=fe8e15797064027872&s=fe1c11717d6d03787c1172&jb=ffcf14&ju=fe2815747c620475761371&r=0" />
					</div>					
				</div>
			</div>
		</div>
       );
    }
});




/****  WIZARD *****/

var Step1 = React.createClass({
  handleFilterChange: function(selected) {
  	//TODO consider extracting relevant values
  	this.state.selected = selected;
  },
  getInitialState: function(){
  	var state = {};
  	state.selected = [];
  	return state;
  },
  render: function() {
  	var that = this;
  	var types = this.state.selected;
    return (
	<div className="row">
		<div className="col-md-4">
			<div>
			  <ContentCategories />
			</div>
			<div className="Boo">
			  <FilterByType data={filterData} onChange={that.handleFilterChange}/>
			</div>
		</div>
		<div className="col-md-8">
			<EmailSelect types={types}/>
		</div>
	</div>
    );
  }
});

var Step2 = React.createClass({
  render: function() {
    return (
	<div role="tabpanel" className="tab-pane active">
		<HTMLView />
	</div>
    );
  }
});


var Wizard = React.createClass({
	getInitialState: function() {
		return {
			step: 1
		}
	},
	handleNext: function() {
		if (this.state.step <= 2) this.state.step++;
		switch (this.state.step) {
    		case 2: {
    			$('a[href^="#defineContent"]').click();
    			$('#btnBack button').removeAttr('disabled');
    			$('#btnNext button').html('Schedule Send&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    		case 3: location.hash = "#/distributed-sending/send-email";
    	}
	},
	handleBack: function() {
		if (this.state.step >= 2) this.state.step--;
		switch (this.state.step) {
    		case 1: {
    			$('a[href^="#selectContent"]').click();
    			$('#btnBack button').attr('disabled','disabled');
    			$('#btnNext button').html('Next&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    		}
    	}
	},
    render: function() {
	return (
		<div className="wizard">
			<div className="wizard-header navbar navbar-default">
				<ul className="nav navbar-nav navbar-left">
					<li key="0" className="active">
						<a className="inactive-step" href="#selectContent" data-toggle="tab" onClick={this.handleBack}>
						Select Content
						</a>
					</li>
					<li key="1">
						<a className="inactive-step" href="#defineContent" data-toggle="tab" onClick={this.handleNext}>
						Define Content
						</a>
					</li>
				</ul>
				<div id="btnNext" className="pull-right text-right wiz-btn"><button onClick={this.handleNext} className="btn btn-default">Next&nbsp;&nbsp;<span className="glyphicon glyphicon-arrow-right" /></button></div>
				<div id="btnBack" className="pull-right text-right wiz-btn"><button onClick={this.handleBack} className="btn btn-default">Back</button></div>
				<div id="btnCancel" className="pull-right text-right wiz-btn"><Link to="/" className="btn btn-default">Cancel</Link></div>
			</div>
			<div className="wizard-content tab-content">
			<div role="tabpanel" className="tab-pane active" id="selectContent">
				<Step1 />
			</div>
			<div role="tabpanel" className="tab-pane" id="defineContent">
				<Step2 />
			</div>
		</div>
	</div>
	);
	}
});

module.exports = CreateEmail;
