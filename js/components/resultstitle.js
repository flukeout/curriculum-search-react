// Text input search field with a clear X button

var ResultsTitle = React.createClass({
  getInitialState: function(){
    return {
      hasTerm : false
    }
  },
  
  toggleCollections : function(e){
    this.props.toggleCollections(e.target.checked);
  },
  
  render: function() {
    var heading = "Popular Topics"


    if(this.props.resultcount > 0) {
      heading = this.props.resultcount + " Results";
    }

    return (
      <div className="results-title">
        <h3>
          { heading }
          <label><input checked={ this.props.showCollections ? "checked" : null } onChange={ this.toggleCollections } type="checkbox"/> Include Collections</label>
        </h3>
      </div>
    );
  }
});

module.exports = ResultsTitle;
