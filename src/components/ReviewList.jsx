import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import reviewData from '../../reviewDummyData.js';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: reviewData.results
    };
    this.onSortChange = this.onSortChange.bind(this);
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
          console.log(a.date);
          console.log(b.date);
          return a.date - b.date;
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
    }
  }

  render() {
    return (
      <div id="review-list">
        <h2>{this.state.reviews.length - 1} reviews</h2>
        <label htmlFor="sort-list"><b>Sorted By:  </b></label>
        <select name="sort-list" onChange={this.onSortChange}>
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
        <ReviewTile review={this.state.reviews[0]}/>
        <ReviewTile review={this.state.reviews[1]}/>
      </div>
    );
  }
}

export default ReviewList;