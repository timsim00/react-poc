var React = require('react');

var Item = React.createClass({
    render: function () {
      return (
          <tr>
          <td className="list-column"><input type="checkbox"/>&nbsp;{ this.props.item.title }</td>
              <td className="list-column">{ this.props.item.email }</td>
        </tr>
      );
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
            <div className="text-center">
                <img src="holder.js/50x75" />
            </div>
             <div className="text-center">
                 <button className="btn btn-sm btn-primary">View</button>
             </div>
        </div>
        );
      }
    }),

    "ItemList" : React.createClass({
      getInitialState: function(){
        var itemList = this.props.items.map(function(item, i){
          item.done = false;
          // Unclock first item in the list
          item.locked = (i == 0) ? false : true;
          return item;
        });
        return {items:itemList};
      },
      render: function(){
        var that = this;
        var itemNodes = this.state.items.map(function (item, i) {
          return <Item item={item} order={i} clicked={that.whenClicked} />
        });
        return (
            <table className="table">
                { itemNodes }
            </table>
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
