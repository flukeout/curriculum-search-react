//Slider with labels

var SliderWithLabels =  React.createClass({
  getInitialState: function(){
    return {
      optioncount : Object.keys(this.props.options).length,
      value : this.props.value
    }
  },

  componentDidMount: function() {
    this.refs.input.value = this.getOptionIndex(this.props.value);
  },

  change: function(e){
    var val = this.refs.input.value;

    // A '0' value means "any duration", so we can treat this filter as disabled.
    var enabled = true;
    val != 0 ? null : enabled = false;

    this.props.changeOption(this.props.category, this.getLabel(val), enabled);

    this.setState({
      value : this.getLabel(val)
    });
  },

  // Get numerical value of the current label
  getOptionIndex : function(label){
    return this.props.options.indexOf(label);
  },

  // Get label for specific numerical value in options array
  getLabel(val) {
    return this.props.options[parseInt(val)];
  },

  render: function() {
    return (
      <div className="slider-with-labels">
        <strong>{ this.props.optionLabel }</strong>
        <input ref="input" type="range" min="0" max={ this.state.optioncount - 1 }  onChange={ this.change } step="1" />
        <span className="value">{ this.state.value }</span>
      </div>
    );
  }
});

module.exports = SliderWithLabels;
