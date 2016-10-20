var FilterOption = require("./filteroption.js");
var SliderWithLabels = require("./sliderwithlabels.js");

// This the gray box with all the filter options down below...
var FilterWrapper =  React.createClass({
  render: function() {

    var filterData = this.props.filterData;

    var optionUI; // holds the final UI markup

    var that = this;

    optionUI = filterData.map(function(optionGroup){

      if(optionGroup.interface_type == "pills") {

        var optionSet = optionGroup.options.map(function(item){
        var enabled = false;

        if(optionGroup.enabledOptions){
          if(optionGroup.enabledOptions.indexOf(item) > -1) {
            enabled = true;
          }
        }
        return ( <FilterOption key={ item } category={ optionGroup.name } enabled={ enabled } changeOption={ that.props.setOption } label={item} /> )
      });

        return (
          <div className="option-set">
            { optionGroup.optionLabel ? <strong className='label'> { optionGroup.optionLabel } </strong> : null }
            { optionSet }
          </div>
        );
      }

      if(optionGroup.interface_type == "slider"){
        var value = optionGroup.default_option || optionGroup.options[0]; // Sets default value if available

        if(optionGroup.enabledOptions) {
          if(optionGroup.enabledOptions.length > 0) {
            value = optionGroup.enabledOptions[0];
          }
        }
        return ( <SliderWithLabels options={ optionGroup.options } optionLabel={ optionGroup.optionLabel } category={ optionGroup.name } value={ value } changeOption={ that.props.setOption } /> )
      }
    });

    var arrowStyle = {
      left : this.props.arrowPosition
    }

    return (
      <div className="filter-wrapper">
        <div className="arrow-wrapper">
          <div style={ arrowStyle } className="arrow"></div>
        </div>
        <div className="filters">
          { optionUI }
        </div>
      </div>
    );
  }
});

module.exports = FilterWrapper;
