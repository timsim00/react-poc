var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    $ = require('jquery'),
    PubSub = require('pubsub-js'),
    ModalContainer = require('./ModalContainer'),
    Settings = require('./Settings');

/****  Content Thumbnails ****/

var thumbs = require("../../data/emails"); //TODO: pass this in from where it's used. don't declare here.
var tags = require("../../data/tags");
var imgPath = '/images/';
var EmailThumbs = React.createClass({
	subscriptions: {},
	getInitialState: function() {
		return {
			selectedId: null,
			folder: 7,
			thumbs: thumbs,
			searchMode: false,
			searchTerm: ''
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
		this.state.searchMode = false;
		this.state.searchTerm = '';
		this.setState({folder: data.id, searchMode: this.state.searchMode, searchTerm: this.state.searchTerm});
	},
	handleSearchTerm: function(msg, data) {
		this.state.searchMode = true;
		this.state.searchTerm = data;
    PubSub.publish( 'Search-Term-Name', {name:'Search Results for "'+ this.state.searchTerm +'"'} );
		this.setState({ searchMode: this.state.searchMode, searchTerm: this.state.searchTerm });
	},
	componentDidMount: function() {
		this.subscriptions['Folder-Selected'] = PubSub.subscribe( 'Folder-Selected', this.handleFolderSelected );
		this.subscriptions['Search-Term-Entered'] = PubSub.subscribe( 'Search-Term-Entered', this.handleSearchTerm );
	},
	componentWillUnmount: function() {
		PubSub.unsubscribe( this.subscriptions['Folder-Selected'] );
		PubSub.unsubscribe( this.subscriptions['Search-Term-Entered'] );
	},
	onEmailSettingsChange: function(id, changes){
		var changedThumb = thumbs.filter(function(th){
			return th.id === id;
		})[0];
		if(changes.entitlements){
			changedThumb.entitlements = changes.entitlements;
		}
		if(changes.types){
			changedThumb.type = changes.types;
		}
		if(changes.tags){
			changedThumb.tags = changes.tags;
		}
		this.setState({thumbs: thumbs});
	},
    render: function() {
    	var that = this;
    	var search = this.props.search;
	  	var types = this.props.types.map(function(t){return t.id});
	  	//var selectedStyle = {visibility:"hidden"};
  		var thumbList;
  		if (!this.state.searchMode) {
  			thumbList = this.state.thumbs.filter(function(t){
  				return t.folder === that.state.folder;
  			}).filter(function(t){
  				return types.length === 0 || types.indexOf(t.type) != -1;
  			});
		} else {
  			thumbList = that.state.thumbs.filter(function(t){
  				return t.name.toLowerCase().indexOf(that.state.searchTerm.toLowerCase()) !== -1;
  			});
		}
		var rootClasses = this.props.settings? "email-edit": "email-select";
		var tagLookup = tags.reduce(function(lookup, tag){lookup[tag.id] = tag; return lookup;},{});
        return(
		<div id="createEmail" className={rootClasses}>
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
              {(t.tags ||[]).map(function(tg, index){
              	var content = (index > 0 && index % 4 === 0)? <br /> : "";
              	return <span className="tag-text">{content}{tagLookup[tg].name}</span>
              })}
            </div>
            <div className="col-md-6 actions">
              <span className="selected-indicator fa fa-check fa-lg"></span>

                <ModalContainer size="xsmall" icon="eye" cta="View" title={t.name}>
  					{
                      function(t) {
                      	var classes = "col-md-12";
                      	var content = "";
                      	if(that.props.settings){
                      		classes = "col-md-6";
                      		content = (<div className={classes}>
                        			<Settings email={t} onChange={that.onEmailSettingsChange.bind(that, t.id)}/>
                        		</div>)
                      	}

                        return (
                        	<div>
                        		<div className={classes}>
                        			<img src={"./images/" + t.image} className="img-responsive emailPreview" />
                        		</div>
                        		{content}
                        	</div>
                        )
                      }(t)
                    }
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
