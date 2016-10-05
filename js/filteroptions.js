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