// Text input search field with a clear X button

var ResultsTitle = React.createClass({
  getInitialState: function(){
    return {
      hasTerm : false
    }
  },
  render: function() {
    var heading = "Popular Topics"

    if(this.props.resultcount > 0) {
      heading = this.props.resultcount + " Results";
    }

    return (
      <div className="results-title">
        <h3>{ heading }</h3>
      </div>
    );
  }
});

module.exports = ResultsTitle;
