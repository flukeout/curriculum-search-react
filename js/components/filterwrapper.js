var FilterOption = require("./filteroption.js");
var SliderWithLabels = require("./sliderwithlabels.js");

// This the gray box with all the filter options down below...
var FilterWrapper =  React.createClass({
  render: function() {

    var filterData = this.props.filterData;

    var optionUI; // holds the final UI markup

    var that = this;

    if(filterData.interface_type == "pills") {
      var optionGroups = []; // Will create an array of all the option sets to iterate over

      optionGroups.push({
        name: filterData.name ,
        options: filterData.options,
        optionLabel: filterData.optionLabel || false
      });

      if(filterData.more_options){
        for(var i = 0; i < filterData.more_options.length; i ++) {
          var optionGroup = filterData.more_options[i];
          optionGroups.push(optionGroup);
        }
      }

      var that = this;

      optionUI = optionGroups.map(function(optionGroup){

        var optionSet = optionGroup.options.map(function(item){
          var enabled = false;
          if(filterData.enabledOptions){
            if(filterData.enabledOptions.indexOf(item) > -1) {
              enabled = true;
            }
          }
          return ( <FilterOption category={ optionGroup.name} enabled={ enabled } changeOption={ that.props.setOption } label={item} /> )
        });

        return (
          <div className="option-set">
            { optionGroup.optionLabel ? <strong className='label'> { optionGroup.optionLabel } </strong> : null }
            { optionSet }
          </div>
        );
      });
    }

    if(filterData.interface_type == "slider"){
      var value = filterData.default_option || filterData.options[0]; // Sets default value if available

      if(filterData.enabledOptions) {
        if(filterData.enabledOptions.length > 0) {
          value = filterData.enabledOptions[0];
        }
      }
      optionUI = ( <SliderWithLabels options={ filterData.options } optionLabel={ filterData.optionLabel } category={ filterData.name } value={ value } changeOption={ that.props.setOption } /> )
    }

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
