var React = require('react');

jQuery("html").on("click", ".folder-head", function(){
    jQuery(this).toggleClass("collapsed").toggleClass("expanded");
});


var createFolder = function(data, index){
    var children;
    if(data.folders && data.folders.length > 0){
        children = data.folders.map(function(f,i){
            return createFolder(f,i);
        })
    } else {
        children = "";
    }
    
    var folderHeadClasses = "folder-head collapsed";
    if(data.name === "Retirement" || data.name === "Shared Emails" || data.name === "Newsletters" )  { 
    	folderHeadClasses = "folder-head expanded";
    }
    
    return (<div className="folder" key={index}>
        <div className={folderHeadClasses} >
        	<span className="folder-icon">
				<span className="glyphicon glyphicon-folder-close" />
				<span className="glyphicon glyphicon-folder-open" />
            </span>
            <span className="folder-name">{data.name}</span>
        </div>
        <div className="children">
            {children}
        </div>
    </div>)
}

var FolderTree = React.createClass({
  handleClick: function(e){
      console.log(e);
  },
  render: function() {
    return (
     <div className="folder-list">
        {this.props.folders.map(function(f, i){
            return (createFolder(f, i));
        })}
    </div>
    );
  }
});

module.exports = FolderTree;
