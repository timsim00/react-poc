var React = require('react');

var ImageChooser_ = require('../Shared/ImageChooser');
var ImageChooser = ImageChooser_.ImageChooser;
var ImagePreview = ImageChooser_.ImagePreview;


//data
var data = require('../../data/fa-info');


//components
var Container =  require('../Shared/Container');


var FAdetail = React.createClass({
  render: function() {
    return (
      <div>
      {this.props.data.filter(function(e) {
        return e.type !== "Your Photo";
      }).map(function(item){
        return (
          <div className="row">
            <div className="col-md-2 bold">{item.type}</div>
            <div className="col-md-8">{item.value}</div>
          </div>
        );
      })}
      </div>
    );
  }
});

var FAphoto = React.createClass({
  render: function() {
      return (
      <div>
        <div className="row">
          <div className="col-md-2 bold">Your Photo</div>
          <div className="col-md-8">
              <div className="col-md-6">
                <div className="row">
              <ImageChooser />
            </div>
            <div className="row">
              <small>
                <div>Dimensions should be up to 80px wide x 80px tall</div>
                <div>Supported file formats are .jpg and .gif</div>
              </small>
            </div>
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="col-md-2">
              <ImagePreview />
            </div>
            <div className="col-md-3 small">This photograph will show up on newsletters and personalized communications sent via email.</div>
          </div>
        </div>
      </div>
      );
  }
});

var FAadmin = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row pageTitle">
          <div className="col-md-6">
            <h2>Update your Financial Advisor Information</h2>
          </div>
          <div className="col-md-6 text-right">
            <button type="button" className="btn btn-primary">Edit</button>&nbsp;
            <button type="button" className="btn btn-primary">Update</button>
          </div>
        </div>
        <Container title="Your Details">
          <FAdetail data={data} />
          <FAphoto />
        </Container>
      </div>
    );
  }

});



module.exports = FAadmin;