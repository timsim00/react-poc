var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery');

var Link = Router.Link;


//components
var Shared = require('../Shared/Shared');
var FolderTree = require('../Shared/FolderTree');
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;

//data
var folders = [
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


/**** MAIN *****/

var SendEmail = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
      		<div className="col-md-12">
      		  <h2>Send Email</h2>
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


/**** WIZARD *****/

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
    			$('a[href^="#stepSchedule"]').click();
    			$('#btnBack button').removeAttr('disabled');
    			$('#btnNext button').html('Send&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    		case 3: location.hash = "#/";
    	}
	},
	handleBack: function() {
		if (this.state.step >= 2) this.state.step--;
		switch (this.state.step) {
    		case 1: {
    			$('a[href^="#stepSelectAudience"]').click();
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
						<a className="inactive-step" href="#stepSelectAudience" data-toggle="tab" onClick={this.handleBack}>
							Select Audience
						</a>
					</li>
					<li key="1">
						<a className="inactive-step" href="#stepSchedule" data-toggle="tab" onClick={this.handleNext}>
							Schedule
						</a>
					</li>
				</ul>
				<div id="btnNext" className="pull-right text-right wiz-btn"><button onClick={this.handleNext} className="btn btn-default">Next&nbsp;&nbsp;<span className="glyphicon glyphicon-arrow-right" /></button></div>
				<div id="btnBack" className="pull-right text-right wiz-btn"><button onClick={this.handleBack} className="btn btn-default">Back</button></div>
				<div id="btnCancel" className="pull-right text-right wiz-btn"><Link to="create-email" className="btn btn-default">Cancel</Link></div>
			</div>
			<div className="wizard-content tab-content">
				<div role="tabpanel" className="tab-pane active" id="stepSelectAudience">
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



/*************************************** SELECT AUDIENCE TAB ******************************************/

var StepSelectAudience = React.createClass({
  render: function() {
  	var listspanstyle = { float:'left', padding:'7px' };
  	var searchstyle = { 'margin-left':'-15px' };
    return (
	<div  role="tabpanel" className="tab-pane active">
		<div className="row">
			<div className="col-md-1">
				<div id="btnManageGroups" className="text-right"><Link to="/client-management" className="btn btn-default">Manage Clients</Link></div>
			</div>
		</div>
		<br/>
		<div className="row">
			<div className="col-md-12">
				<div className="col-md-2">
					<div className="well">
						<FolderTree folders={folders} />
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
						<div className="col-md-6">
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
  		'margin-top':'10px'
  	};	
    return (
	<div role="tabpanel" className="tab-pane">
		<div className="col-md-12">
			<h3>Summary</h3>
			<hr className="divider"/>
		</div>
		<div className="col-md-12">
			<div className="col-md-6">
				<div className="staticLabel">Subject</div>
				<div className="staticValue">Get out on an Hike NOW!</div>
				<br/>
				<div className="staticLabel">Email Name</div>
				<div className="staticValue">Simple - Guide to Incredible Hikes</div>
				<br/>
				<div className="staticLabel">Audience</div>
				<div className="staticValue">High Value - Investment Focus</div>
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
					<div className="staticLabel">Subject</div>
					<div className="staticValue">Get out on an Hike NOW!</div>
					<br/>
					<div className="date-created">
						<div className="staticLabel">Date Created</div>
						<div className="staticValue">2/25/2015 8:17 PM</div>
					</div>
					<div>
						<div className="staticLabel">Date Modified</div>
						<div className="staticValue">2/25/2015 8:17 PM</div>
					</div>																		
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
				<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="selected">Select a value</span> <span className="caret"></span></button>
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
    console.log(this.state);
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



module.exports = SendEmail;
