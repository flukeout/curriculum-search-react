// Text input search field with a clear X button

var ActivityItem = React.createClass({
  render: function() {

    var that = this;

    var litSkills = this.props.details.weblit_skills;
    if(litSkills) {
      var litSkills =  this.props.details.weblit_skills.map(function(skill){
        that.props.details.weblit_skills.indexOf(skill) > 0 ? skill = ", " + skill : null;
        return ( <span>{ skill }</span> )
      });
    }

    var centurySkills = this.props.details.twenty_first_century_skills;
    if(centurySkills) {
      var centurySkills =  this.props.details.twenty_first_century_skills.map(function(skill){
        that.props.details.twenty_first_century_skills.indexOf(skill) > 0 ? skill = ", " + skill : null;
        return ( <span>{ skill }</span> )
      });
    }
  
    var authors = this.props.details.authors.map(function(author){
      that.props.details.authors.indexOf(author) > 0 ? author = ", " + author : null;
      return ( <span>{ author }</span> )
    });
    
    var thumbnailStyle = {
      backgroundImage: "url(" + this.props.details.image_url + ")"
    };
    
    return (
      <div className="result list">
        <div style={ thumbnailStyle } className="thumbnail"></div>
        <h1 className="title"><a href={ this.props.details.url }>{ this.props.details.title }</a></h1>
        <div className="meta">
          <span className="difficulty">{ this.props.details.difficulty }</span>
          <span className="duration">{ this.props.details.duration }</span>
          <span className="author">By { authors }</span>
        </div>
        <p className="description">
          { this.props.details.description }
        </p>
        <div className="tag-list">
          <strong>Web Lit Skills</strong> { litSkills }
        </div>
        <div className="tag-list">
          <strong>21st Century Skills</strong> { centurySkills }
        </div>
      </div>
    );
  }
});

module.exports = ActivityItem;
