import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import reviewData from '../../reviewDummyData.js';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: reviewData.results,
      numOfReviews: 2
    };
    this.onSortChange = this.onSortChange.bind(this);
    this.onMoreReviewsClick = this.onMoreReviewsClick.bind(this);
  }

  componentDidMount() {
    this.setState({reviews: reviewData.results});
    var rating = 0;
    for (var i = 0; i < reviewData.results.length; i++) {
      rating += reviewData.results[i].rating;
    }
    var divisor = this.state.reviews.length;
    var avgRating = (rating / divisor);
    console.log(avgRating);
    this.setState({avgRating: avgRating});
  }

  onSortChange(event) {
    if (event.target.value === 'relevant') {
      var sortedReviews = this.state.reviews.sort((a, b) => {
        if (a.date !== b.date) {
          var aDate = new Date(a.date);
          var bDate = new Date(b.date);
          return bDate.valueOf() - aDate.valueOf();
        } else {
          return b.helpfulness - a.helpfulness;
        }
      });
      this.setState({reviews: sortedReviews});
      console.log('Reviews sorted');
    } else if (event.target.value === 'helpful') {
      var sortedReviews = this.state.reviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
      console.log(sortedReviews);
      this.setState({reviews: sortedReviews});
    } else if (event.target.value === 'newest') {
      var sortedReviews = this.state.reviews.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      this.setState({reviews: sortedReviews});
    }
  }

  onMoreReviewsClick() {
    this.setState({numOfReviews: this.state.numOfReviews + 2});
  }

  render() {
    return (
      <div id="review-module">
        <div id="review-header">
          <h2>{this.state.reviews.length} reviews</h2>
          <label htmlFor="sort-list"><b>Sorted By:  </b></label>
          <select name="sort-list" onChange={this.onSortChange}>
            <option value="relevant">Relevant</option>
            <option value="newest">Newest</option>
            <option value="helpful">Helpful</option>
          </select>
        </div>
        <div className="overflow-auto" id="review-list">
          <div className="overflow-auto">
            {this.state.reviews.map((review, index) => {
              if (index < this.state.numOfReviews) {
                return <ReviewTile key={index} review={review}/>;
              }
            })}
          </div>
        </div>
        <div id="review-list-buttons">
          {this.state.reviews.length > this.state.numOfReviews ? <button id="more-reviews" onClick={this.onMoreReviewsClick}>More Reviews</button> : null}
          <button id="write-review">Write Review</button>
        </div>
      </div>
    );
  }
}

export default ReviewList;