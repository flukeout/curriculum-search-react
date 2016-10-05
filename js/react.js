var filterOptions = require("./filteroptions.js");
var SearchField =   require("./searchfield.js");
var FilterToggle =  require("./filtertoggle.js");
var FilterWrapper = require("./filterwrapper.js");

var SearchWrapper = React.createClass({

  getInitialState: function(){
    return {
      showFilter: false,                          // Keeps track of which filter to currently show
      filterOptions : this.props.filterOptions,   // All of the filter data
      enabledFilters : {},                        // All of the selected filters
      searchTerm : ""                            // Search terms
    }
  },

  getSearchTerm : function(e){
    this.setState({
      searchTerm: e
    })
  },

  changeFilter : function(filterType){

    if(this.state.showFilter == filterType) {
      this.setState({
        showFilter : false
      });
    } else {
      this.setState({
        showFilter : filterType
      });
    }
  },

  // Updates the enabledFilters object

  setOption: function(category, optionName, status){

    var options = this.state.enabledFilters;

    if(!options[category]) {
      options[category] = [];
    }

    if(status && options[category].indexOf(optionName) < 0) {
      options[category].push(optionName);
    }

    if(status == false) {
      var optionIndex = options[category].indexOf(optionName);
      options[category].splice(optionIndex, 1);
      if(options[category].length == 0) {
        delete options[category];
      }
    }

    this.setState({
      enabledFilters: options
    });
  },

  // Returns list of filter options and enabled filters
  // For that filter cateogory

  getFilterData : function(){

    var result;
    var options = JSON.parse(JSON.stringify(this.state.filterOptions)); // Gross?

    for(var i = 0; i < options.length; i++){
      var optionSet = options[i];
      if(optionSet.name == this.state.showFilter){
        result = optionSet;
      }
    }

    if(this.state.enabledFilters[this.state.showFilter]){
      result.enabledOptions = this.state.enabledFilters[this.state.showFilter];
    }

    return result;
  },

  // Resets currently selected filters and hides the
  // expanded filters menu

  resetFilters : function(){
    this.setState({
      showFilter : false,
      enabledFilters : {}
    });
  },

  updateArrowPosition : function(left){
    this.setState({
      arrowposition : left
    })
  },

  render: function() {

    var that = this;

    var i = 0;
    var filterToggles = this.state.filterOptions.map(function(el){
      var currentCategory = el.name;
      i++;
      var active = false;

      if(that.state.enabledFilters[currentCategory]) {
        if(that.state.enabledFilters[currentCategory].length > 0){
          active = true;
        }
      }

      var expanded = false;
      if(that.state.showFilter === el.name) {
        expanded = true;
      }

      return ( <FilterToggle expanded={ expanded } reportCenter={ that.updateArrowPosition } enabled={ active } onClick={ that.changeFilter } label={ el.label } filtername={ el.name }/> )
    });

    // Should we show the filters menu?
    var showFilters = this.state.showFilter;

    // Show the reset link only if we've got at least one filter enabled...
    var showReset = Object.keys(this.state.enabledFilters).length > 0 ? true  : false;
    var resetLinkStyle = {
      opacity: showReset ? 1 : 0
    }

    return (
      <div>
        <SearchField onUpdate={ this.getSearchTerm }/>
        <div className="filter-toggles">
          Filters { filterToggles }
          <a href="#" style={ resetLinkStyle } onClick={ this.resetFilters } className="reset">Reset</a>
        </div>
        { showFilters ? <FilterWrapper arrowPosition={ this.state.arrowposition } setOption={ this.setOption } filterData={ this.getFilterData() } /> : null }


        <div className="code">

        enabledFilters: { JSON.stringify(this.state.enabledFilters) }  <br/><br/>
        searchTerm: { JSON.stringify(this.state.searchTerm) }
        </div>

      </div>
    );

  }
});



ReactDOM.render(
  <SearchWrapper filterOptions={filterOptions}/>,
  document.getElementById('wrapper')
);
