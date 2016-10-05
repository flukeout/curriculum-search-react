// Pill for each individual filter option
var FilterOption = React.createClass({
  gotClicked : function(){
    // Sends the opposite value of it's current
    this.props.changeOption(this.props.category, this.props.label, !this.props.enabled);
  },
  getClass : function(){
    if(this.props.enabled) {
      return "filter-option active";
    } else {
      return "filter-option";
    }
  },
  render: function() {
    return (
      <div className="filter-option">
        <button className={ this.getClass() } onClick={ this.gotClicked }>{ this.props.label }</button>
      </div>
    );
  }
});

module.exports = FilterOption;