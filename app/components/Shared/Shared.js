var React = require('react');


var Item = React.createClass({
	__changeSelection: function(item) {
		var newValue = !this.state.selected;
        this.setState({selected: newValue});
        item.selected = this.state.selected;
        if(this.props.onChange){
        	this.props.onChange(item.id, newValue);
        }
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
    	var columns = (this.props.columns||0)
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
    	
      return (
			  <div className="row checkbox">
				<div className={lblClasses}>
					<label>
						<input type="checkbox" checked={checked} disabled={disabledAttr} onChange={this.__changeSelection.bind(this, this.props.item)}/>
						{ this.props.item.title }
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

module.exports = {
  "SearchBar" : React.createClass({
     render: function() {
       return (
        <div className="input-group input-group-sm">
         <input type="text" className="form-control" placeholder="Search" />
         <span className="input-group-addon" id="sizing-addon1">Search</span>
       </div>
       );
     }
   }),

   "EmailPreview" : React.createClass({
      render: function() {
        return (
        <div id="emailPreview">
            <div className="text-center email-preview">
                <img src="http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png" height="75" width="50" />
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
        return {items:itemList, selected: selected};
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

        var itemNodes = this.props.items.map(function (item) {
          return <Item item={item} key={item.id} columns={columns} onChange={that.handleFilterChange} />
        });
        return (
            <div className="itemLst">
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
                  <div>578</div>
                </div>
                <div className="col-md-4">
                  <div className="tracking-detail">Unique Clicks</div>
                  <div>43</div>
                </div>
                <div className="col-md-4">
                  <div className="tracking-detail">Total Bounces</div>
                  <div>0</div>
                </div>
              </div>
                );
           }
      }),

      "ListCount" : React.createClass({
        render: function() {
          return (
           <div className="counts text-center">
            <span className="title"><small>Lists</small></span>
            <span className="count">8</span>
          </div>
          );
        }
      }),

    "SubscriberCount" : React.createClass({
      render: function() {
        return (
         <div className="counts text-center">
          <span className="title"><small>Subscribers</small></span>
          <span className="count">180,718</span>
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
              <div>{this.props.data.created}</div>
              </div>
              <div className="col-md-6">
              <h5>Modified</h5>
              <div>{this.props.data.modified}</div>
              </div>
        </div>
        );
      }
    })
};
