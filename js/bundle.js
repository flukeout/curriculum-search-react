/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// Filter options JSON
	var filterOptions = __webpack_require__(1);

	// Components
	var SearchField = __webpack_require__(2);
	var FilterToggle = __webpack_require__(3);
	var FilterWrapper = __webpack_require__(4);

	var SearchWrapper = React.createClass({
	  displayName: "SearchWrapper",


	  getInitialState: function getInitialState() {
	    return {
	      showFilter: false, // Keeps track of which filter to currently show
	      filterOptions: this.props.filterOptions, // All of the filter data
	      enabledFilters: {}, // All of the selected filters
	      searchTerm: "" // Search terms
	    };
	  },

	  getSearchTerm: function getSearchTerm(e) {
	    this.setState({
	      searchTerm: e
	    });
	  },

	  changeFilter: function changeFilter(filterType) {

	    if (this.state.showFilter == filterType) {
	      this.setState({
	        showFilter: false
	      });
	    } else {
	      this.setState({
	        showFilter: filterType
	      });
	    }
	  },

	  // Updates the enabledFilters object

	  setOption: function setOption(category, optionName, status) {

	    var options = this.state.enabledFilters;

	    if (!options[category]) {
	      options[category] = [];
	    }

	    if (status && options[category].indexOf(optionName) < 0) {
	      options[category].push(optionName);
	    }

	    if (status == false) {
	      var optionIndex = options[category].indexOf(optionName);
	      options[category].splice(optionIndex, 1);
	      if (options[category].length == 0) {
	        delete options[category];
	      }
	    }

	    this.setState({
	      enabledFilters: options
	    });
	  },

	  // Returns list of filter options and enabled filters
	  // For that filter cateogory

	  getFilterData: function getFilterData() {

	    var optionGroups = []; // this will be the result

	    var options = JSON.parse(JSON.stringify(this.state.filterOptions)); // Gross?

	    for (var i = 0; i < options.length; i++) {
	      var optionSet = options[i];
	      if (optionSet.name == this.state.showFilter) {

	        var optionGroup = {
	          name: optionSet.name,
	          options: optionSet.options,
	          optionLabel: optionSet.optionLabel || false,
	          interface_type: optionSet.interface_type,
	          default_option: optionSet.default_option || false
	        };

	        if (this.state.enabledFilters[this.state.showFilter]) {
	          optionGroup.enabledOptions = this.state.enabledFilters[this.state.showFilter];
	        }

	        optionGroups.push(optionGroup);

	        // If there are more_options, push em in
	        if (optionSet.more_options) {
	          for (var j = 0; j < optionSet.more_options.length; j++) {
	            var optionGroup = optionSet.more_options[j];
	            optionGroup.interface_type = optionSet.interface_type;
	            optionGroups.push(optionGroup);

	            if (this.state.enabledFilters[optionGroup.name]) {
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

	  resetFilters: function resetFilters() {
	    this.setState({
	      showFilter: false,
	      enabledFilters: {}
	    });
	  },

	  updateArrowPosition: function updateArrowPosition(left) {
	    this.setState({
	      arrowposition: left
	    });
	  },

	  render: function render() {

	    var that = this;

	    var i = 0;
	    var filterToggles = this.state.filterOptions.map(function (el) {
	      var currentCategory = el.name;
	      i++;
	      var active = false;

	      if (that.state.enabledFilters[currentCategory]) {
	        if (that.state.enabledFilters[currentCategory].length > 0) {
	          active = true;
	        }
	      }

	      var expanded = false;
	      if (that.state.showFilter === el.name) {
	        expanded = true;
	      }

	      return React.createElement(FilterToggle, { expanded: expanded, reportCenter: that.updateArrowPosition, enabled: active, onClick: that.changeFilter, label: el.toggleLabel, filtername: el.name });
	    });

	    // Should we show the filters menu?
	    var showFilters = this.state.showFilter;

	    // Show the reset link only if we've got at least one filter enabled...
	    var showReset = Object.keys(this.state.enabledFilters).length > 0 ? true : false;
	    var resetLinkStyle = {
	      opacity: showReset ? 1 : 0
	    };

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(SearchField, { onUpdate: this.getSearchTerm }),
	      React.createElement(
	        "div",
	        { className: "filter-toggles" },
	        React.createElement(
	          "span",
	          { className: "label" },
	          "Filters"
	        ),
	        " ",
	        filterToggles,
	        React.createElement(
	          "a",
	          { href: "#", style: resetLinkStyle, onClick: this.resetFilters, className: "reset" },
	          "Reset"
	        )
	      ),
	      showFilters ? React.createElement(FilterWrapper, { arrowPosition: this.state.arrowposition, setOption: this.setOption, filterData: this.getFilterData() }) : null,
	      React.createElement(
	        "a",
	        { href: "#", style: resetLinkStyle, onClick: this.resetFilters, className: "reset-bottom" },
	        "Reset Filters"
	      ),
	      React.createElement(
	        "div",
	        { className: "code" },
	        "enabledFilters: ",
	        JSON.stringify(this.state.enabledFilters),
	        "  ",
	        React.createElement("br", null),
	        React.createElement("br", null),
	        "searchTerm: ",
	        JSON.stringify(this.state.searchTerm)
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(SearchWrapper, { filterOptions: filterOptions }), document.getElementById('wrapper'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var filterOptions = [{
	  name: "duration",
	  toggleLabel: "Duration",
	  optionLabel: "Time to complete",
	  options: ["Any duration", "About 15 minutes", "15 minutes to 1 hour", "1 to 2 hours", "2 to 4 hours", "4 hours +"],
	  default_option: "Any duration",
	  interface_type: "slider"
	}, {
	  name: "difficulty",
	  toggleLabel: "Difficulty",
	  options: ["Beginner", "Intermediate", "Advanced"],
	  interface_type: "pills"
	}, {
	  name: "age-range",
	  toggleLabel: "Age Range",
	  options: ["Kids", "Teens", "Adults"],
	  interface_type: "pills"
	}, {
	  name: "web-lit-skills",
	  toggleLabel: "Web Literacy Skills",
	  options: ["Design", "Code", "Compose", "Revise", "Remix", "Evaluate", "Sythesize", "Navigate", "Search", "Connect", "Protect", "Open", "Practice", "Contribute", "Share"],
	  more_options: [{
	    name: "century-skills",
	    optionLabel: "21st Century Skills",
	    options: ["Problem Solving", "Communication", "Creativity", "Collaboration"]
	  }],
	  interface_type: "pills"
	}];

	module.exports = filterOptions;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	// Text input search field with a clear X button

	var SearchField = React.createClass({
	  displayName: "SearchField",

	  getInitialState: function getInitialState() {
	    return {
	      hasTerm: false
	    };
	  },
	  keyDown: function keyDown() {
	    var inputValue = this.refs.searchInput.value;
	    inputValue = inputValue.trim();
	    this.props.onUpdate(inputValue);
	    this.setState({
	      hasTerm: inputValue.length > 0
	    });
	  },
	  clearSearch: function clearSearch() {
	    this.refs.searchInput.value = "";
	    this.setState({
	      hasTerm: false
	    });
	    this.props.onUpdate("");
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "search-field" },
	      React.createElement(
	        "span",
	        { className: "input-wrapper" },
	        React.createElement("input", { ref: "searchInput", onKeyUp: this.keyDown, className: "search", placeholder: "Search by topic, description or tag", type: "text" }),
	        this.state.hasTerm ? React.createElement("a", { onClick: this.clearSearch, href: "#" }) : null
	      )
	    );
	  }
	});

	module.exports = SearchField;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	// Pill that shows and hides the corresponding filter set

	var FilterToggle = React.createClass({
	  displayName: "FilterToggle",

	  gotClicked: function gotClicked() {
	    this.props.onClick(this.props.filtername);

	    var left = this.refs.button.offsetLeft;
	    var width = this.refs.button.offsetWidth;

	    // Let the parent know what the arrow position
	    // Shoudl be based on it's positions
	    this.props.reportCenter(left + width / 2 - 10);
	  },
	  render: function render() {
	    var className = "";

	    if (this.props.expanded) {
	      className += " active";
	    }

	    if (this.props.enabled) {
	      className += " filter-active";
	    }

	    return React.createElement(
	      "div",
	      { className: "filter-toggle" },
	      React.createElement(
	        "button",
	        { ref: "button", className: className, onClick: this.gotClicked },
	        this.props.label
	      )
	    );
	  }
	});

	module.exports = FilterToggle;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var FilterOption = __webpack_require__(5);
	var SliderWithLabels = __webpack_require__(6);

	// This the gray box with all the filter options down below...
	var FilterWrapper = React.createClass({
	  displayName: "FilterWrapper",

	  render: function render() {

	    var filterData = this.props.filterData;

	    var optionUI; // holds the final UI markup

	    var that = this;

	    optionUI = filterData.map(function (optionGroup) {

	      if (optionGroup.interface_type == "pills") {

	        var optionSet = optionGroup.options.map(function (item) {
	          var enabled = false;

	          console.log(item);

	          if (optionGroup.enabledOptions) {
	            if (optionGroup.enabledOptions.indexOf(item) > -1) {
	              enabled = true;
	            }
	          }
	          return React.createElement(FilterOption, { category: optionGroup.name, enabled: enabled, changeOption: that.props.setOption, label: item });
	        });

	        return React.createElement(
	          "div",
	          { className: "option-set" },
	          optionGroup.optionLabel ? React.createElement(
	            "strong",
	            { className: "label" },
	            " ",
	            optionGroup.optionLabel,
	            " "
	          ) : null,
	          optionSet
	        );
	      }

	      if (optionGroup.interface_type == "slider") {
	        var value = optionGroup.default_option || optionGroup.options[0]; // Sets default value if available

	        if (optionGroup.enabledOptions) {
	          if (optionGroup.enabledOptions.length > 0) {
	            value = optionGroup.enabledOptions[0];
	          }
	        }
	        return React.createElement(SliderWithLabels, { options: optionGroup.options, optionLabel: optionGroup.optionLabel, category: optionGroup.name, value: value, changeOption: that.props.setOption });
	      }
	    });

	    var arrowStyle = {
	      left: this.props.arrowPosition
	    };

	    return React.createElement(
	      "div",
	      { className: "filter-wrapper" },
	      React.createElement(
	        "div",
	        { className: "arrow-wrapper" },
	        React.createElement("div", { style: arrowStyle, className: "arrow" })
	      ),
	      React.createElement(
	        "div",
	        { className: "filters" },
	        optionUI
	      )
	    );
	  }
	});

	module.exports = FilterWrapper;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// Pill for each individual filter option

	var FilterOption = React.createClass({
	  displayName: "FilterOption",

	  gotClicked: function gotClicked() {
	    this.props.changeOption(this.props.category, this.props.label, !this.props.enabled);
	  },
	  getClass: function getClass() {
	    return this.props.enabled ? "filter-option active" : "filter-option";
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "filter-option" },
	      React.createElement(
	        "button",
	        { className: this.getClass(), onClick: this.gotClicked },
	        this.props.label
	      )
	    );
	  }
	});

	module.exports = FilterOption;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	//Slider with labels

	var SliderWithLabels = React.createClass({
	  displayName: "SliderWithLabels",

	  getInitialState: function getInitialState() {
	    return {
	      optioncount: Object.keys(this.props.options).length,
	      value: this.props.value
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.refs.input.value = this.getOptionIndex(this.props.value);
	  },

	  change: function change(e) {
	    var val = this.refs.input.value;

	    this.props.changeOption(this.props.category, this.state.value, false);
	    this.props.changeOption(this.props.category, this.getLabel(val), true);

	    this.setState({
	      value: this.getLabel(val)
	    });
	  },

	  // Get numerical value of the current label
	  getOptionIndex: function getOptionIndex(label) {
	    return this.props.options.indexOf(label);
	  },

	  // Get label for specific numerical value in options array
	  getLabel: function getLabel(val) {
	    return this.props.options[parseInt(val)];
	  },


	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "slider-with-labels" },
	      React.createElement(
	        "strong",
	        null,
	        this.props.optionLabel
	      ),
	      React.createElement("input", { ref: "input", type: "range", min: "0", max: this.state.optioncount - 1, onChange: this.change, step: "1" }),
	      React.createElement(
	        "span",
	        { className: "value" },
	        this.state.value
	      )
	    );
	  }
	});

	module.exports = SliderWithLabels;

/***/ }
/******/ ]);