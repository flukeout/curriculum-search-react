// Text input search field with a clear X button

var ActivityItem = React.createClass({
  showItemList : function(label, items) {
    var that = this;
    if(items && items.length > 0) {
      var itemList =  items.map(function(item){
        var comma;
        if(items.indexOf(item) < items.length - 1){
          comma = ","
        }
        if(typeof item == "object") {
          return ( <span><a href={item.url}>{ item.title }</a>{ comma } </span> )
        } else {
          return ( <span>{ item }{ comma } </span> )
        }
      });
      return (
        <div className="tag-list">
          <h2>{ label }</h2>{ itemList }
        </div>
      )
    }
  },
  render: function() {
    var that = this;

    var thumbnailStyle = {
      backgroundImage: "url(" + this.props.details.image_url + ")"
    };

    var authors = this.props.details.authors.map(function(author){
      that.props.details.authors.indexOf(author) > 0 ? author = ", " + author : null;
      return ( <span>{ author }</span> )
    });
    
    return (
      <div className="result-item list">
        <a href={ this.props.details.url } style={ thumbnailStyle } className="thumbnail"></a>
        <h1 className="title"><a href={ this.props.details.url }>{ this.props.details.title }</a></h1>
        <div className="meta">
          <span className="difficulty">{ this.props.details.difficulty }</span>
          <span className="duration">{ this.props.details.duration }</span>
          <span className="author">By { authors }</span>
        </div>
        <p className="description">
          { this.props.details.description }
        </p>

        { this.showItemList("Web Lit Skills", this.props.details.weblit_skills) }
        { this.showItemList("21st Century Skills", this.props.details.twenty_first_century_skills) }
        { this.showItemList("Appears in", this.props.details.teaching_kits) }
      </div>
    );
  }
});

module.exports = ActivityItem;
