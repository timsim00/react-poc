var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery'),
    PubSub = require('pubsub-js'),
    Alert = require('react-bootstrap').Alert;

jQuery("html").on("click.selectableEmailDivs", ".email-select .selectableEmailDivs", function(){
    jQuery(this).toggleClass("active");
});

//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");
var Link = Router.Link;

//components

var Shared = require('../Shared/Shared');
var SearchBar = Shared.SearchBar;
var ItemList = Shared.ItemList;
var MasterList = Shared.MasterList;

var FolderTree = require('../Shared/FolderTree');
var FilterByType_ = require('../Shared/FilterByType').ItemList;
var Container =  require('../Shared/Container');
var ModalContainer = require('../Shared/ModalContainer');
var EmailThumbs =  require('../Shared/EmailThumbs');

//data
var folders = require("../../data/folders");
var filterData = require("../../data/types");
var lists = require("../../data/lists");
var clients = require("../../data/clients");
var emails = require("../../data/emails");


/**** MAIN *****/

var SendModal = React.createClass({
	render: function(){
		return (<ModalContainer cta="Send" style="default" onToggle={this.props.onToggle} title="Sending Email">
			<div id="sendModal" className="progress">
  				<div className="progress-bar progress-bar-success progress-bar-striped">

  				</div>
			</div>
			<div className="onDone pull-right">
  				<h2><span className="label label-success">Sent</span></h2>
  			</div>
  			<div className="clearfix"></div>
		</ModalContainer>)
	}
});


// var CreateEmail = AuthenticationRequired.requireAuth(React.createClass({
//   render: function() {
//     return (
// 	<div>
//     <div className="row pageTitle">
//   		<div className="col-md-8">
//   		  <h2>Send Email</h2>
//   		</div>
//   		<div className="col-md-4 pull-right">
//   			<AlertAutoDismissable />
//   		</div>
//     </div>
//     <div className="row">
//   		<div className="col-md-12">
//   			<Wizard />
//   		</div>
//     </div>
// 	</div>
//     );
//   }
// }));


