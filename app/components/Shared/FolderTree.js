var React = require('react'),
	$ = require('jquery'),
    PubSub = require('pubsub-js');

jQuery("html").on("click", ".folder-head", function(e){
	var $ele = $(e.target);
	if (!$ele.hasClass('folder-head')) $ele = $ele.closest('.folder-head');
	$ele = $ele.find('.folder-name');
    jQuery(this).toggleClass("collapsed").toggleClass("expanded");    
    var id = $ele.data('folderid');
    PubSub.publish( 'Folder-Selected', {name: $ele.text(), id: id} );
});


var createFolder = function(data, index, handleFolderClick){
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
            <span onClick={handleFolderClick} data-folderid={data.id} className="folder-name">{data.name}</span>
        </div>
        <div className="children">
            {children}
        </div>
    </div>)
}

var FolderTree = React.createClass({
  handleFolderClick: function(e){
	//TODO 
  },
  render: function() {
  	var that = this;
    return (
     <div className="folder-list">
        {this.props.folders.map(function(f, i){
            return (createFolder(f, i, that.handleFolderClick));
        })}
    </div>
    );
  }
});

module.exports = FolderTree;
