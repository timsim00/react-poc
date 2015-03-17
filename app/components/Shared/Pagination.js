var React = require('react');
var PageSizeDropdown = module.exports.PageSizeDropdown = React.createClass({
    render: function(){
        var sizes = this.props.sizes;
        return (
        	<span className="dropdown">&nbsp;
            	<button className="btn btn-default btn-xs dropdown-toggle" type="button" id="pageSize" data-toggle="dropdown" aria-expanded="false">
                	{sizes[0]}
					<span className="caret"/>
				 </button>
                <ul className="dropdown-menu" aria-labelledby="pageSize">
            	{sizes.map(function(s, i){
                	return (<li key={i}><a tabIndex="-1" href="#">{s}</a></li>);
            	})}
        		</ul>
        	</span>)
    }
});

var range = function(start,end){
    var output = []
    for(var i= start;i<=end;i++){
        output.push(i);
    }
    return output;
}

var PageIndexDropdown = module.exports.PageIndexDropdown = React.createClass({
    render: function(){
        var lastPage = this.props.lastPage;
        return (
        <span className="dropdown">
            <button className="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="pageIndex" data-toggle="dropdown" aria-expanded="false">
                1&nbsp;&nbsp;<span className="caret"/>
             </button>
                <ul className="dropdown-menu" aria-labelledby="pageIndex">
				{range(1,lastPage).map(function(s, i){
					return (<li key={i}><a tabIndex="-1" href="#">{s}</a></li>);
				})}
			</ul>
        </span>)
    }
});

module.exports.Pagination = React.createClass({
  render: function() {
      var data = this.props.data;
      var start = (data.pageIndex * data.pageSize) +1;
      var end = (data.pageIndex + 1)*data.pageSize;
      if(end > data.items){
          end = data.items;
      }
      var lastPage = Math.ceil(data.items/data.pageSize);
    return (
     <div>
      <div className="pull-left">
          <span>{start}-{end} of {data.items} items</span>
          <span><PageSizeDropdown sizes={data.pageSizeOptions}/> Per Page</span>
      </div>
      <div className="pull-right">
          <button className="btn btn-default btn-xs disabled">
              <span className="glyphicon glyphicon-arrow-left" />
          </button>&nbsp;
          <span><PageIndexDropdown lastPage={lastPage}/></span>&nbsp;
          <button className="btn btn-default btn-xs disabled">
              <span className="glyphicon glyphicon-arrow-right" />
          </button>
      </div>
    </div>
    );
  }
});
