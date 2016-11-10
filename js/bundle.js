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

	// Data for sample search results for activites & collections
	var activityData = __webpack_require__(2);
	var collectionData = __webpack_require__(3);

	// Components
	var SearchField = __webpack_require__(4);
	var FilterToggle = __webpack_require__(5);
	var FilterWrapper = __webpack_require__(6);
	var ResultsTitle = __webpack_require__(9);

	var ActivityItem = __webpack_require__(10);

	var CollectionItem = __webpack_require__(11);

	var SearchWrapper = React.createClass({
	  displayName: "SearchWrapper",


	  getInitialState: function getInitialState() {
	    return {
	      showFilter: false, // Keeps track of which filter to currently show
	      filterOptions: this.props.filterOptions, // All of the filter data
	      enabledFilters: {}, // All of the selected filters
	      searchTerm: "", // Search terms
	      activityData: this.props.activityData,
	      collectionData: this.props.collectionData
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

	      return React.createElement(FilterToggle, { key: el.name, expanded: expanded, reportCenter: that.updateArrowPosition, enabled: active, onClick: that.changeFilter, label: el.toggleLabel, filtername: el.name });
	    });

	    // Should we show the filters menu?
	    var showFilters = this.state.showFilter;

	    // Show the reset link only if we've got at least one filter enabled...
	    var showReset = Object.keys(this.state.enabledFilters).length > 0 ? true : false;
	    var resetLinkStyle = {
	      opacity: showReset ? 1 : 0
	    };

	    var activityCount = this.state.activityData.length;

	    var activities = this.state.activityData.map(function (details) {
	      return React.createElement(ActivityItem, { details: details });
	    });

	    var collectionCount = this.state.collectionData.length;

	    var collections = this.state.collectionData.map(function (details) {
	      return React.createElement(CollectionItem, { details: details });
	    });

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "centered" },
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
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "result-list-wrapper" },
	        React.createElement(ResultsTitle, { resultcount: activityCount }),
	        collections,
	        activities
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

	ReactDOM.render(React.createElement(SearchWrapper, { filterOptions: filterOptions, collectionData: collectionData, activityData: activityData }), document.getElementById('wrapper'));

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
	  toggleLabel: "Ages",
	  options: ["Everyone", "13+"],
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

	var activityData = [{
	  "id": 1,
	  "title": "Kraken the Code",
	  "subtitle": "Understanding credibility",
	  "description": "Learners use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also learning about search terms, keywords, and how to assess the validity and relevance of web sources.",
	  "image_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-kraken-code.jpg",
	  "image_retina_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-kraken-code%402x.jpg",
	  "url": "https://mozilla.github.io/mozilla-club-activity-kraken-the-code",
	  "difficulty": "Beginner",
	  "age_range": "Teens",
	  "duration": "15 minutes to 1 hour",
	  "twenty_first_century_skills": ["Problem Solving"],
	  "teaching_kits": [{
	    "id": 5,
	    "title": "Web Literacy Basics",
	    "url": "https://kit.com",
	    "short_description": "This six-part series helps learners become familiar with reading, writing and participating on the web. They'll discover the foundations of the web through production and collaboration. This is an ideal kit for Mozilla Clubs.",
	    "description": "Learners get familiar with reading, writing and participating on the web in this six-part module. Discover the foundations of the web through production and collaboration.",
	    "authors": ["Mozilla Learning"],
	    "image_url": "https://learning.mozilla.org/img/pages/activities/img-activity-curriculum.png",
	    "image_retina_url": "https://learning.mozilla.org/img/pages/activities/img-activity-curriculum%402x.png"
	  }, {
	    "id": 6,
	    "title": "Offline Icebreakers",
	    "url": "https://kit.com",
	    "short_description": "Solve puzzles and play games to get to know your fellow learners and the web.",
	    "authors": ["Mozilla", "Digital Corps", "ginger coons", "Marc Lesser", "Thomas Park", "Yofie Setiawan", "Karen Smith"],
	    "image_url": "https://learning.mozilla.org/img/pages/offline-icebreakers/html-puzzleboxes.jpg"
	  }],
	  "authors": ["Mouse"],

	  "locale": "en-US"
	}, {
	  "id": 2,
	  "title": "CSS Fonts",
	  "subtitle": "Coding/Scripting, Composing, Design",
	  "description": "Learners will use webfonts to create moods and tones on webpages, learning about coding, composing, designing, and remixing.",
	  "image_url": "https://learning.mozilla.org/img/pages/intermediate-web-lit/letterpress.jpg",
	  "url": "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session02-css-fonts.html",
	  "difficulty": "Intermediate",
	  "age_range": "Teens",
	  "duration": "15 minutes to 1 hour",
	  "tags": ["CSS", "Coding"],
	  "twenty_first_century_skills": ["Problem Solving", "Communication", "Creativity"],
	  "authors": ["Mozilla"],
	  "weblit_skills": ["Code", "Compose", "Design", "Evaluate", "Remix", "Revise", "Research", "Search"],
	  "locale": "en-US"
	}, {
	  "id": 3,
	  "title": "HTML Puzzle Boxes",
	  "subtitle": "Understanding composing for the web",
	  "description": "Learners race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page.",
	  "image_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
	  "image_retina_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-puzzle-boxes%402x.jpg",
	  "url": "https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes",
	  "difficulty": "Beginner",
	  "age_range": "Kids",
	  "duration": "1 to 2 hours",
	  "tags": ["HTML", "Offline"],
	  "twenty_first_century_skills": ["Creativity"],
	  "authors": ["Yofie Setiawan, Mozilla Indonesia"],
	  "weblit_skills": ["Code", "Remix"],
	  "locale": "en-US"
	}, {
	  "id": 4,
	  "title": "Design a Story for the Web",
	  "subtitle": "Understanding Designing",
	  "description": "Learners will ideate, sketch and structure a story to create with Webmaker. By brainstorming offline, learners will start thinking about the different ways to create for the Web and get more comfortable with the idea of creating their own content.",
	  "image_url": "https://learning.mozilla.org/img/pages/webmaker/designing-webmaker.jpg",
	  "url": "http://mozilla.github.io/webmaker-curriculum/MobileWeb/design-webmaker-project.html",
	  "difficulty": "Advanced",
	  "age_range": "Adults",
	  "duration": "2 to 4 hours",
	  "teaching_kits": [{
	    "id": 5,
	    "title": "Web Literacy Basics",
	    "url": "https://kit.com",
	    "short_description": "This six-part series helps learners become familiar with reading, writing and participating on the web. They'll discover the foundations of the web through production and collaboration. This is an ideal kit for Mozilla Clubs.",
	    "description": "Learners get familiar with reading, writing and participating on the web in this six-part module. Discover the foundations of the web through production and collaboration.",
	    "authors": ["Mozilla Learning"],
	    "image_url": "https://learning.mozilla.org/img/pages/activities/img-activity-curriculum.png",
	    "image_retina_url": "https://learning.mozilla.org/img/pages/activities/img-activity-curriculum%402x.png"
	  }, {
	    "id": 6,
	    "title": "Offline Icebreakers",
	    "url": "https://kit.com",
	    "short_description": "Solve puzzles and play games to get to know your fellow learners and the web.",
	    "authors": ["Mozilla", "Digital Corps", "ginger coons", "Marc Lesser", "Thomas Park", "Yofie Setiawan", "Karen Smith"],
	    "image_url": "https://learning.mozilla.org/img/pages/offline-icebreakers/html-puzzleboxes.jpg"
	  }],
	  "authors": ["Laura", "Bobby"],
	  "weblit_skills": ["Design", "Remix", "Compose"],
	  "locale": "en-US"
	}, {
	  "id": 5,
	  "title": "Privacy Coach",
	  "subtitle": "Understanding privacy and open practices",
	  "description": "Learners mentor their peers to enhance their privacy through their online or digital activities. Knowledge and expertise is shared through discussion or by remixing a response template to report on experiences.",
	  "image_url": "https://learning.mozilla.org/img/pages/protect-your-data/img-privacycoach.png",
	  "image_retina_url": "https://learning.mozilla.org/img/pages/protect-your-data/img-privacycoach%402x.png 2x",
	  "url": "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session03-privacycoach.html",
	  "difficulty": "Beginner",
	  "age_range": "Adults",
	  "duration": "15 minutes to 1 hour",
	  "authors": ["Hive Toronto"],
	  "weblit_skills": ["Privacy", "Open Practices"],
	  "locale": "en-US"
	}];

	module.exports = activityData;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var collectionData = [{
	  "id": 1,
	  "title": "Learning about Browsing",
	  "activity_count": 4,
	  "subtitle": "Understanding credibility",
	  "description": "Learners use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also learning about search terms, keywords, and how to assess the validity and relevance of web sources.",
	  "image_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-kraken-code.jpg",
	  "url": "https://mozilla.github.io/mozilla-club-activity-kraken-the-code",
	  "authors": ["Mouse"],
	  "locale": "en-US"
	}, {
	  "id": 2,
	  "title": "CSS Basics II",
	  "activity_count": 7,
	  "subtitle": "Coding/Scripting, Composing, Design",
	  "description": "Learners will use webfonts to create moods and tones on webpages, learning about coding, composing, designing, and remixing.",
	  "image_url": "https://learning.mozilla.org/img/pages/intermediate-web-lit/letterpress.jpg",
	  "url": "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session02-css-fonts.html",
	  "tags": ["CSS", "Coding"],
	  "authors": ["Mozilla"],
	  "locale": "en-US"
	}, {
	  "id": 3,
	  "title": "Advanced HTML III",
	  "activity_count": 2,
	  "subtitle": "Understanding composing for the web",
	  "description": "Learners race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page.",
	  "image_url": "https://learning.mozilla.org/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
	  "url": "https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes",
	  "tags": ["HTML", "Offline"],
	  "authors": ["Yofie Setiawan, Mozilla Indonesia"],
	  "locale": "en-US"
	}, {
	  "id": 4,
	  "title": "Storytelling Workshop",
	  "subtitle": "Understanding Designing",
	  "activity_count": 999,
	  "description": "Learners will ideate, sketch and structure a story to create with Webmaker. By brainstorming offline, learners will start thinking about the different ways to create for the Web and get more comfortable with the idea of creating their own content.",
	  "image_url": "https://learning.mozilla.org/img/pages/webmaker/designing-webmaker.jpg",
	  "url": "http://mozilla.github.io/webmaker-curriculum/MobileWeb/design-webmaker-project.html",
	  "difficulty": "Advanced",
	  "authors": ["Laura", "Bobby"],
	  "locale": "en-US"
	}];

	module.exports = collectionData;

