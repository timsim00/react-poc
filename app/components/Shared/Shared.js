var React = require('react'),
		moment = require('moment'),
		$ = require('jquery'),
  	PubSub = require('pubsub-js'),
		ModalContainer = require('./ModalContainer'),
		ModalTrigger = require('react-bootstrap').ModalTrigger;


var createLookup = function(list){
	return list.reduce(function(lookup, current){
		lookup[current] = true;
		return lookup;
	}, {});
}

var Item = React.createClass({
	__changeSelection: function(item) {
		var newValue = !this.state.selected;
		item.prevSelected = item.selected;
        this.setState({selected: newValue});
        item.selected = newValue; //this.state.selected;
        if(this.props.onChange){
        	this.props.onChange(item.id, newValue);
        }
    	PubSub.publish( 'Item-Check-Change-'+this.props.listid, {item: item} );
    },
    getInitialState: function(){
    	var state = {};
    	state.selected = this.props.item.selected;
    	state.disabled = this.props.item.disabled;
    	return state;
    },
    getColumnClasses : function(){
    	return "col-md-"+Math.floor(12/((this.props.columns||0) +1));
    },
    render: function () {
    	var classes;
    	var checked = "";
    	var disabledAttr = "";
    	var disabledClasses = "";
    	var data = this.props.item.data;;
    	if(!data){
    		if(this.props.item.email){
				data = [this.props.item.email]
			} else {
				data = [];
			}
		}

    	classes = this.getColumnClasses();
    	var columns = (this.props.columns||0);
    	while(data.length < columns){
    		data.push("");
    	}
    	if(this.state.selected){
    		checked = "checked";
    	}

    	if(this.state.disabled){
    		disabledAttr = "disabled";
    		disabledClasses= "disabledColor";
    	}
    	var lblClasses = [classes, disabledClasses].join(" ");
    	var text = this.props.item.title || this.props.item.name;
      return (
			  <div key={this.props.item.id} className="row checkbox">
				<div className={lblClasses}>
					<label>
						<input type="checkbox" key={this.props.item.id} listid={this.props.listid} checked={checked} disabled={disabledAttr} onChange={this.__changeSelection.bind(this, this.props.item)}/>
						{ text }
					</label>
				</div>
				{data.map(function(d){
					return(<div className={lblClasses}>{d}</div>)
				})}
			</div>
      );
    }
});

var MasterItem = React.createClass({
	__changeSelection: function(item) {
		var newValue = !this.state.selected;
		item.prevSelected = item.selected;
		this.setState({selected: newValue});
		item.selected = newValue; //this.state.selected;
		if(this.props.onChange){
			this.props.onChange(item.id, newValue);
		}
		this.props.itemselect(item);
    	PubSub.publish( 'Item-Check-Change-'+this.props.listid, {item: item} );
    },
    getInitialState: function(){
    	return {};
    },
    render: function () {
    	var that = this;
    	var checked = (this.props.item.selected) ? "checked" : "";
    	var disabledAttr = (this.props.item.disabled) ? "disabled" : "";
    	var disabledClasses = (this.state.disabled) ? "disabledColor" : "";	

        var colattrs = [];
        for (var i=0; i<this.props.columns.length; i++) {
        	colattrs.push(this.props.columns[i].attr);  //get an array of column field names (attributes)
        }
        var colClass = 'col-md-' + this.props.columns[0].width;
		var first=true;

      	return (
		<div key={this.props.item.id} className="row checkbox">
			<div className={colClass}>
				<label>
					<input type="checkbox" key={this.props.item.id} listid={this.props.listid} checked={checked} disabled={disabledAttr} onChange={this.__changeSelection.bind(this, this.props.item)}/>
					{ this.props.item[colattrs[0]] }
				</label>
			</div>
			{this.props.columns.map(function(col){
				if (!first) return(<div className={'col-md-' + col.width}>{that.props.item[col.attr]}</div>)
				first=false;
			})}
		</div>
      	);
    }
});

var Header = React.createClass({
	getColumnClasses : function(){
		if(!this.props.data){
			return "list-header col-md-12";
		}
    	return "list-header col-md-"+Math.floor(12/(this.props.data.length||0));
    },
	render: function(){
		var headers = this.props.data || [];
		var classes = this.getColumnClasses();
		return (<div className="row header">
				{headers.map(function(h){
					return (<div className={classes}>{h}</div>);
				})}
			</div>)
	}
});

