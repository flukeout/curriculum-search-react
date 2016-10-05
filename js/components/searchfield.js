// Text input search field with a clear X button

var SearchField = React.createClass({
  getInitialState: function(){
    return {
      hasTerm : false
    }
  },
  keyDown : function(){
    var inputValue = this.refs.searchInput.value;
    inputValue = inputValue.trim();
    this.props.onUpdate(inputValue);
    this.setState({
      hasTerm : inputValue.length > 0
    });
  },
  clearSearch : function(){
    this.refs.searchInput.value = "";
    this.setState({
      hasTerm : false
    });
    this.props.onUpdate("");
  },
  render: function() {
    return (
      <div className="search-field">
        <span className="input-wrapper">
          <input ref="searchInput" onKeyUp={ this.keyDown } className="search" placeholder="Search by topic, description or tag" type="text"/>
          { this.state.hasTerm ? <a onClick={ this.clearSearch } href="#"></a>  : null }
        </span>
      </div>
    );
  }
});

module.exports = SearchField;
