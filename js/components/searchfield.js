// Text input search field with a clear X button

var SearchField = React.createClass({
  getInitialState: function(){
    return {
      hasTerm : false
    }
  },
  sendTimeout : false,
  keyDown : function(){
    var inputValue = this.refs.searchInput.value;
    inputValue = inputValue.trim();

    var that = this;

    clearTimeout(this.sendTimeout);

    this.sendTimeout = setTimeout(function(){
      that.sendSearchString(inputValue);
    },400);

    this.setState({
      hasTerm : inputValue.length > 0
    });
  },
  sendSearchString : function(string){
    this.props.onUpdate(string);
  },
  clearSearch : function(){
    this.refs.searchInput.value = "";
    this.setState({
      hasTerm : false
    });
    this.props.onUpdate("");
     clearTimeout(this.sendTimeout);
     this.sendSearchString("");
  },
  render: function() {
    return (
      <div className="search-field">
        <span className="input-wrapper">
          <input ref="searchInput" onKeyUp={ this.keyDown } className="search" placeholder="Search by topic, description or tag" type="text"/>
          { this.state.hasTerm ? <a onClick={ this.clearSearch } href="#"></a>  : null }
          { this.state.hasTerm ? null : <span className="icon"></span> }
        </span>
      </div>
    );
  }
});

module.exports = SearchField;
