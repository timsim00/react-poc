var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    $ = require('jquery'),
    PubSub = require('pubsub-js'),
    ModalContainer = require('./ModalContainer'),
    Settings = require('./Settings');

/****  Content Thumbnails ****/

var thumbs = require("../../data/emails"); //TODO: pass this in from where it's used. don't declare here.
var imgPath = '/images/';
var EmailThumbs = React.createClass({
	subscriptions: {},
	getInitialState: function() {
		return {
			selectedId: null,
			folder: 7
		}
	},
	handleThumbClick: function(e) {
		e.preventDefault();
		var $ele = $(e.target);
		if (!$ele.hasClass('selectableEmailDivs')) $ele = $ele.closest('.selectableEmailDivs');
		var thisId = $ele.data('reactid');
		var id = $ele.find('img').attr('id');
		var $check = $ele.find('.selected-indicator');

		if (this.state.selectedId) {
			var $prev = $('*[data-reactid="'+ this.state.selectedId +'"]');
			//$prev.removeClass('active');
			$prev.find('.selected-indicator').removeClass('checked');
		}
		this.state.selectedId = thisId;
		//$ele.addClass('active');
		$check.addClass('content-selected').addClass('checked');

		PubSub.publish( 'Content-Selected', id );
	},
	handleFolderSelected: function(msg, data) {
		this.setState({folder: data.id});
	},
	componentDidMount: function() {
		//subscribe to next disable state event
		var token = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Folder-Selected'] = token;
	},
	componentWillUnmount: function() {
		//un-subscribe to next disable state event
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
	},
    render: function() {
    	var that = this;
	  	var types = this.props.types.map(function(t){return t.id});
	  	//var selectedStyle = {visibility:"hidden"};
  		var thumbList = thumbs.filter(function(t){
  				return t.folder === that.state.folder;
  			}).filter(function(t){
  				return types.length === 0 || types.indexOf(t.type) != -1;
  			});

        return(
		<div id="createEmail">
			{thumbList.map(function(t){
				return(
				<div onClick={that.handleThumbClick} className="btn btn-default selectableEmailDivs">
					<div className="row emailThumbName">
            <div className="col-md-12">
              {t.name}
            </div>
          </div>
          <div className="row emailThumbImg">
            <div className="col-md-12">
              <img className="img-responsive" id={t.id} src={imgPath + t.previewImage} height="220" width="200" />
            </div>
          </div>
          <div className="row emailThumbActions">
            <div className="col-md-6 tags">
              TAGS
            </div>
            <div className="col-md-6 actions">
              <span className="selected-indicator fa fa-check fa-lg"></span>

                <ModalContainer size="xsmall" icon="eye" cta="View" title={t.name}>
                  <div className="text-center">
  									{
                      function(t) {
                        if (!that.props.settings) {
                          return (<img src={"./images/" + t.image} className="img-responsive emailPreview" />);
                        }
                        else {
                          return (<Settings />);
                        }
                      }(t)
                    }
  								</div>
               </ModalContainer>
            </div>
          </div>
		   	</div>
		   		)
			})}
		</div>
       );
    }
});

module.exports = EmailThumbs;
