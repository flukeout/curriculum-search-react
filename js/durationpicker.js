// This is the range slider for the duration

var DurationPicker =  React.createClass({
  getInitialState: function(){
    return {
      label : "",
      optioncount : Object.keys(this.props.options).length
    }
  },

  componentDidMount: function() {
    this.refs.input.value = parseInt(this.props.value);
    this.setLabel(this.props.value);
  },

  setLabel : function(val){
    this.setState({
      label : this.getLabel(val)
    })
  },

  change: function(e){
    var val = this.refs.input.value;
    this.setLabel(val);

    this.props.changeOption(this.props.category, this.props.value, false);

    if(val == 0){
      this.props.changeOption(this.props.category, val, false);
    } else {
      this.props.changeOption(this.props.category, val, true);
    }
  },

  getLabel(val) {
    return this.props.options[parseInt(val)];
  },

  render: function() {
    return (
      <div className="duration-slider">
        <strong>Time to complete</strong>
        <input ref="input" type="range" min="0" max={ this.state.optioncount - 1 }  onChange={ this.change } step="1" />
        <span className="value">{ this.state.label }</span>
      </div>
    );
  }
});

module.exports = DurationPicker;