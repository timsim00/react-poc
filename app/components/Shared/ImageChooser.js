var React = require('react');

(function (global) {
    var imagesPerRow = 3,
        chooseFiles,
        columns,
        previews;

    function windowLoadHandler() {
        global.removeEventListener("load", windowLoadHandler);
        chooseFiles = document.getElementById("chooseFiles");
        columns = document.getElementById("columns");
        previews = document.getElementById("previews");
        var row = columns.insertRow(),
            header,
            i;

        for (i = 0; i < imagesPerRow; i += 1) {
            header = row.insertCell();
            header.style.width = (100 / imagesPerRow) + "%";
        }

        chooseFiles.addEventListener("change", PreviewImages, false);
    }    
    
    function PreviewImages() {
        var row;

		if(chooseFiles.files.length > 0){
			jQuery("#image-preview-placeholder").hide();
		}

        Array.prototype.forEach.call(chooseFiles.files, function (file, index) {
            var cindex = index % imagesPerRow,
                oFReader = new FileReader(),
                cell,
                image;

            if (cindex === 0) {
                row = previews.insertRow(Math.ceil(index / imagesPerRow));
            }

            image = document.createElement("img");
            image.id = "img_" + index;
            image.style.width = "100%";
            image.style.height = "auto";
            cell = row.insertCell(cindex);
            cell.appendChild(image);

            oFReader.addEventListener("load", function (evt) {
                image.src = evt.target.result;
                this.removeEventListener("load");
            }, false);

            oFReader.readAsDataURL(file);
        });
    }

    global.addEventListener("load", windowLoadHandler, false);
}(window));

jQuery(document).on('change', '.btn-file :file', function() {
    var input = jQuery(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

jQuery(document).ready( function() {
    jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        jQuery("#fileName").text(label);
    });
});

var ImageChooser = module.exports.ImageChooser = React.createClass({
    render: function() {
       return(
           <div id="imagesDiv" className="rounded form-group">
                <span className="btn btn-primary btn-file col-md-3">
					Browse <input type="file" id="chooseFiles" multiple="multiple" accept="image/*" />
				</span>
				<span id="fileName" className="col-md-6"></span>
            </div>
       ); 
    }
});


var ImagePreview = module.exports.ImagePreview = React.createClass({
	render: function(){
		return (
			<div className="image-preview">
				<img id="image-preview-placeholder" className="image-preview-holder" data-src="holder.js/150x150" width="150" height="150" />
				<table id="previewTable">
                    <thead id="columns"></thead>
                    <tbody id="previews"></tbody>
                </table>
            </div>
		);
	}
})