/***/ },
/* 4 */
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
	  sendTimeout: false,
	  keyDown: function keyDown() {
	    var inputValue = this.refs.searchInput.value;
	    inputValue = inputValue.trim();

	    var that = this;

	    clearTimeout(this.sendTimeout);

	    this.sendTimeout = setTimeout(function () {
	      that.sendSearchString(inputValue);
	    }, 400);

	    this.setState({
	      hasTerm: inputValue.length > 0
	    });
	  },
	  sendSearchString: function sendSearchString(string) {
	    this.props.onUpdate(string);
	  },
	  clearSearch: function clearSearch() {
	    this.refs.searchInput.value = "";
	    this.setState({
	      hasTerm: false
	    });
	    clearTimeout(this.sendTimeout);
	    this.sendSearchString(false);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "search-field" },
	      React.createElement(
	        "span",
	        { className: "input-wrapper" },
	        React.createElement("input", { ref: "searchInput", onKeyUp: this.keyDown, className: "search", placeholder: "Search by topic, description or tag", type: "text" }),
	        this.state.hasTerm ? React.createElement("a", { onClick: this.clearSearch, href: "#" }) : null,
	        this.state.hasTerm ? null : React.createElement("span", { className: "icon" })
	      )
	    );
	  }
	});

	module.exports = SearchField;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var FilterOption = __webpack_require__(7);
	var SliderWithLabels = __webpack_require__(8);

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

	          if (optionGroup.enabledOptions) {
	            if (optionGroup.enabledOptions.indexOf(item) > -1) {
	              enabled = true;
	            }
	          }
	          return React.createElement(FilterOption, { key: item, category: optionGroup.name, enabled: enabled, changeOption: that.props.setOption, label: item });
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
/* 7 */
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
/* 8 */
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

	    // A '0' value means "any duration", so we can treat this filter as disabled.
	    var enabled = true;
	    val != 0 ? null : enabled = false;

	    this.props.changeOption(this.props.category, this.getLabel(val), enabled);

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

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	// Text input search field with a clear X button

	var ResultsTitle = React.createClass({
	  displayName: "ResultsTitle",

	  getInitialState: function getInitialState() {
	    return {
	      hasTerm: false
	    };
	  },
	  render: function render() {
	    var heading = "Popular Topics";

	    if (this.props.resultcount > 0) {
	      heading = this.props.resultcount + " Results";
	    }

	    return React.createElement(
	      "div",
	      { className: "results-title" },
	      React.createElement(
	        "h3",
	        null,
	        heading
	      )
	    );
	  }
	});

	module.exports = ResultsTitle;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Text input search field with a clear X button

	var ActivityItem = React.createClass({
	  displayName: "ActivityItem",

	  showItemList: function showItemList(label, items) {
	    var that = this;
	    if (items && items.length > 0) {
	      var itemList = items.map(function (item) {
	        var comma;
	        if (items.indexOf(item) < items.length - 1) {
	          comma = ",";
	        }
	        if ((typeof item === "undefined" ? "undefined" : _typeof(item)) == "object") {
	          return React.createElement(
	            "span",
	            null,
	            React.createElement(
	              "a",
	              { href: item.url },
	              item.title
	            ),
	            comma,
	            " "
	          );
	        } else {
	          return React.createElement(
	            "span",
	            null,
	            item,
	            comma,
	            " "
	          );
	        }
	      });
	      return React.createElement(
	        "div",
	        { className: "tag-list" },
	        React.createElement(
	          "h2",
	          null,
	          label
	        ),
	        itemList
	      );
	    }
	  },
	  render: function render() {
	    var that = this;

	    var thumbnailStyle = {
	      backgroundImage: "url(" + this.props.details.image_url + ")"
	    };

	    var authors = this.props.details.authors.map(function (author) {
	      that.props.details.authors.indexOf(author) > 0 ? author = ", " + author : null;
	      return React.createElement(
	        "span",
	        null,
	        author
	      );
	    });

	    return React.createElement(
	      "div",
	      { className: "result-item list" },
	      React.createElement("a", { href: this.props.details.url, style: thumbnailStyle, className: "thumbnail" }),
	      React.createElement(
	        "h1",
	        { className: "title" },
	        React.createElement(
	          "a",
	          { href: this.props.details.url },
	          this.props.details.title
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "meta" },
	        React.createElement(
	          "span",
	          { className: "difficulty" },
	          this.props.details.difficulty
	        ),
	        React.createElement(
	          "span",
	          { className: "duration" },
	          this.props.details.duration
	        ),
	        React.createElement(
	          "span",
	          { className: "author" },
	          "By ",
	          authors
	        )
	      ),
	      React.createElement(
	        "p",
	        { className: "description" },
	        this.props.details.description
	      ),
	      this.showItemList("Web Lit Skills", this.props.details.weblit_skills),
	      this.showItemList("21st Century Skills", this.props.details.twenty_first_century_skills),
	      this.showItemList("Appears in", this.props.details.teaching_kits)
	    );
	  }
	});

	module.exports = ActivityItem;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	// Text input search field with a clear X button

	var CollectionItem = React.createClass({
	  displayName: "CollectionItem",

	  render: function render() {
	    var that = this;

	    var thumbnailStyle = {
	      backgroundImage: "url(" + this.props.details.image_url + ")"
	    };

	    var authors = this.props.details.authors.map(function (author) {
	      that.props.details.authors.indexOf(author) > 0 ? author = ", " + author : null;
	      return React.createElement(
	        "span",
	        null,
	        author
	      );
	    });

	    return React.createElement(
	      "div",
	      { className: "collection-item list" },
	      React.createElement(
	        "a",
	        { href: this.props.details.url, style: thumbnailStyle, className: "thumbnail" },
	        React.createElement(
	          "span",
	          { className: "activity-count" },
	          this.props.details.activity_count,
	          " activities"
	        )
	      ),
	      React.createElement(
	        "h1",
	        { className: "title" },
	        React.createElement(
	          "a",
	          { href: this.props.details.url },
	          this.props.details.title
	        )
	      ),
	      React.createElement(
	        "h2",
	        null,
	        "Activity Collection"
	      ),
	      React.createElement(
	        "div",
	        { className: "meta" },
	        React.createElement(
	          "span",
	          { className: "author" },
	          "By ",
	          authors
	        )
	      ),
	      React.createElement(
	        "p",
	        { className: "description" },
	        this.props.details.description
	      )
	    );
	  }
	});

	module.exports = CollectionItem;

/***/ }
/******/ ]);