var CreateEmail = React.createClass({
  render: function() {
    return (
	<div>
    <div className="row pageTitle">
  		<div className="col-md-8">
  		  <h2>Send Email</h2>
  		</div>
  		<div className="col-md-4 pull-right">
  			<AlertAutoDismissable />
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
		//fix state defect for poc demo:
		for (var i=0; i<lists.length; i++) {
			lists[i].selected = false;
		}
		return {
			step: 1,
			btnNextDisabled: true,
			tabs: "disabled",
			audiencecount: 0,
			sendconfirm: ''
		}
	},
	handleNext: function(e) {
		if (this.state.step <= 3) this.state.step++;
		switch (this.state.step) {
			/*
    		case 2: {
    			$('a[href^="#stepDefineContent"]').click();
    			$('#btnBack button').removeAttr('disabled');
    			break;
    		}
    		*/
    		case 2: {
    			$('a[href^="#stepSelectAudience"]').click();
    			$('#btnBack button').removeAttr('disabled');
    			break;
    		}
    		case 3: {
    			$('a[href^="#stepSchedule"]').click();
    			jQuery("#btnSend").show();
				jQuery("#btnNext").hide();
//     			$('#btnNext button').html('Send&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    		case 4: {
    			$('#sendemailalert').click();
    			setTimeout(function() {
    				//$("#sendModal .progress-bar").animate({width: "100%"}, 3000); //easing, onComplete
    			}, 500);
    		}
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
    		/*
    		case 2: {
    			$('a[href^="#stepDefineContent"]').click();
    			break;
    		}
    		*/
    		case 2: {
    			$('a[href^="#stepSelectAudience"]').click();
    			$('#btnNext button').html('Next&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
    			break;
    		}
    	}
	},
	handleTabClick: function(e) {
		$('#btnNext button').html('Next&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" />');
		$('#btnBack button').removeAttr('disabled');
		switch ($(e.target)[0].hash) {
			case "#stepSelectContent": {
				this.state.step = 1;
				$('#btnBack button').attr('disabled','disabled');
				break;
			}
			/*
			case "#stepDefineContent": {
				this.state.step = 2;
				break;
			}
			*/
			case "#stepSelectAudience": {
				this.state.step = 2;
				break;
			}
			case "#stepSchedule": {
				this.state.step = 3;
				jQuery("#btnSend").show();
				jQuery("#btnNext").hide();
				break;
			}
		}
	},
	handleLiClick: function(e) {
		e.preventDefault();  //haven't yet found anything that works.
		e.stopPropagation();
	},
	handleSendModal: function(isOpen){
		if(isOpen){
			console.log(jQuery("#sendModal .progress-bar"))
			var width = 5;
			var animate = function(){
				jQuery("#sendModal .progress-bar").width(width+"%");
				width += 1;
				if(width <= 100){
					setTimeout(animate, 50);
				} else {
					jQuery("#sendModal + .onDone").css({visibility: "visible"});
				}
			}
			setTimeout(animate, 100);
		} else {
			setTimeout(function() {
				location.hash = "#/";
			}, 100);
		}
	},
	handleContentSelected: function(msg, data) {
		this.setState({btnNextDisabled: false, tabs: ''});
	},
	handleAudienceListChange: function(msg, data) {
		if (data.add) {
			this.state.audiencecount++;
		} else if (data.remove) {
			this.state.audiencecount--;
		} else if (data.replace) {
			this.state.audiencecount = 1;
		}
		this.setState({audiencecount: this.state.audiencecount});
		this.setState({btnNextDisabled: this.state.audiencecount==0});
	},
	handleStepSelectContentShow: function() {
	},
	handleStepAudienceShow: function() {
		this.setState({btnNextDisabled: this.state.audiencecount==0});
	},
	handleStepScheduleShow: function() {
	},
	componentDidMount: function() {
		this.subscriptions['Content-Selected'] = PubSub.subscribe( 'Content-Selected', this.handleContentSelected );
		this.subscriptions['Audience-List-Change'] = PubSub.subscribe( 'Audience-List-Change', this.handleAudienceListChange );
		$('a[href^="#stepSelectContent"]').on('click', this.handleStepSelectContentShow);
		$('a[href^="#stepSelectAudience"]').on('click', this.handleStepAudienceShow);
		$('a[href^="#stepSchedule"]').on('click', this.handleStepScheduleShow);
		this.handleStepSelectContentShow();
	},
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Content-Selected'] );
		PubSub.unsubscribe( this.subscriptions['Audience-List-Change'] );
	},
    render: function() {
    	var that = this;
		return (
		<div className="wizard">
			<div className="wizard-header navbar navbar-default">
				<ul className="nav navbar-nav navbar-left">
					<li key="0" className="active">
						<a className="inactive-step" href="#stepSelectContent" data-toggle="tab" onClick={this.handleTabClick}>
						Select Email
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
				<div id="btnSend" className="pull-right text-right wiz-btn"><SendModal onToggle={this.handleSendModal}/> </div>
				<div id="btnBack" className="pull-right text-right wiz-btn"><button onClick={this.handleBack} className="btn btn-default">Back</button></div>
				<div id="btnCancel" className="pull-right text-right wiz-btn"><Link to="/" className="btn btn-default">Cancel</Link></div>
			</div>
			<div className="wizard-content tab-content">
				<div role="tabpanel" className="tab-pane active" id="stepSelectContent">
					<StepSelectContent />
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
  onSearchChange: function(data) {
	PubSub.publish( 'Search-Term-Entered', data );
  },
    getInitialState: function(){
  		var state = {};
  		state.selectedTypes = [];
  		state.searchText = "";
  		return state;
    },
    render: function() {
		var that = this;
		var types = this.state.selectedTypes;
		return (
		<div className="row">
			<div className="col-md-4">
        <Container title="Search">
  			<SearchBar onChange={this.onSearchChange}  />
        </Container>
				<div>
				  <ContentCategories />
				</div>
				<div>
				  <FilterByType data={filterData} onChange={that.handleFilterChange}/>
				</div>
			</div>
			<div className="col-md-8">
				<EmailSelect types={types} search={this.state.searchText}/>
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
		this.setState({FolderName: data.name});
	},
	handleContentSelected: function(msg, data) {
		var email = this.state.oEmails[data];
		this.setState({ selectedEmail: email });
		PubSub.publish( 'Content-Set', email );
	},
	componentDidMount: function() {
		this.subscriptions['Folder-Selected'] = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Content-Selected'] = PubSub.subscribe( 'Content-Selected', this.handleContentSelected );
    this.subscriptions['Search-Term-Name'] = PubSub.subscribe( 'Search-Term-Name', this.handleFolderSelected );
  },
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
		PubSub.unsubscribe( this.subscriptions['Content-Selected'] );
    PubSub.unsubscribe( this.subscriptions['Search-Term-Name'] );
	},
    getInitialState: function(){
    	var assocEmails = {};
    	for (var i=0; i<emails.length; i++) {
    		assocEmails[ emails[i].id ] = emails[i];
    	}
		return { FolderName: "Retirement", oEmails: assocEmails, selectedEmail:null };
    },
    render: function() {
    	var searchStyle = {'padding-top':'10px;'};
		return (
		<Container title={ this.state.FolderName }>
			<EmailThumbs types={this.props.types} search={this.props.search} />
		</Container>
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
				</ul>
				<div className="tab-content">
					<div id="edit" className="tab-pane fade in active">
						<div className="preview">
							<iframe className="col-md-12" height="800px" width="100%" frameBorder="0" src="https://test-editor.herokuapp.com/" />
						</div>
					</div>
				</div>
			</div>
		</div>
       );
    }
});

/*************************************** SELECT AUDIENCE TAB ******************************************/


//data
/*
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
*/

/*
{ id: 1, title: "John Smith", data: ["jsmith@gmail.com"], checked: "checked", selected: true },
{ id: 7, title: "Erika Saarland", data: ["esaarland@gmail.com", "Sent 03/12/2015"], disabled: true },

{
        "firstName": "Heidi",
        "lastName": "Kirkland",
        "emailAddress": "quis.diam.luctus@scelerisquenequesed.edu",
        "lists": [3, 5, 8],
        "publications": [3]
}
*/

var StepSelectAudience = React.createClass({
	listid: "subscriberCheckList",
	masterlistid: "masterCheckList",
	masterCols: [{heading:'Name',attr:"name", width:7},{heading:'#Clients',attr:"__childCount", width:3}],
	listChild: {data:clients, masterId:"id", childId:"lists", all:{data:{"id": 0, "name":"All Clients"}} },
	subscriptions: {},
	handleClientItemChanged: function(msg, data) {
		var n = (data.item.prevSelected && !data.item.selected) ? -1 : 1;
		PubSub.publish( 'Audience-Count-Change', {add: n} );
	},
	handleListItemChanged: function(msg, data) {
		var n,o;
		if (data.item.__all) {
			n = (data.item.prevSelected && !data.item.selected) ? {replace: 0} : {replace: data.item.__childCount};
			o = (data.item.prevSelected && !data.item.selected) ? {remove: data.item} : {replace: data.item};

			(data.item.prevSelected && !data.item.selected) && PubSub.publish( 'Excluded-Count-Change', {replace: 0} );
			(data.item.prevSelected && !data.item.selected) && PubSub.publish( 'Excluded-List-Change',  {replace: []});
		} else {
			n = (data.item.prevSelected && !data.item.selected) ? {add: -(data.item.__childCount)} : {add: data.item.__childCount};
			o = (data.item.prevSelected && !data.item.selected) ? {remove: data.item} : {add: data.item};
		}
		PubSub.publish( 'Audience-Count-Change', n );
		PubSub.publish( 'Audience-List-Change',  o);
	},
	addAudienceMembers: function(memberList) {
		for (var i=0; i<memberList.length; i++) {
			var c = memberList[i];
			var sub = {
				id: c.emailAddress
				,title: c.firstName + ' ' + c.lastName
				,data: [c.emailAddress]
				,checked: "checked"
				,selected: true
			};
			//total hack:
			if ((i !=0) && (i % 9 == 0)) {
				sub.data.push('Sent 03/12/2015');
				sub.disabled = true;
				delete sub.checked;
				delete sub.selected;
				PubSub.publish( 'Excluded-List-Change',  {add: sub});
				PubSub.publish( 'Audience-Count-Change', {add: -1} );
				PubSub.publish( 'Excluded-Count-Change', {add: 1} );
			}
			this.state.subscribers.push(sub);
		}
	},
	handleAudienceChanged: function(msg, data) {
		if (data.add) {
			this.addAudienceMembers( data.add.children );
		} else if (data.remove) {
			for (var i=this.state.subscribers.length-1; i>-1; i--) {
				for (var j=0; j<data.remove.children.length; j++) {
					var c = data.remove.children[j];
					if (this.state.subscribers[i] && this.state.subscribers[i].id == c.emailAddress) {
						if (this.state.subscribers[i].disabled) {
							PubSub.publish( 'Excluded-List-Change',  {remove: this.state.subscribers[i]});
							PubSub.publish( 'Excluded-Count-Change', {add: -1} );
						}
						this.state.subscribers.splice(i,1);
					}
				}
			}
		} else if (data.replace) {
			this.state.subscribers = [];
			this.addAudienceMembers( data.replace.children );
		}

		this.setState({subscribers: this.state.subscribers});
	},
	componentDidMount: function() {
		this.subscriptions['Item-Check-Change-'+this.listid] = PubSub.subscribe( 'Item-Check-Change-'+this.listid, this.handleClientItemChanged );
		this.subscriptions['Item-Check-Change-'+this.masterlistid] = PubSub.subscribe( 'Item-Check-Change-'+this.masterlistid, this.handleListItemChanged );
		this.subscriptions['Audience-List-Change'] = PubSub.subscribe( 'Audience-List-Change', this.handleAudienceChanged );
	},
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Item-Check-Change-'+this.listid] );
		PubSub.unsubscribe( this.subscriptions['Item-Check-Change-'+this.masterlistid] );
		PubSub.unsubscribe( this.subscriptions['Audience-List-Change'] );
	},
    getInitialState: function(){
		return { subscribers: [] };
    },
  render: function() {
  	var listspanstyle = { float:'left', padding:'7px' };
  	var searchstyle = { 'margin-left':'-15px' };
  	var subNamesStyle = { 'padding-right':'10px' };
  	var subscriberListStyle = {
  		'-webkit-transition': 'all 0.5s ease;',
		'-moz-transition': 'all 0.5s ease;',
		'-o-transition': 'all 0.5s ease;',
		'transition': 'all 0.5s ease;'
	}

	/*
					<div className="well row">
						<span className="staticValue" style={listspanstyle}>Lists</span>
						<div style={searchstyle} className="col-md-6">
							<SearchBar />
						</div>
					</div>

					<ItemList items={subnames} listid={this.listid} header={subNameHeaders}/>
					<ItemList listid={this.listid} items={subscribers} />
	*/

    return (
	<div  role="tabpanel" className="tab-pane active">
		<div className="row">
			<div id="SubscriberListContainer" className="col-md-4" style={subNamesStyle}>
				<Container title="My Lists">
					<MasterList listid={this.masterlistid} items={lists} columns={this.masterCols} child={this.listChild}/>
				</Container>
			</div>
			<div id="SubscriberContainer" className="col-md-5" style={ subscriberListStyle }>
				<Container title="Clients">
					<ItemList listid={this.listid} items={this.state.subscribers} />
				</Container>
			</div>
			<div className="col-md-3">
					<SelectedItemList items={selectednames} />
			</div>
		</div>
	</div>
    );
  }
});



/*** SUBSCRIBER LIST NAMES ***/

var subnames = [
	{ id:"1", title: "Email - High Value", data: [8], count: "8", checked: "checked", selected: true },
	{ id:"2", title: "Email - Lower Value", data:[42],count: "42", checked: "" },
	{ id:"3", title: "High R and MF", data:[62], count: "62", checked: "" },
	{ id:"4", title: "High Value - Investment Focus", data:[14], count: "14", checked: "" }
];

var subNameHeaders= ["Name", "#Clients"];

/*** SUBSCRIBER LIST CONTAINER ***/
/*
var SubscriberListContainer = React.createClass({
	listid: "subscriberListCheckList",
	subscriptions: {},
	handleFolderSelected: function(msg, data) {
		if (data.name == 'All Clients' && this.state.isVisible) {
			//hide SubscriberListContainer
			$('#SubscriberListContainer').addClass('hide');
			$('#SubscriberContainer').removeClass('col-md-6').addClass('col-md-12');
			this.state.isVisible = false;
		} else if (data.name != 'All Clients' && !this.state.isVisible) {
			//show SubscriberListContainer
			$('#SubscriberContainer').removeClass('col-md-12').addClass('col-md-6');
			setTimeout(function() {
				$('#SubscriberListContainer').removeClass('hide');
			}, 500);
			this.state.isVisible = true;
		}
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
		return { FolderName: 'Lists', isVisible: true };
    },
    render: function() {
		return (
		<ItemList items={subnames} listid={this.listid} header={subNameHeaders}/>
		);
    }
});
*/



/*** SUBSCRIBER LIST ***/

var subscribers = [
	{ id: 1, title: "John Smith", data: ["jsmith@gmail.com"], checked: "checked", selected: true },
	{ id: 2, title: "Sue James", data: ["sjames@gmail.com"], checked: "checked", selected: true  },
	{ id: 3, title: "Joe Jones", data: ["jjones@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 4, title: "Fiona Chapman", data: ["fchapman@gmail.com"], checked: "checked", selected: true },
	{ id: 5, title: "Lilly Kennedy", data: ["lkennedy@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 6, title: "Bradford Hill", data: ["bhill@gmail.com"], checked: "checked", selected: true },
	{ id: 7, title: "Erika Saarland", data: ["esaarland@gmail.com", "Sent 03/12/2015"], disabled: true },
	{ id: 8, title: "Peter Paulson", data: ["ppaulson@gmail.com"], checked: "checked", selected: true }
];




/*** SELECTED LIST ***/

var selectednames = [];

var SelectedItem = React.createClass({
    render: function () {
      return (
        <li className="list-group-item">&nbsp;{ this.props.item }</li>
      );
    }
});

var ExcludedItem = React.createClass({
    render: function () {
      return (
        <li className="list-group-item">&nbsp;{ this.props.item.title }</li>
      );
    }
});

var SelectedItemList = React.createClass({
	subscriptions: {},
	handleSelectedCountChange: function(msg, data) {
		if (data.add) {
			this.state.selectedCount += data.add;
			if (this.state.selectedCount < 0) this.state.selectedCount = 0;
		} else if (typeof(data.replace)=="number") {
			this.state.selectedCount = data.replace;
		}
		this.setState({ selectedCount: this.state.selectedCount });
	},
	handleExcludedCountChange: function(msg, data) {
		if (data.add) {
			this.state.excludedCount += data.add;
			if (this.state.excludedCount < 0) this.state.excludedCount = 0;
		} else if (typeof(data.replace)=="number") {
			this.state.excludedCount = data.replace;
		}
		this.setState({ excludedCount: this.state.excludedCount });
	},
	handleSelectedListChange: function(msg, data) {
		console.log('handleSelectedListChange',data);
		if (data.add) {
			this.state.items.push(data.add.name);
		} else if (data.remove) {
			var i = this.state.items.indexOf(data.remove.name);
			this.state.items.splice(i,1);
		} else if (data.replace) {
			this.state.items = [data.replace.name];
		}
		this.setState({items: this.state.items});
	},
	handleExcludedListChange: function(msg, data) {
		if (data.add) {
			this.state.excludes.push(data.add);
		} else if (data.remove) {
			var j = -1;
			for (var i=0; i<this.state.excludes.length; i++) {
				if (this.state.excludes[i].id == data.remove.id) {
					j = i;
					break;
				}
			}
			if (j != -1) this.state.excludes.splice(j,1);
		} else if (data.replace) {
			this.state.excludes = data.replace;
		}
		this.setState({excludes: this.state.excludes});
	},
	componentDidMount: function() {
		this.subscriptions['Audience-Count-Change'] = PubSub.subscribe( 'Audience-Count-Change', this.handleSelectedCountChange );
		this.subscriptions['Audience-List-Change'] = PubSub.subscribe( 'Audience-List-Change', this.handleSelectedListChange );
		this.subscriptions['Excluded-List-Change'] = PubSub.subscribe( 'Excluded-List-Change', this.handleExcludedListChange );
		this.subscriptions['Excluded-Count-Change'] = PubSub.subscribe( 'Excluded-Count-Change', this.handleExcludedCountChange );
	},
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Audience-Count-Change'] );
		PubSub.unsubscribe( this.subscriptions['Audience-List-Change'] );
		PubSub.unsubscribe( this.subscriptions['Excluded-List-Change'] );
		PubSub.unsubscribe( this.subscriptions['Excluded-Count-Change'] );
	},
  getInitialState: function(){
    var itemList = this.props.items.map(function(item, i){
    	return item;
    });
    return {items:[], excludes:[], selectedCount: 0, excludedCount: 0};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.items.map(function (item, i) {
      	return <SelectedItem item={item} order={i} />
    });
    var excluded = this.state.excludes.map(function (item, i) {
    	if (item.disabled) {
      		return <ExcludedItem item={item} order={i} />
      	}
    });
    return (
       <div>
            <Container title="Selected Audience">
              <div className="well">
               <ul className="list-group">
                 { itemNodes }
               </ul>
              </div>
               <div>Selected Count:  {this.state.selectedCount}</div>
            </Container>
            <Container title="Excluded Audience (recent sends)">
              <div className="well">
              <ul className="list-group">
                { excluded }
               </ul>
             </div>
               <div>Excluded Count:  {this.state.excludedCount}</div>
            </Container>
      </div>

    );
  }
});


/*************************************** SCHEDULE TAB ******************************************/

var StepSchedule = React.createClass({
	subscriptions: {},
	handleContentSelected: function(msg, data) {
		this.setState({ email: data  });
	},
	handleSelectedListChange: function(msg, data) {
		if (data.add) {
			this.state.audiencelist.push(data.add.name);
		} else if (data.remove) {
			var i = this.state.audiencelist.indexOf(data.remove.name);
			this.state.audiencelist.splice(i,1);
		} else if (data.replace) {
			this.state.audiencelist = [data.replace.name];
		}
		this.setState({audiencelist: this.state.audiencelist});
	},
	componentDidMount: function() {
		this.subscriptions['Content-Set'] = PubSub.subscribe( 'Content-Set', this.handleContentSelected );
		this.subscriptions['Audience-List-Change'] = PubSub.subscribe( 'Audience-List-Change', this.handleSelectedListChange );
	},
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Content-Set'] );
		PubSub.unsubscribe( this.subscriptions['Audience-List-Change'] );
	},
  	getInitialState: function(){
    	return {email: {}, audiencelist: []};
  },
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
						<label className="staticLabel">Subject</label>
						<div className="">{this.state.email.subject}</div>
						<br/>
						<label className="staticLabel">Email Name</label>
						<div className="">{this.state.email.name}</div>
						<br/>
						<label className="staticLabel">Audience</label>
						<div className="">{ this.state.audiencelist.join(', ') }</div>
					</div>
					<div className="col-md-6">
						<div className="date-created">
							<label className="staticLabel">Date Created</label>
							<div className="">{this.state.email.createDate}</div>
						</div>
						<div>
							<label className="staticLabel">Date Modified</label>
							<div className="">{this.state.email.modifiedDate}</div>
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
        { title: "Tom Niehaus", email: "tniehaus@f1fet.com" },
        { title: "John Mayer", email: "jmayer@f1fet.com" }
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


/*** SEND EMAIL CONFIRMATION ***/

const AlertAutoDismissable = React.createClass({
  getInitialState() {
    return {
      alertVisible: false
    };
  },

  render() {
  	var alertStyle = {'margin-bottom':'0px;', 'color':'black;'}
    if (this.state.alertVisible) {
      console.log('about to alert');
      return (
        <Alert bsStyle='info' onDismiss={this.handleAlertDismiss} dismissAfter={2500}>
          <h4 style={alertStyle}>Sending Email...</h4>
        </Alert>
      );
    }

    return (
      <span id="sendemailalert" onClick={this.handleAlertShow}></span>
    );
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});


module.exports = CreateEmail;
