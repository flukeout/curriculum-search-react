// Pill for each individual filter option

var FilterOption = React.createClass({
  gotClicked : function(){
    this.props.changeOption(this.props.category, this.props.label, !this.props.enabled);
  },
  getClass : function(){
    return this.props.enabled ? "filter-option active" : "filter-option";
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