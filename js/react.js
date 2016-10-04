var filterOptions = [
  {
    name: "duration",
    label : "Duration",
    options : {
      0 : "Any duration",
      1 : "About 15 minutes",
      2 : "15 minutes to 1 hour",
      3 : "1 to 2 hours",
      4 : "2 to 4 hours",
      5 : "4 hours +"
    },
    type : "slider"
  },



  {
    name : "difficulty",
    label : "Difficulty",
    options : ["Beginner", "Intermediate", "Advanced"],
    type : "pills"
  },
  {
    name: "age-range",
    label : "Age Range",
    options : ["Kids", "Teens", "Adults"],
    type : "pills"
  },
  {
    name: "web-lit-skills",
    label : "Web Literacy Skills",
    options : ["Design", "Code", "Compose", "Revise", "Remix", "Evaluate", "Sythesize", "Navigate", "Search", "Connect", "Protect", "Open", "Practice", "Contribute", "Share"],
    type : "pills"
  }
]


// var filterOptions = {
//   "difficulty" : ["Beginner", "Intermediate", "Advanced"],
//   "age-range" : ["Kids", "Teens", "Adults"],
//   "web-lit-skills" : ["Design", "Code", "Compose", "Revise", "Remix", "Evaluate", "Sythesize", "Navigate", "Search", "Connect", "Protect", "Open", "Practice", "Contribute", "Share"],
//   "21-c-skills" : ["Problem Solving", "Communication", "Creativity", "Collaboration"]
// }

var SearchField = React.createClass({
  getInitialState: function(){
    return {
      hasTerm : false
    }
  },
  keyDown : function(){
    var inputValue = this.refs.searchInput.value;
    inputValue = inputValue.trim();
    this.props.onUpdate(inputValue);
    this.setState({
      hasTerm : inputValue.length > 0
    });
  },
  clearSearch : function(){
    this.refs.searchInput.value = "";
    this.setState({
      hasTerm : false
    });
    this.props.onUpdate("");
  },
  render: function() {
    return (
      <div>
        <div className="search-ui">
          <span className="input-wrapper">
            <input ref="searchInput" onKeyUp={ this.keyDown } className="search" placeholder="Search by topic, description or tag" type="text"/>
            { this.state.hasTerm ? <a onClick={ this.clearSearch } href="#">+</a>  : null }
          </span>
        </div>
      </div>
    );
  }
});


var SearchWrapper = React.createClass({
  getInitialState: function(){
    return {
      showFilter: false,                          // Keeps track of which filter to currently show
      filterOptions : this.props.filterOptions,   // All of the filter data
      enabledFilters : {},                        // All of the selected filters
      searchTerm : ""                            // Search terms
    }
  },

  startSearch : function(term){

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


// This the gray box with all the filter options down below...

var FilterWrapper =  React.createClass({
  render: function() {

    var filterData = this.props.filterData;
    var optionUI;
    var that = this;

    // If this filter is a Pills type
    if(filterData.type == "pills") {
      optionUI = filterData.options.map(function(option){
        var enabled = false;
        if(filterData.enabledOptions){
          if(filterData.enabledOptions.indexOf(option) > -1) {
            enabled = true;
          }
        }
        return ( <FilterOption category={ filterData.name} enabled={ enabled } changeOption={ that.props.setOption } label={option} /> )
      });
    }

    if(filterData.type == "slider"){
      var value = 0;

      if(filterData.enabledOptions) {
        if(filterData.enabledOptions.length > 0) {
          value = filterData.enabledOptions[0];
        }
      }
      optionUI = ( <DurationPicker options={ filterData.options } category={ filterData.name } value={ value } changeOption={ that.props.setOption } /> )
    }

    var arrowStyle = {
      left : this.props.arrowPosition
    }

    return (
      <div>
        <div className="arrow-wrapper">
          <div style={ arrowStyle } className="arrow"></div>
        </div>
        <div className="filters">
          <div className="filter">
            { optionUI }
          </div>
        </div>
      </div>
    );
  }
});

// This the gray box with all the filter options down below...

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


ReactDOM.render(
  <SearchWrapper filterOptions={filterOptions}/>,
  document.getElementById('wrapper')
);


// <!--
// <EventPopup onNext={this.next} onPrevious={this.previous} onClose={this.closePop} events={this.state.events} visible={ this.state.popOpen } popid={ this.state.openId }></EventPopup>
// -->

// Maping some BS sample
// var eventCards = this.state.events.map(function(event){
  // if(event.visible) {
    // return (<EventCard onClick={that.openPop} event={event}></EventCard> )
  // }
// });
