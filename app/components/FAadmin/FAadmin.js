var React = require('react');

var ImageChooser_ = require('../Shared/ImageChooser');
var ImageChooser = ImageChooser_.ImageChooser;
var ImagePreview = ImageChooser_.ImagePreview;
//var AuthenticationRequired = require("../Authentication/AuthenticationRequired");

//data
var data = require('../../data/fa-info');

/*
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
</div><br/>
<div className="row">
<div className="col-md-8 col-md-offset-2">
  <div className="col-md-2">
    <ImagePreview imageUrl={this.props.imageUrl}/>
  </div>
  <div className="col-md-3 small">This photograph will show up on newsletters and personalized communications sent via email.</div>
</div>
</div>
*/



//components
var Container =  require('../Shared/Container');


var FAedit = React.createClass({
  getInitialState: function() {
    return {data:this.props.data.filter(function(e) {
      return e.type !== "Your Photo";
    })}
  },
  handleChange: function(i,event) {
    this.props.data[i].value = event.target.value;
    this.setState({data: this.props.data })
  },
  render: function() {
    var data = this.state.data;
    var self = this;
    return (
    <div className="form-horizontal">
        {data.map(function(item,i){
        return (
          <div className="form-group" key={item.type}>
              <label className="col-sm-2 control-label">{item.type}</label>
              <div className="col-sm-4">
                  <input type="text" className="form-control" placeholder={item.type} value={item.value} onChange={self.handleChange.bind(self, i)} />
              </div>
          </div>
        );
      })}
      <FAeditphoto imageUrl={this.props.imageUrl} />
    </div>
    );
  }
});

var FAeditphoto = React.createClass({
  render: function() {
      return (
        <div className="form-group">
          <label className="col-sm-2 control-label">Your Photo</label>
          <div className="col-sm-6">
            <div className="col-sm-2">
              <ImagePreview imageUrl={this.props.imageUrl}/>
            </div>
            <div className="col-sm-9">
              <ImageChooser />
                <div className="row">
                  <small>
                    <div>Dimensions should be up to 80px wide x 80px tall</div>
                    <div>Supported file formats are .jpg and .gif</div>
                  </small>
                </div>
            </div>
          </div>
        </div>
      );
  }
});

// var FAadmin = AuthenticationRequired.requireAuth(React.createClass({
//   handleChange: function(event) {
//     console.log(event);
//   },
//   render: function() {
//     return (
//       <div>
//         <div className="row pageTitle">
//           <div className="col-md-6">
//             <h2>Update your Financial Advisor Information</h2>
//           </div>
//           <div className="col-md-6 text-right">
//             <button type="button" className="btn btn-default">Save</button>
//           </div>
//         </div>
//         <Container title="Your Details">
//           <FAedit data={data.data} imageUrl={data.imageUrl} onChange={this.handleChange} />
//         </Container>
//       </div>
//     );
//   }
//
// }));

var FAadmin = React.createClass({
  handleChange: function(event) {
    console.log(event);
  },
  render: function() {
    return (
      <div>
        <div className="row pageTitle">
          <div className="col-md-6">
            <h2>Update your Financial Advisor Information</h2>
          </div>
          <div className="col-md-6 text-right">
            <button type="button" className="btn btn-default">Save</button>
          </div>
        </div>
        <Container title="Your Details">
          <FAedit data={data.data} imageUrl={data.imageUrl} onChange={this.handleChange} />
        </Container>
      </div>
    );
  }

});


module.exports = FAadmin;
