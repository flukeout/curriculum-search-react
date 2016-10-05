var filterOptions = [
  {
    name: "duration",
    toggleLabel : "Duration",
    optionLabel : "Time to complete",
    options : [
      "Any duration",
      "About 15 minutes",
      "15 minutes to 1 hour",
      "1 to 2 hours",
      "2 to 4 hours",
      "4 hours +"],
    default_option: "Any duration",
    interface_type : "slider"
  },
  {
    name : "difficulty",
    toggleLabel : "Difficulty",
    options : ["Beginner", "Intermediate", "Advanced"],
    interface_type : "pills"
  },
  {
    name: "age-range",
    toggleLabel : "Age Range",
    options: ["Kids", "Teens", "Adults"],
    interface_type : "pills"
  },
  {
    name: "web-lit-skills",
    toggleLabel : "Web Literacy Skills",
    options: ["Design", "Code", "Compose", "Revise", "Remix", "Evaluate", "Sythesize", "Navigate", "Search", "Connect", "Protect", "Open", "Practice", "Contribute", "Share"],
    more_options: [
      {
        name : "century-skills",
        optionLabel : "21st Century Skills",
        options: ["Problem Solving", "Communication", "Creativity", "Collaboration"]
      }],
    interface_type : "pills"
  }
]

module.exports = filterOptions;