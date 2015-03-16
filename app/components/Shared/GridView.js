var React = require('react');

var Pagination = require("./Pagination.js").Pagination;

var Actions = React.createClass({
    render: function () {
        return ( <div title = "actions" >
        <span className="glyphicon glyphicon-pencil action" />
        <span className="glyphicon glyphicon-file action" />
        <span className="glyphicon glyphicon-envelope action" />
        <span title ="envelop-beaker" />
        </div>)
    }
})

var columns = ["Name","Subject", "Created", "Last Modified", "Actions"]
var data = [
     [
     "Sample Email 1",
     "Check out our latest news",
     "2/20/2015 12:50PM",
     "2/20/2015 12:52PM",
     <Actions />
     ],
     [
     "Derive - Room Preferences are set",
     "Your room preferences have been set",
     "1/25/2015 5:52PM",
     "2/5/2015 9:57PM",
     <Actions />
     ]
]

var pageData = {
    pageIndex: 0,
    pageSize: 25,
    items: 2,
    pageSizeOptions: [25,50]
}

var GridView = React.createClass({
  render: function() {
    return (
    	<div>
		 <div className="grid">
			<table className="table">
				<thead>
					<tr>
						{columns.map(function(c,i){
							return (<th key={i}> {c} </th> )
		})
		} </tr>
				</thead> {
		data.map(function (row) {
			return ( <tr> {
				row.map(function (r,i) {
					return ( <td key={i}> {
						r
					} </td>)
					})}</tr> )
				})
			} </table>
		</div>
		<div>
			<Pagination data={pageData} />
		</div>
    <div className="clearfix"></div>
    </div>
);
    }
  });

 module.exports = GridView;
