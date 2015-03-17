var React = require('react');

var Item = module.exports.Item = React.createClass({
    __changeSelection: function(item) {
        item.selected = !item.selected;
        if(this.props.onChange){
        	this.props.onChange();
        }
    },
    render: function () {
      return (
        <li className="list-group-item" key={this.props.key}><input type="checkbox" onChange={this.__changeSelection.bind(this, this.props.item)}/>&nbsp;{ this.props.item.title }</li>
      );
    }
});

var ItemList = module.exports.ItemList = React.createClass({
	handleFilterChange: function(){
		if(this.props.onChange){
			var selected = this.state.data.items.filter(function(i){ return i.selected;});
			this.props.onChange(selected);
		}
	},
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
    var itemNodes = this.props.data.items.map(function (item, i) {
      return <Item item={item} key={i} onChange={that.handleFilterChange} />
    });
    return (
    <div>
        <ul className="list-group">
            { itemNodes }
        </ul>
    </div>
    );
  }
});
