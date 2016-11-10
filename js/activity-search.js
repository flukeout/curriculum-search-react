// Filter options JSON
var filterOptions = require("./filteroptions.js");

// Data for sample search results for activites & collections
var activityData = require("./activitydata.js");
var collectionData = require("./collectiondata.js");

// Components
var SearchField =   require("./components/searchfield.js");
var FilterToggle =  require("./components/filtertoggle.js");
var FilterWrapper = require("./components/filterwrapper.js");
var ResultsTitle = require("./components/resultstitle.js");

var ActivityItem = require("./components/activityitem.js");

var CollectionItem = require("./components/collectionitem.js");

var SearchWrapper = React.createClass({

  getInitialState: function(){
    return {
      showFilter: false,                          // Keeps track of which filter to currently show
      filterOptions : this.props.filterOptions,   // All of the filter data
      enabledFilters : {},                        // All of the selected filters
      searchTerm : "",                            // Search terms
      activityData : this.props.activityData,     // Simluated data for activities that match the search parameters
      collectionData : this.props.collectionData,  // Simluated data for collections that match the search parameters
      showCollections : true                      // Show or hide collections in the results list
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

    var optionGroups = []; // this will be the result

    var options = JSON.parse(JSON.stringify(this.state.filterOptions)); // Gross?

    for(var i = 0; i < options.length; i++){
      var optionSet = options[i];
      if(optionSet.name == this.state.showFilter){

        var optionGroup = {
          name: optionSet.name ,
          options: optionSet.options,
          optionLabel: optionSet.optionLabel || false,
          interface_type : optionSet.interface_type,
          default_option : optionSet.default_option || false
        }

        if(this.state.enabledFilters[this.state.showFilter]){
          optionGroup.enabledOptions = this.state.enabledFilters[this.state.showFilter];
        }

        optionGroups.push(optionGroup);

        // If there are more_options, push em in
        if(optionSet.more_options){
          for(var j = 0; j < optionSet.more_options.length; j++) {
            var optionGroup = optionSet.more_options[j];
            optionGroup.interface_type = optionSet.interface_type;
            optionGroups.push(optionGroup);

            if(this.state.enabledFilters[optionGroup.name]){
              optionGroup.enabledOptions = this.state.enabledFilters[optionGroup.name];
            }
          }
        }
      }
    }

    return optionGroups;
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
  
  
  toggleCollections : function(bool) {
    this.setState({
      showCollections : bool
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

      return ( <FilterToggle key={ el.name } expanded={ expanded } reportCenter={ that.updateArrowPosition } enabled={ active } onClick={ that.changeFilter } label={ el.toggleLabel } filtername={ el.name }/> )
    });

    // Should we show the filters menu?
    var showFilters = this.state.showFilter;

    // Show the reset link only if we've got at least one filter enabled...
    var showReset = Object.keys(this.state.enabledFilters).length > 0 ? true  : false;
    var resetLinkStyle = {
      opacity: showReset ? 1 : 0
    }

    var activityCount = this.state.activityData.length;
    var activities = this.state.activityData.map(function(details){
      return ( <ActivityItem details={ details }/> )
    });

    var collectionCount = this.state.collectionData.length;
    var collections = this.state.collectionData.map(function(details){
      return ( <CollectionItem details={ details }/> )
    });
    
    return (
      <div>
        <div className="centered">
          <SearchField onUpdate={ this.getSearchTerm }/>
          <div className="filter-toggles">
            <span className="label">Filters</span> { filterToggles }
            <a href="#" style={ resetLinkStyle } onClick={ this.resetFilters } className="reset">Reset</a>
          </div>
          { showFilters ? <FilterWrapper arrowPosition={ this.state.arrowposition } setOption={ this.setOption } filterData={ this.getFilterData() } /> : null }
        
          <a href="#" style={ resetLinkStyle } onClick={ this.resetFilters } className="reset-bottom">Reset Filters</a>
        </div>

        <div className="result-list-wrapper">
          <ResultsTitle showCollections={ this.state.showCollections } toggleCollections={ this.toggleCollections } esultcount={ activityCount } />

          { this.state.showCollections ? collections : null }

          { activities }
        </div>

        <div className="code">
        enabledFilters: { JSON.stringify(this.state.enabledFilters) }  <br/><br/>
        searchTerm: { JSON.stringify(this.state.searchTerm) }
        </div>
      </div>
    );
  }
});



ReactDOM.render(
  <SearchWrapper filterOptions={filterOptions} collectionData={collectionData} activityData={activityData}/>,
  document.getElementById('wrapper')
);
