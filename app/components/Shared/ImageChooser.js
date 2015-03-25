var React = require('react');

jQuery(document).on('change', '.btn-file :file', function() {
    var input = jQuery(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

jQuery(document).ready( function() {
    jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        jQuery("#fileName").text(label);
    });

    jQuery("#chooseFiles").on("change", function(){
    	if(chooseFiles.files.length > 0){
			jQuery("#image-preview-placeholder").hide();
		}

        Array.prototype.forEach.call(chooseFiles.files, function(file, index){
        	var oFReader = new FileReader();
        	var image = jQuery("<img />");
        	image.attr("id", "img_"+index);
        	jQuery("#imagePreviews").append(image);

        	oFReader.addEventListener("load", function (evt) {
                 image.attr("src", evt.target.result);
                 this.removeEventListener("load");
             }, false);

             oFReader.readAsDataURL(file);
        });
    });
});

var ImageChooser = module.exports.ImageChooser = React.createClass({
    render: function() {
       return(
        <div id="imagesDiv" className="rounded form-group">
                <span className="btn btn-primary btn-file col-md-3">
					Change Photo <input type="file" id="chooseFiles" multiple="multiple" accept="image/*" />
				</span>
				<span id="fileName" className="col-md-6"></span>
        </div>
       );
    }
});


var ImagePreview = module.exports.ImagePreview = React.createClass({
	render: function(){
		return (
			<div id="imagePreviews" className="image-preview">
        <img id="image-preview-placeholder" className="image-preview-holder" src={'./images/' + this.props.imageUrl} />
      </div>
		);
	}
})
