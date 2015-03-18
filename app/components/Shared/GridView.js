var React = require('react');

var Pagination = require("./Pagination.js").Pagination;

var Actions = React.createClass({
    render: function () {
        return ( <div title = "actions" >
        <i className="glyphicon glyphicon-pencil action" />
        <i className="glyphicon glyphicon-file action" />
        <i className="glyphicon glyphicon-envelope action" />
        <i className="fa fa-eyedropper"></i>
        </div>)
    }
})

var GridView = React.createClass({
  render: function() {
    return (
    	<div>
		 <div className="grid">
			<table className="table">
				<thead>
					<tr>
						{this.props.data.columns.map(function(c,i){
							return (<th key={i}> {c} </th> )
		})
		} </tr>
				</thead> {
    this.props.data.rows.map(function (row, i) {
			return ( <tr key={i}> {
				row.map(function (r,i) {
					return ( <td key={i}> {
						r
					} </td>)
					})}
          <td><Actions /></td>
          </tr> )
				})
			} </table>
		</div>
		<div>
			<Pagination data={this.props.data.pageData} />
		</div>
    <div className="clearfix"></div>
    </div>
);
    }
  });

 module.exports = GridView;
