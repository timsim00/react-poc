var React = require('react');

var Actions = React.createClass({
    render: function () {
        return ( <div title = "actions" >
        <span className="glyphicon glyphicon-pencil" />
        <span className="glyphicon glyphicon-file" />
        <span className="glyphicon glyphicon-envelope" />
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



var GridView = React.createClass({
  render: function() {
    return (
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
    </div> );
    }
  });

 module.exports = GridView;
