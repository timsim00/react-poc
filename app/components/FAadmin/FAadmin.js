var React = require('react');

var FAadmin = React.createClass({
  render: function() {
    return (

<div className="container">
<h3>FA Administration</h3>

<div className="row">
  <div className="col-md-3">
	<h4>FA Personalization</h4>
  </div>
  <div className="col-md-8">
	<div className="row">
		<div className="col-md-5">&nbsp;</div>
		<div className="col-md-5"><button type="button" className="btn btn-primary">Edit</button> <button type="button" className="btn btn-primary">Update</button></div>
	</div>
  <div className="row">
		<div className="col-md-3">Name</div>
		<div className="col-md-8">Matthew Crowley</div>
	</div>
  
	<div className="row">
		<div className="col-md-3">Title 1</div>
		<div className="col-md-8">Senior Vice President</div>
	</div>
  
	<div className="row">
		<div className="col-md-3">Title 2</div>
		<div className="col-md-8">Wealth Advisor</div>
	</div>
  
	<div className="row">
		<div className="col-md-3">Email Address</div>
		<div className="col-md-8">matthew.crowley@f1f.com</div>
	</div>
  
	<div className="row">
		<div className="col-md-3">Branch</div>
		<div className="col-md-8">1110 Park Avenue Plaza</div>
	</div>
  
	<div className="row">
		<div className="col-md-3">Twitter Handle</div>
		<div className="col-md-8">@MattCrowleyMS</div>
	</div>
	<br /><br />
	<div className="row">
		<div className="col-md-3">Direct Phone</div>
		<div className="col-md-8">555-434-6789</div>
	</div>

	<div className="row">
		<div className="col-md-3">Branch Phone</div>
		<div className="col-md-8">555-434-6700</div>
	</div>

	<div className="row">
		<div className="col-md-3">Mail Address</div>
		<div className="col-md-8">Park Avenue Plaza/55 East 52nd St 28th Floor, New York, NY 10055</div>
	</div>

	<div className="row">
		<div className="col-md-3">Your Photo</div>
		<div className="col-md-8">
			<div className="input-group input-group-sm">
			<input type="text" className="form-control" placeholder="Photo" />&nbsp;<button type="button" className="btn btn-primary">Browse</button>
			</div>
		</div>
	</div>
	<div className="row">
		<div className="col-md-3">
		</div>
		<div className="col-md-8">Dimensions should be up to 80px wide x 80px tall<br />
			Supported file formats are .jpg and .gif</div>
	</div>
	<div className="row">
		<div className="col-md-3">
		</div>
		<div className="col-md-3"><img data-src="holder.js/80x80" width="80" height="80" />
		
		
		</div>
		<div className="col-md-3">This photograph will show up on newsletters and personalized communications sent via email.
		</div>
	</div>
	
  </div>
</div>
</div>
		
		
    );
  }

});

module.exports = FAadmin;
