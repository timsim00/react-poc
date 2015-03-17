var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery');

var Link = Router.Link;

//components
var FolderTree = require('../Shared/FolderTree');
var SearchBar = require('../Shared/Shared').SearchBar;


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
    return (
	<div  role="tabpanel" className="tab-pane active">
		<div className="row">
			<div className="col-md-1">
				<div id="btnManageGroups" className="text-right"><Link to="/" className="btn btn-default">Manage Groups</Link></div>
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
						<div className="col-md-4">
							<form className="form-inline" role="form">
								<div className="form-group">
									<label className="control-label col-sm-2" htmlFor="searchLists">Lists</label>
									<div className="col-sm-3">
										<input type="text" id="searchLists" className="form-control col-sm-4" placeholder="Search"/>
									</div>
								</div>
							</form>
						</div>
						<div className="col-md-2">
							<div id="btnSelect" className="text-right"><Link to="/" className="pull-right btn btn-default" disabled="disabled">Select</Link></div>
						</div>
					</div>
					<div className="well row">
						<div className="well col-md-5 sub-list-name">
							<SubListNames items={subnames} />
						</div>
						<div className="well col-md-6">
							<SubscriberList items={subscribers} />
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
	{ title: "Email - High Value", count: "8", checked: "checked" },
	{ title: "Email - Lower Value", count: "42", checked: "" },
	{ title: "High R and MF", count: "62", checked: "" },
	{ title: "High Value - Investment Focus", count: "14", checked: "" }
];

var SubNameItem = React.createClass({
    render: function () {
        return (
        <tr>
		   	<td className="list-column"><input checked={ this.props.item.checked } type="checkbox"/>&nbsp;{ this.props.item.title }</td>
           	<td className="list-column">{ this.props.item.count }</td>
	    </tr>
        );
    }
});

var SubListNames = React.createClass({
  getInitialState: function(){
    var itemList = this.props.items.map(function(item, i){
      item.done = false;
      // Unclock first item in the list
      item.locked = (i == 0) ? false : true;
      return item;
    });
    return {items:subnames};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.items.map(function (item, i) {
    	return <SubNameItem item={item} order={i} clicked={that.whenClicked} />
    });
    return (
        <table className="table">
            { itemNodes }
        </table>
    );
  }
});


/*** SUBSCRIBER LIST ***/

var subscribers = [

	{ title: "John Smith", email: "jsmith@gmail.com", checked: "checked" },
	{ title: "Sue James", email: "sjames@gmail.com", checked: "checked" },
	{ title: "Joe Jones", email: "jjones@gmail.com", checked: "checked" },
	{ title: "Fiona Chapman", email: "fchapman@gmail.com", checked: "checked" },
	{ title: "Lilly Kennedy", email: "lkennedy@gmail.com", checked: "checked" },
	{ title: "Bradford Hill", email: "bhill@gmail.com", checked: "checked" },
	{ title: "Erika Saarland", email: "esaarland@gmail.com", checked: "checked" },
	{ title: "Peter Paulson", email: "ppaulson@gmail.com", checked: "checked" }
]

var SubItem = React.createClass({
    render: function () {
      return (
          <tr>
		      <td className="list-column"><input checked={ this.props.item.checked } type="checkbox"/>&nbsp;{ this.props.item.title }</td>
              <td className="list-column">{ this.props.item.email }</td>
	      </tr>
      );
    }
});

var SubscriberList = React.createClass({
  getInitialState: function(){
    var itemList = this.props.items.map(function(item, i){
      item.done = false;
      // Unclock first item in the list
      item.locked = (i == 0) ? false : true;
      return item;
    });
    return {items:subscribers};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.items.map(function (item, i) {
      return <SubItem item={item} order={i} clicked={that.whenClicked} />
    });
    return (
        <table className="table">
            { itemNodes }
        </table>
    );
  }
});


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
				<FromNameDropdown data={dropdowndata} />
				<br/>
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
					<img className="" src="http://image.exct.net/lib/fe6a1570706407787711/m/1/mobileView.png" />
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
    render: function () {
        console.log(this);
        return (
            <option>{ this.props.item.title }&nbsp;({ this.props.item.email })</option>
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
    console.log(this.state);
    var itemNodes = this.state.data.items.map(function (item, i) {
      return <DropDownItem item={item} order={i} />
    });
    return (
        <div>
        	<div>
            	<label className="">{this.props.data.title}</label>
            </div>
            <div className="col-md-5">
				<select name="itemSelector" className="form-control">
					{ itemNodes }
				</select>
            </div>
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
