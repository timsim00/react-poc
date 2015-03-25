var React = require('react'),
    _ = require('lodash');

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
    var self = this;
    return (
    	<div>
		 <div className="grid">
			<table className="table">
				<thead>
					<tr>
						{this.props.data.columns.map(function(c){

  							return (
                  <th key={c.data}>{c.col}</th>
                );
              })
		        }
          </tr>
				</thead>
        <tbody>
        {this.props.data.rows.map(function (row,i) {
  			return (
          <tr key={i}>
            {self.props.data.columns.map(function(c){
              return (
                  <td key={c.data}>{row[c.data]}</td>
                );
              })
            }
            </tr>
          )
				})
			}
        </tbody>
      </table>
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
