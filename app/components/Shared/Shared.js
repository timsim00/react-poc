var React = require('react'),
	moment = require('moment'),
    PubSub = require('pubsub-js');


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

var SearchButton = React.createClass({
    render: function(){
        return (<div className="search-button">
            <span className="glyphicon glyphicon-search" />
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
                <img src={'./images/' + this.props.imageUrl} className="img-responsive" height="75"  />
            </div>
             <div className="text-center">
                 <button className="btn btn-xs btn-primary">View</button>
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
			state.selected = this.props.selected;
			return state;
		},
		componentWillReceiveProps: function(newProps){
			var newState = {};
			newState.selected = newProps.selected;
			this.setState(newState);
		},
		onChange: function(id){
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
		},
		render: function(){
			var items = this.props.source || [];
			var self = this;
			var currentSelect = this.state.selected;
			//TODO consider adding radio button name to group radio buttons correctly
			return (<div>
						{items.map(function(i){
							var checked = "";
							if(currentSelect === i.id){
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
								<div className="col-md-1"><input type="radio" ref={i.id} checked={checked} onChange={self.onChange.bind(self,i.id)} /></div>
								{content}
							</div>)
						})}
					</div>)
			}
	})
};
