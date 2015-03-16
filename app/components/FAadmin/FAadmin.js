var React = require('react');

var FAadmin = React.createClass({
  render: function() {
    return (


<div>
  <div className="row">
    <div className="col-md-6 ">
      <h2>Update your Financial Advisor Information</h2>
    </div>
    <div className="col-md-6 text-right">
      <button type="button" className="btn btn-primary">Edit</button>&nbsp;
      <button type="button" className="btn btn-primary">Update</button>
    </div>
  </div>
  <div className="row">
    <div className="col-md-2 bold">Name</div>
    <div className="col-md-8">Matthew Crowley</div>
  </div>
  <div className="row">
    <div className="col-md-2 bold">Title 1</div>
    <div className="col-md-8">Senior Vice President</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Title 2</div>
    <div className="col-md-8">Wealth Advisor</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Email Address</div>
    <div className="col-md-8">matthew.crowley@f1f.com</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Branch</div>
    <div className="col-md-8">1110 Park Avenue Plaza</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Twitter Handle</div>
    <div className="col-md-8">@MattCrowleyMS</div>
  </div>
  <br /><br />
  <div className="row">
    <div className="col-md-2 bold">Direct Phone</div>
    <div className="col-md-8">555-434-6789</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Branch Phone</div>
    <div className="col-md-8">555-434-6700</div>
  </div>

  <div className="row">
    <div className="col-md-2 bold">Mail Address</div>
    <div className="col-md-8">Park Avenue Plaza/55 East 52nd St 28th Floor, New York, NY 10055</div>
  </div>


  <div className="row">
    <div className="col-md-2 bold">Your Photo</div>
    <div className="col-md-8 form-inline">
      <div className="form-group">
      <input type="text" className="form-control" placeholder="Photo" />&nbsp;<button type="button" className="btn btn-primary">Browse</button><br/>
      <small>Dimensions should be up to 80px wide x 80px tall<br />
        Supported file formats are .jpg and .gif</small>
      </div>
    </div>
    <div className="col-md-3 col-md-offset-2">
    <img data-src="holder.js/150x150" width="80" height="80" /><br />
    <small>This photograph will show up on newsletters and personalized communications sent via email.</small>
    </div>
  </div>
</div>


    );
  }

});

module.exports = FAadmin;