var MasterHeader = React.createClass({
	render: function(){
		return (<div className="row header">
				{this.props.columns.map(function(col){
					return (<div className={'list-header col-md-' + col.width}>{col.heading}</div>);
				})}
			</div>)
	}
});

var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="fa fa-eye" />
        </div>)
    }
});

module.exports = {
  "SearchBar" : React.createClass({
  	 onChange: function(){
  	 	if(this.props.onChange){
  	 		this.props.onChange(this.refs.search.getDOMNode().value);
  	 	}
  	 },
     render: function() {
       return (
        <div>
         <input type="text" ref="search" className="form-control" placeholder="Search" onChange={this.onChange}/>
       </div>
       );
     }
   }),

   "EmailPreview" : React.createClass({
      render: function() {
        return (
        <div id="emailPreview">
            <div className="text-center email-preview">
                <img src={'./images/' + this.props.data.previewImage} className="img-responsive" height="75"  />
            </div>
             <div className="text-center">
							 <ModalContainer size="xsmall" cta="View" title={this.props.data.name}>
								<div className="text-center">
									<img src={'./images/' + this.props.data.image} className="img-responsive emailPreview" />
								</div>
							</ModalContainer>
             </div>
        </div>
        );
      }
    }),

    "ItemList" : React.createClass({
	  handleFilterChange: function(key, newValue){
		var selected = this.state.selected;
		selected[key] = newValue;
		if(this.props.single && newValue){
			selected = {};
			selected[key] = true;
			this.props.items.forEach(function(item){
				item.selected = (item.id === key);
			});
			this.setState({selected: selected});
		}

		if(this.props.onChange){
			var selectedItems = this.props.items.filter(function(i){return selected[i.id];});
			this.props.onChange(selectedItems);
		}
	  },
      getInitialState: function(){
      	var items = this.props.items;
        var itemList = this.props.items.map(function(item, i){
          item.done = false;
          // Unclock first item in the list
          item.locked = (i == 0) ? false : true;
          return item;
        });
        var selected = {};
        this.props.items.filter(function(i){
        	return i.selected;
        }).forEach(function(i){
        	selected[i.id] = true;
        });
        return {items:itemList, selected: selected, listid:this.props.listid};
      },
      render: function(){
        var that = this;
        //Counts additional columns (title is special)
        var columns = this.props.items.reduce(function(max, current){
        	var count;
        	if(current.data){
        		count = current.data.length;
        	} else if(current.email) {
        		count = 1;
        	} else {
        		count = 0;
        	}

        	if(count > max){
        		max = count;
        	}
        	return max;
        },0);
		var rootClasses = "itemList";
		if(this.props.noCheck){
			rootClasses +=" no-check";
		}
        var itemNodes = this.props.items.map(function (item) {
          return <Item item={item} listid={that.props.listid} key={item.id} columns={columns} onChange={that.handleFilterChange} />
        });
        return (
            <div className={rootClasses}>
            	<Header data={this.props.header} />
                { itemNodes }
            </div>
        );
      }
    }),

    "MasterList" : React.createClass({
      /*
      	Usage: 	<MasterList items={lists} columns={this.masterCols} child={this.listChild}/>
      	Props: 	items: 		data for the list, array of objects
      			columns:	columns header info, array of {heading:'value',attr:'value', width:3}
      			child:		data/info for child items, ie. {data:clients, masterId:"id", childId:"lists"}
      */
      needsChildCount: function() {
      	var needsChildCount = false;
      	for (var i=0; i<this.props.columns.length; i++) {
      		if (this.props.columns[i].attr == "__childCount") {
      			needsChildCount = true;
      			break;
      		}
      	}
      	return needsChildCount;
      },
      getChildCounts: function() {
      	//if anyone can do this more efficiently, have at it.
      	/*
      	//less efficient but more concise way:
      	for (var i=0; i<this.props.items.length; i++) {
			this.props.items[i].childCount = 0;
			var masterId = this.props.items[i][this.props.child.masterId];
			var cfld = this.props.child.childId;
			for (var j=0; i<this.props.child.data.length; j++) {
				if (this.props.child.data[j][cfld].indexOf(masterId) > -1) {
					this.props.items[i].childCount++;
				}
			}
      	}
      	*/

      	var masterCnts = {};
      	var childItems = {}; //after thought bolt on
      	var masterIdFld = this.props.child.masterId;
      	var masterdata = this.props.items;
      	var childdata = this.props.child.data;
      	var children = childdata.length;
      	var childIdFld = this.props.child.childId;

      	//put the master list into an assoc. array:
      	for (var i=0; i<masterdata.length; i++) {
      		var row = masterdata[i];
      		var masterId = row[masterIdFld];
			masterCnts[masterId] = 0;
			childItems[masterId] = new Array(); //bolt on
      	}
      	//iterate through the children
      	for (var i=0; i<children; i++) {
      		var row = childdata[i];
      		var idfld = row[childIdFld];
      		var idcnt = idfld.length;
      		for (var j=0; j<idcnt; j++) {
      			masterCnts[ idfld[j] ]++;
      			if (childItems[ idfld[j] ]) childItems[ idfld[j] ].push(row); //bolt on
      		}
      	}
      	//put the child counts back into master items
      	for (var i=0; i<masterdata.length; i++) {
      		var row = masterdata[i];      		
      		var masterId = row[masterIdFld];
			if (row.__all) {
				row.__childCount = children;
				row.children = childdata; //bolt on
			} else {
				row.__childCount = masterCnts[ masterId ];
				row.children = childItems[ masterId ]; //bolt on			
			}
      	}
      },
      onItemSelect: function(item) {
		if (item.__all) {
			if (item.selected) {
				//uncheck/disable all others
				var items = this.state.items;
				for (var i=1; i<items.length; i++) {
					items[i].selected = false;
					items[i].disabled = true;
				}
				this.setState({items:items});
			} else {
				//enable all
				var items = this.state.items;
				for (var i=1; i<items.length; i++) {
					items[i].disabled = false;
				}
				this.setState({items:items});				
			}
		}      	
      },
      getInitialState: function(){
      	var items = this.props.items;
		if (this.props.child.all) { 
			this.props.child.all.data.__all = true;
			items.splice(0,0,this.props.child.all.data);  //insert an "All" row at the top.
		}
      	this.needsChildCount() && this.getChildCounts();  //insert a child-count attr for each item.
     
        return {items:items, listid:this.props.listid};
      },
      render: function(){
        var that = this;

        var headers = [];
        for (var i=0; i<this.props.columns.length; i++) {
        	headers.push(this.props.columns[i].heading);
        }
		var rootClasses = "itemList";		
        var itemNodes = this.state.items.map(function (item) {
          	return <MasterItem item={item} listid={that.props.listid} key={item.id} columns={that.props.columns} itemselect={that.onItemSelect} />
        });        
        return (
            <div className={rootClasses}>
            	<MasterHeader data={headers} columns={that.props.columns} />
                { itemNodes }
            </div>
        );
      }
    }),

    "TrackingDetails" :  React.createClass({
      render: function() {
         return(
              <div className="row">
                <div className="col-md-4">
                  <div className="tracking-detail">Unique Opens</div>
                  <div>{this.props.data.opens}</div>
                </div>
                <div className="col-md-4">
                  <div className="tracking-detail">Unique Clicks</div>
                  <div>{this.props.data.clicks}</div>
                </div>
                <div className="col-md-4">
                  <div className="tracking-detail">Total Bounces</div>
                  <div>{this.props.data.bounces}</div>
                </div>
              </div>
                );
           }
      }),

      "ListCount" : React.createClass({
				getInitialState: function() {
					var lists = this.props.data;
					var listCount = lists.length;
					return {"count" : listCount };
				},
        render: function() {
          return (
           <div className="counts text-center">
            <span className="title"><small>Lists</small></span>
            <span className="count">{this.state.count}</span>
          </div>
          );
        }
      }),

    "SubscriberCount" : React.createClass({
			getInitialState: function() {
				var clients = this.props.data;
				var clientCount = clients.length;
				return {"count" : clientCount };
			},
      render: function() {
        return (
         <div className="counts text-center">
          <span className="title"><small>Clients</small></span>
          <span className="count">{this.state.count}</span>
        </div>
        );
      }
    }),

    "EmailDetails" : React.createClass({
      render: function() {
        return (
         <div className="email-details">
              <h5>Subject</h5>
              <div>{this.props.data.subject}</div>

              <h5>Name</h5>
              <div>{this.props.data.name}</div>
        </div>
        );
      }
    }),

    "LastModifiedDetails" : React.createClass({
      render: function() {
        return (
         <div className="row modify-details">
              <div className="col-md-6">
              <h5>Created</h5>
              <div>{this.props.data.createDate}</div>
              </div>
              <div className="col-md-6">
              <h5>Modified</h5>
              <div>{this.props.data.modifiedDate}</div>
              </div>
        </div>
        );
      }
    }),

    "CheckListPlus": React.createClass({
    	getInitialState: function(){
    		var state = {};
    		state.selected = createLookup(this.props.selected || []);
    		return state;
    	},
      	onSelectChange: function(id){
			this.state.selected[id] = this.refs[id].getDOMNode().checked;
			this.setState({selected: this.state.selected});
			if(this.props.onChange){
				var self = this;
				var selected = Object.keys(this.state.selected).filter(function(id){ return self.state.selected[id];})
				this.props.onChange(selected);
			}
      },
      componentWillReceiveProps: function(nextProps){
	    this.setState({selected : createLookup(nextProps.selected || [])});
      },
	  render: function() {
	  	var selectedLookup = this.state.selected;
	  	var self = this;

		return (
			<div className="checkLst">
			  {this.props.data.map(function(datum, index){
			  	 var text = datum.title || datum.name;
			  	 var checked = "";
			  	 if(selectedLookup[datum.id]){
			  	 	checked ="checked";
			  	 }
				  return (<div className="form-group" key={datum.id}>
					  <label>
					  	<input type="checkbox" ref={datum.id} checked={checked} onChange={self.onSelectChange.bind(self, datum.id)} />
						<div className="item">
							<div>{text}</div>
							<div className="itemInner">{datum.content}</div>
						</div>
						<div className="actions">
							<SearchButton />
						</div>
					  </label>
				  </div>);
			  })}
		</div>
		);
	}
}),
	"RadioList": React.createClass({
		getInitialState: function(){
			var state = {};
			if(this.props.check){
				state.selectedArr = this.props.selected || [];
			} else {
				state.selected = Array.isArray(this.props.selected)? this.props.selected[0]: this.props.selected;
			}
			return state;
		},
		componentWillReceiveProps: function(newProps){
			var newState = {};
			newState.selected = newProps.selected;
			this.setState(newState);
		},
		onChange: function(id){
			if(this.props.check){
				var selectedArr = this.state.selectedArr;
				if(this.refs[id].getDOMNode().checked){
					selectedArr.push(id);
				} else {
					selectedArr = selectedArr.filter(function(s){
						return s !== id;
					});
				}
				this.setState({selectedArr: selectedArr});
				if(this.props.onSelectionChange){
					this.props.onSelectionChange(selectedArr);
				}
			} else {
				var selected = this.state.selected;
				if(this.refs[id].getDOMNode().checked){
					selected = id;
				} else {
					selected = null;
				}
				this.setState({selected: selected});
				if(this.props.onSelectionChange){
					this.props.onSelectionChange(selected);
				}
			}
		},
		render: function(){
			var items = this.props.source || [];
			var self = this;
			var type = this.props.check? "checkbox": "radio";
			var currentSelect;
			if(!this.props.check){
				currentSelect = {};
				currentSelect[this.state.selected] = true;
			} else {
				currentSelect = createLookup(this.state.selectedArr);
			}
			//TODO consider adding radio button name to group radio buttons correctly
			return (<div className="radio-list">
						{items.map(function(i){
							var checked = "";
							if(currentSelect[i.id]){
								checked = "checked";
							}
							var content = i.content;
							if(!content){
								if(i.name && i.email){
									content = (<div><div className="col-md-4">{i.name} </div><div className="col-md-7">{i.email} </div></div>)
								} else {
									content = (<div className="col-md-11">{i.name} </div>)
								}
							}
							return (<div className="row" key={i.id}>
								<input className="col-md-1" type={type} ref={i.id} checked={checked} onChange={self.onChange.bind(self,i.id)} />
								{content}
							</div>)
						})}
					</div>)
			}
	})
};
