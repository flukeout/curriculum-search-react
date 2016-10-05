var filterOptions = [
  {
    name: "duration",
    label : "Duration",
    optionLabel : "Time to complete",
    options : [
      "Any duration",
      "About 15 minutes",
      "15 minutes to 1 hour",
      "1 to 2 hours",
      "2 to 4 hours",
      "4 hours +"],
    type : "slider"
  },
  {
    name : "difficulty",
    label : "Difficulty",
    optionGroups : [
      {
        label : false,
        options : ["Beginner", "Intermediate", "Advanced"]
      }
    ],
    type : "pills"
  },
  {
    name: "age-range",
    label : "Age Range",
    optionGroups : [
      {
        label: false,
        options: ["Kids", "Teens", "Adults"]
      }
    ],
    type : "pills"
  },
  {
    name: "web-lit-skills",
    label : "Web Literacy Skills",
    optionGroups: [
      {
        label : false,
        options: ["Design", "Code", "Compose", "Revise", "Remix", "Evaluate", "Sythesize", "Navigate", "Search", "Connect", "Protect", "Open", "Practice", "Contribute", "Share"]
      },
      {
        label : "21st Century Skills",
        options: ["Problem Solving", "Communication", "Creativity", "Collaboration"]
      }],
    type : "pills"
  }
]

module.exports = filterOptions;