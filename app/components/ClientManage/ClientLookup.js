var React = require('react');

var items = [
  { title: "Publication 1"},
  { title: "Publication 2"},
  { title: "Publication 3"},
  { title: "Publication 4" },
  { title: "Publication 5" },
  { title: "Publication 6"},
  { title: "Publication 7"},
  { title: "Publication 8" }
];

var items2 = [
  { title: "Unsubscribe From All"},
  { title: "I certify that this client has requested&nbsp; to be added back into the Morgan&nbsp;Stanley Email Program."},
  { title: "Publication 3"},
  { title: "Publication 4" },
  { title: "Publication 5" },
  { title: "Publication 6"},
  { title: "Publication 7"},
  { title: "Publication 8" }
];

var Item = React.createClass({
    render: function () {
      return ( 
        <li className="list-group-item"><input type="checkbox"/>&nbsp;{ this.props.item.title }</li>
      );
    }
});

var ItemList = React.createClass({
  getInitialState: function(){
    var itemList = this.props.items.map(function(item, i){
      item.done = false;
      // Unclock first item in the list
      item.locked = (i == 0) ? false : true;
      return item;
    });
    return {items:items};
  },
  render: function(){
    var that = this;
    var itemNodes = this.state.items.map(function (item, i) {
      return <Item item={item} order={i} clicked={that.whenClicked} />
    });
    return ( 
      <ul className="list-group">
        { itemNodes } 
      </ul>
    );
  }  
});



var ClientLookup = React.createClass({
 render: function() {
    return (
    <div>
      <div>
        <div className="input-group">
            <input type="text" className="form-control" aria-label="..." placeholder="email address" id="emailAddr"/>
            <div className="input-group-btn" >
                <button type="button" className="btn btn-default">Search</button>
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                    <li><a href="#">Update</a></li>
                    <li><a href="#">Add new client</a></li>
                </ul>
            </div>  
        </div> 
        <br/>
        <form className="form-inline" role="form">
            <div className="form-group">
            <label htmlFor="inpFirstName" className="sr-only">First Name</label>
            <input type="text" id="inpFirstName" className="form-control" aria-label="..." placeholder="First Name" disabled/>
            </div>
            <div className="form-group">
            <label htmlFor="inpLastName" className="sr-only">Last Name</label>
            <input type="text" id="inpLastName" className="form-control" aria-label="..."  placeholder="Last Name" disabled/>   
            </div>
        </form>
      </div>
      
      <br /><br /><br /><br /><br /><br />      
      <label htmlFor="scrollPaneClientLookup" >Subscriptions</label>
      <div className="scrollPaneClientLookup" id="scrollPaneClientLookup">
        <ItemList items={items}/>  
	<table>
		<tr>
			<td><input type="checkbox"/></td><td>Unsubscribe From All&nbsp;</td>
			<td><input type="checkbox"/></td><td>I certify that this client has requested to be added back into to the Morgan Stanley Email Program.</td>
		</tr>
               
	</table>
      </div>
			                <button type="button" className="btn btn-default">Submit</button>


    </div>    
    );
  }

});

module.exports = ClientLookup;
