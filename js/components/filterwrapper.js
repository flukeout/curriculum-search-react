var FilterOption = require("./filteroption.js");
var SliderWithLabels = require("./sliderwithlabels.js");

// This the gray box with all the filter options down below...
var FilterWrapper =  React.createClass({
  render: function() {

    var filterData = this.props.filterData;

    var optionUI; // This is returned and injected in the render function

    var that = this;

    // If this filter is a Pills type
    if(filterData.type == "pills") {

      // an optionGroup is a set of related pills
      optionUI = filterData.optionGroups.map(function(optionGroup){

        var optionSet = optionGroup.options.map(function(item){
          var enabled = false;
          if(filterData.enabledOptions){
            if(filterData.enabledOptions.indexOf(item) > -1) {
              enabled = true;
            }
          }
          return ( <FilterOption category={ filterData.name} enabled={ enabled } changeOption={ that.props.setOption } label={item} /> )
        });

        // Some option groups have a label, if so, add it before all the options
        if(optionGroup.label) {
          optionSet.unshift(<strong className='label'> { optionGroup.label} </strong>);
        }

        return (<div className="option-set"> { optionSet } </div> ) ;
      });
    }

    if(filterData.type == "slider"){
      var value = filterData.options[0]; // Sets default option to the first option
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