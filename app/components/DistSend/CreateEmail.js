var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery'),
    PubSub = require('pubsub-js');

jQuery("html").on("click.selectableEmailDivs", ".selectableEmailDivs", function(){
    jQuery(this).toggleClass("active");
});


var Link = Router.Link;

//components

var Shared = require('../Shared/Shared');
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;

var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;
var Container =  require('../Shared/Container');


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



/**** MAIN *****/

var CreateEmail = React.createClass({
  render: function() {
    return (
	<div>
    <div className="row pageTitle">
  		<div className="col-md-12">
  		  <h2>Create / Send Email</h2>
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

/****  WIZARD *****/

var Wizard = React.createClass({
	subscriptions: {},
	getInitialState: function() {
		return {
			step: 1,
			btnNextDisabled: true,
			tabs: "disabled"
		}
	},
	handleNext: function() {
		if (this.state.step <= 4) this.state.step++;
		switch (this.state.step) {
    		case 2: {
    			$('a[href^="#stepDefineContent"]').click();
    			$('#btnBack button').removeAttr('disabled');
    			break;
    		}
    		case 3: {
    			$('a[href^="#stepSelectAudience"]').click();
    			break;
    		}
    		case 4: {
    			$('a[href^="#stepSchedule"]').click();
    			$('#btnNext button').html('Send&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    		case 5: location.hash = "#/";
    	}
	},
	handleBack: function() {
		if (this.state.step >= 2) this.state.step--;
		switch (this.state.step) {
    		case 1: {
    			$('a[href^="#stepSelectContent"]').click();
    			$('#btnBack button').attr('disabled','disabled');
    			break;
    		}
    		case 2: {
    			$('a[href^="#stepDefineContent"]').click();
    			break;
    		}
    		case 3: {
    			$('a[href^="#stepSelectAudience"]').click();
    			$('#btnNext button').html('Next&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    	}
	},
	handleTabClick: function(e) {
		//console.log(this.state.btnNextDisabled);
		$('#btnNext button').html('Next&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
		$('#btnBack button').removeAttr('disabled');
		switch ($(e.target)[0].hash) {
			case "#stepSelectContent": {
				this.state.step = 1;
				$('#btnBack button').attr('disabled','disabled');
				break;
			}
			case "#stepDefineContent": {
				this.state.step = 2;
				break;
			}
			case "#stepSelectAudience": {
				this.state.step = 3;
				break;
			}
			case "#stepSchedule": {
				this.state.step = 4;
				$('#btnNext button').html('Send&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
				break;
			}
		}
	},
	handleLiClick: function(e) {
		console.log('handleLiClick');
		e.preventDefault();  //haven't yet found anything that works.
		e.stopPropagation();
	},
	handleContentSelected: function(msg, data) {
		this.setState({btnNextDisabled: false, tabs: ''});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Content-Selected', this.handleContentSelected );
		this.subscriptions['Content-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Content-Selected'] );
	},
    render: function() {
    var that = this;
	return (
		<div className="wizard">
			<div className="wizard-header navbar navbar-default">
				<ul className="nav navbar-nav navbar-left">
					<li key="0" className="active">
						<a className="inactive-step" href="#stepSelectContent" data-toggle="tab" onClick={this.handleTabClick}>
						Select Content
						</a>
					</li>
					<li key="1" className={this.state.tabs}>
						<a className="inactive-step" href="#stepDefineContent" data-toggle="tab" onClick={this.handleTabClick}>
						Define Content
						</a>
					</li>
					<li key="2" className={this.state.tabs}>
						<a className="inactive-step" href="#stepSelectAudience" data-toggle="tab" onClick={this.handleTabClick}>
						Select Audience
						</a>
					</li>
					<li key="3" className={this.state.tabs}>
						<a className="inactive-step" href="#stepSchedule" data-toggle="tab" onClick={this.handleTabClick}>
						Schedule
						</a>
					</li>
				</ul>
				<div id="btnNext" className="pull-right text-right wiz-btn"><button disabled={this.state.btnNextDisabled} onClick={this.handleNext} className="btn btn-default">Next&nbsp;&nbsp;<span className="glyphicon glyphicon-arrow-right" /></button></div>
				<div id="btnBack" className="pull-right text-right wiz-btn"><button onClick={this.handleBack} className="btn btn-default">Back</button></div>
				<div id="btnCancel" className="pull-right text-right wiz-btn"><Link to="/" className="btn btn-default">Cancel</Link></div>
			</div>
			<div className="wizard-content tab-content">
			<div role="tabpanel" className="tab-pane active" id="stepSelectContent">
				<StepSelectContent />
			</div>
			<div role="tabpanel" className="tab-pane" id="stepDefineContent">
				<StepDefineContent />
			</div>
			<div role="tabpanel" className="tab-pane" id="stepSelectAudience">
				<StepSelectAudience />
			</div>
			<div role="tabpanel" className="tab-pane" id="stepSchedule">
				<StepSchedule />
			</div>
		</div>
	</div>
	);
	}
});


/*************************************** SELECT CONTENT TAB ******************************************/


var StepSelectContent = React.createClass({
	subscriptions: {},
    handleFilterChange: function(selectedTypes) {
  		//TODO consider extracting relevant values
  		this.setState({selectedTypes : selectedTypes});
    },
    getInitialState: function(){
  		var state = {};
  		state.selectedTypes = [];
  		return state;
    },
    render: function() {
		var that = this;
		var types = this.state.selectedTypes;
		return (
		<div className="row">
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
		);
    }
});


/****  Content Categories ****/

var ContentCategories = React.createClass({
  render: function() {
    return (
    <Container title="Content Categories">
      <FolderTree folders={folders} />
    </Container>
    );
  }

});


/****  Filter By Type ****/

var FilterByType = React.createClass({
  render: function() {
    return (
    <Container title="Filter By Type">
      	<FilterByType_ data={filterData} onChange={this.props.onChange} />
    </Container>
    );
  }

});


/****  Email Select ****/

var EmailSelect = React.createClass({
	subscriptions: {},
	handleFolderSelected: function(msg, data) {
		this.setState({FolderName: data});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Folder-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
	},
    getInitialState: function(){
		return { FolderName: "Retirement" };
    },
    render: function() {
    	var searchStyle = {'padding-top':'10px;'};
		return (
		<Container title={ this.state.FolderName }>
				<div className="row col-md-4 pull-right" style={searchStyle} >
					<SearchBar />
				</div>
        <div className="clearfix"></div>
				<RetirementThumbs types={this.props.types}/>
		</Container>
		);
    }
});



/****  Content Thumbnails ****/

var thumbs = require("../../data").contentData;
var RetirementThumbs = React.createClass({
	subscriptions: {},
	getInitialState: function() {
		return {
			selectedId: null,
			category: "Retirement"
		}
	},
	handleThumbClick: function(e) {
		e.preventDefault();
		var $ele = $(e.target);
		if (!$ele.hasClass('selectableEmailDivs')) $ele = $ele.closest('.selectableEmailDivs');
		var thisId = $ele.data('reactid');
		var $check = $ele.find('.selected-indicator');

		if (this.state.selectedId) {
			var $prev = $('*[data-reactid="'+ this.state.selectedId +'"]');
			$prev.removeClass('active');
			$prev.find('.selected-indicator').addClass('hidden');
		}
		this.state.selectedId = thisId;
		$ele.addClass('active');
		$check.addClass('content-selected').removeClass('hidden');

		PubSub.publish( 'Content-Selected', thisId );
	},
	handleFolderSelected: function(msg, data) {
		this.setState({category: data});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Folder-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
	},
    render: function() {
    	var that = this;
	  	var types = this.props.types.map(function(t){return t.id});
	  	//var selectedStyle = {visibility:"hidden"};
  		var thumbList = thumbs.filter(function(t){
  				return t.category === that.state.category;
  			}).filter(function(t){
  				return types.length === 0 || types.indexOf(t.type) != -1;
  			});
        return(
		<div id="createEmail">
			{thumbList.map(function(t){
				return(
				<div onClick={that.handleThumbClick} className="btn btn-default selectableEmailDivs">
					<label htmlFor={t.id}>{t.title}</label><div className="selected-indicator hidden fa fa-check fa-lg" />
					<div>
						<img className="retirement-img" id={t.id} src={t.imgUrl} height="220" width="200" />
					</div>
		   		</div>
		   		)
			})}
		</div>
       );
    }
});


/*************************************** DEFINE CONTENT TAB ******************************************/

var StepDefineContent = React.createClass({
  render: function() {
    return (
	<div role="tabpanel" className="tab-pane active">
		<HTMLView />
	</div>
    );
  }
});


/****  HTML View ****/

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
							<iframe className="col-md-12" height="800px" width="100%" frameBorder="0" src="https://test-editor.herokuapp.com/" />
						</div>
					</div>
					<div id="preview-mobile" className="crop tab-pane fade in">
						<iframe height="800px" width="30%" className="" src="images/pagepreview.png" />
					</div>
					<div id="preview-web" height="100%" width="100%" className="tab-pane fade in">
						<iframe height="800px" width="100%" src="images/pagepreview.png" />
					</div>
				</div>
			</div>
		</div>
       );
    }
});

/*************************************** SELECT AUDIENCE TAB ******************************************/


//data
var folderClients = [
    {
        name: "Lists",
        folders: [
            {
                name: "Lists",
                folders: [
                    {name: "Retirement"},
                    {name: "Mortgage"}
                 ]
            }
    ]},
    { name: "All Clients"}
];

var StepSelectAudience = React.createClass({
  render: function() {
  	var listspanstyle = { float:'left', padding:'7px' };
  	var searchstyle = { 'margin-left':'-15px' };
  	var subNamesStyle = { 'padding-right':'10px' };
    return (
	<div  role="tabpanel" className="tab-pane active">
		<div className="row">
			<div className="col-md-12">
				<div className="col-md-2">
					<div className="well">
						<FolderTree folders={folderClients} />
					</div>
				</div>
				<div className="col-md-7">
					<div className="well row">
						<span className="staticValue" style={listspanstyle}>Lists</span>
						<div style={searchstyle} className="col-md-6">
							<SearchBar />
						</div>
						<div className="col-md-2 pull-right">
							<div id="btnSelect" className="text-right"><Link to="/" className="btn btn-default" disabled="disabled">Select</Link></div>
						</div>
					</div>
					<div className="row zero-padding">
						<div className="col-md-6" style={subNamesStyle}>
							<div className="well">
								<ItemList items={subnames} header={subNameHeaders}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="well">
								<ItemList items={subscribers} />
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<div className="well">
						<SelectedItemList items={selectednames} />
					</div>
				</div>
			</div>
		</div>
	</div>
    );
  }
});



/*** SUBSCRIBER LIST NAMES ***/

var subnames = [
	{ id:"1", title: "Email - High Value", data: [8], count: "8", checked: "checked" },
	{ id:"2", title: "Email - Lower Value", data:[42],count: "42", checked: "" },
	{ id:"3", title: "High R and MF", data:[62], count: "62", checked: "" },
	{ id:"4", title: "High Value - Investment Focus", data:[14], count: "14", checked: "" }
];

var subNameHeaders= ["Name", "#Clients"];

/*** SUBSCRIBER LIST ***/

var subscribers = [
	{ id: 1, title: "John Smith", data: ["jsmith@gmail.com"], checked: "checked", selected: true, },
	{ id: 2, title: "Sue James", data: ["sjames@gmail.com"], checked: "checked", selected: true  },
	{ id: 3, title: "Joe Jones", data: ["jjones@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 4, title: "Fiona Chapman", data: ["fchapman@gmail.com"], checked: "checked", selected: true },
	{ id: 5, title: "Lilly Kennedy", data: ["lkennedy@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 6, title: "Bradford Hill", data: ["bhill@gmail.com"], checked: "checked", selected: true },
	{ id: 7, title: "Erika Saarland", data: ["esaarland@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 8, title: "Peter Paulson", data: ["ppaulson@gmail.com"], checked: "checked", selected: true }
]


/*** SELECTED LIST ***/

var selectednames = [
	{ title: "Email - High Value", count: "8" }
];

var SelectedItem = React.createClass({
    render: function () {
      return (
        <li className="list-group-item">&nbsp;{ this.props.item.title }</li>
      );
    }
});

var SelectedItemList = React.createClass({
  getInitialState: function(){
    var itemList = this.props.items.map(function(item, i){
    	return item;
    });
    return {items:selectednames};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.items.map(function (item, i) {
      return <SelectedItem item={item} order={i} clicked={that.whenClicked} />
    });
    return (
       <div>
            <label>Selected Audiences</label>
            <div className="well">
               <ul className="list-group">
                 { itemNodes }
                </ul>
            </div>
            Audience Count:  {8}
      </div>

    );
  }
});


/*************************************** SCHEDULE TAB ******************************************/

var StepSchedule = React.createClass({
  render: function() {
  	var previewStyle = {
  		'marginTop':'10px'
  	};
    return (
	<div role="tabpanel" className="tab-pane">
		<div className="col-md-12">
			<h3>Summary</h3>
			<hr className="divider"/>
		</div>
		<div className="col-md-12">
			<div className="col-md-6">
				<div className="row">
					<div className="col-md-6">
						<div className="staticLabel">Subject</div>
						<div className="staticValue">Get out on an Hike NOW!</div>
						<br/>
						<div className="staticLabel">Email Name</div>
						<div className="staticValue">Simple - Guide to Incredible Hikes</div>
						<br/>
						<div className="staticLabel">Audience</div>
						<div className="staticValue">High Value - Investment Focus</div>
					</div>
					<div className="col-md-6">
						<div className="date-created">
							<div className="staticLabel">Date Created</div>
							<div className="staticValue">2/25/2015 8:17 PM</div>
						</div>
						<div>
							<div className="staticLabel">Date Modified</div>
							<div className="staticValue">2/25/2015 8:17 PM</div>
						</div>
					</div>
				</div>
				<br/>
				<br/>
				<hr className="divider"/>
				<div>
					<label className="">From Name</label>
				</div>
				<FromNameDropdown data={dropdowndata} />
				<br/>
				<hr className="divider"/>
				<Radios data={radiodata} />
			</div>
			<div className="col-md-6">
				<div className="well">
					<div id="preview-web" height="100%" width="100%">
						<iframe style={previewStyle} height="800px" width="100%" src="images/pagepreview.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
    );
  }
});



/*** FROM NAME DROPDOWN ***/

var dropdowndata = {
    title: "From Name"
    ,visible: ["title","email"]
    ,items: [
        { title: "Lilly Kennedy", email: "lkennedy@gmail.com" },
        { title: "Bradford Hill", email: "bhill@gmail.com" },
        { title: "Erika Saarland", email: "esaarland@gmail.com" },
        { title: "Peter Paulson", email: "ppaulson@gmail.com" },
        { title: "Thomas Neal", email: "tneal@gmail.com" }
    ]
};

var DropDownItem = React.createClass({
	handleClick: function(e) {
        e.preventDefault();
        var node = this.getDOMNode();
		var i = $(node).parents('.select').attr('id');
		var v = $(node).children().text();
		var o = $(node).attr('id');
		$('#'+i+' .selected').attr('id',o);
		$('#'+i+' .selected').text(v);
	},
    render: function () {
    	var drop_down_a = { 'border-bottom':'0', 'padding-top':'0px', 'padding-bottom':'0px' };
        return (
            <li id={this.props.item.id} role="presentation">
                <a role="menuitem" tabIndex="-1" href="#" onClick={this.handleClick} style={drop_down_a}>
                	{ this.props.item.title }&nbsp;({ this.props.item.email })
                </a>
            </li>
        );
    }
});


var FromNameDropdown = React.createClass({
  getInitialState: function(){
    var itemList = this.props.data.items.map(function(item, i){
      item.selected = item.selected ? item.selected : false;
      item.id = item.id ? item.id : i;
      return item;
    });
    return {data: this.props.data};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.data.items.map(function (item, i) {
      return <DropDownItem item={item} order={i} />
    });

    return (
			<div className="input-group-btn select" id="select1">
				<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="selected">Select a sender</span> <span className="caret"></span></button>
				<ul className="dropdown-menu option" role="menu" aria-labelledby="dropdownMenu1">
					{ itemNodes }
				</ul>
			</div>
    );
  }
});


/*** RADIO BUTTONS ***/

var radiodata = {
    title: "Schedule"
    ,visible: ""
    ,items: [
        { title: "Immediately", checked: true },
        { title: "Future", checked: false }
    ]
};

var RadioItem = React.createClass({
    render: function () {
        var checked = this.props.item.checked ? "checked" : "";
        return (
            <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={checked}> { this.props.item.title } </input>
            </label>
        );
    }
});


var Radios = React.createClass({
  getInitialState: function(){
    var itemList = this.props.data.items.map(function(item, i){
      item.selected = item.selected ? item.selected : false;
      item.id = item.id ? item.id : i;
      return item;
    });
    return {data: this.props.data};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.data.items.map(function (item, i) {
      return <RadioItem item={item} order={i} />
    });
    return (
        <div>
            <label class="col-sm-2 control-label">{this.props.data.title}</label>
            <div>
                { itemNodes }
            </div>
        </div>
    );
  }
});


module.exports = CreateEmail;
