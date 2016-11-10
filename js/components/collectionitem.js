// Text input search field with a clear X button

var CollectionItem = React.createClass({
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
      <div className="collection-item list">
        <a href={ this.props.details.url } style={ thumbnailStyle } className="thumbnail">
      </a>
        <h1 className="title"><a href={ this.props.details.url }>{ this.props.details.title }</a></h1>
        <span className="activity-count"><strong>Collection :</strong> { this.props.details.activity_count } activities</span>
        { /* <h2>Activity Collection</h2> */ }
        <div className="meta">
          <span className="author">By { authors }</span>
        </div>
        <p className="description">
          { this.props.details.description }
        </p>
      </div>
    );
  }
});

module.exports = CollectionItem;
