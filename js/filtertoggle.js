// Pill that shows and hides the corresponding filter set

var FilterToggle =  React.createClass({
  gotClicked : function(){
    this.props.onClick(this.props.filtername);

    var left = this.refs.button.offsetLeft;
    var width = this.refs.button.offsetWidth;

    // Let the parent know what the arrow position
    // Shoudl be based on it's positions
    this.props.reportCenter(left + width/2 - 10);
  },
  render: function() {
    var className = "";

    if(this.props.expanded) {
      className += " active";
    }

    if(this.props.enabled) {
      className += " filter-active";
    }

    return (
      <div className="filter-toggle">
        <button ref="button" className={ className } onClick={ this.gotClicked }>{ this.props.label }</button>
      </div>
    );
  }
});

module.exports = FilterToggle;
