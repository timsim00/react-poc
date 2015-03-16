var React = require('react');

var Item = module.exports.Item = React.createClass({
    __changeSelection: function(item) {
        item.selected = !item.selected;
    },
    render: function () {
      return (
        <li className="list-group-item"><input type="checkbox" onChange={this.__changeSelection.bind(this, this.props.item)}/>&nbsp;{ this.props.item.title }</li>
      );
    }
});

var ItemList = module.exports.ItemList = React.createClass({
  render: function(){
 	var that = this;
    var itemNodes = this.props.data.items.map(function (item, i) {
      return <Item item={item} order={i} />
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
