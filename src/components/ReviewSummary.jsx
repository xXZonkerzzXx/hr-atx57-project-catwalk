import React from 'react';
import { Rating } from '@material-ui/core';
import dummyMetaData from '../../reviewDummyMetaData.js';
import ProgressBar from 'react-bootstrap/ProgressBar';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  componentDidMount() {
    var avgRating = 0;
    var totalRatings = 0;
    var ratings = dummyMetaData.ratings;
    for (var key in ratings) {
      avgRating = avgRating + (ratings[key] * key);
      totalRatings += Number(ratings[key]);
    }
    avgRating = (avgRating / totalRatings);
    this.setState({ rating: avgRating, totalRatings: totalRatings, recommended: dummyMetaData.recommended.true, notRecommended: dummyMetaData.recommended.false});
  }

  render() {
    return (
      <div id="reviews-summary">
        <h3>
          {this.state.rating.toFixed(1)} <Rating name="half-rating-read" size="large" value={this.state.rating} precision={1 / 4} readOnly />
        </h3>
        <p>{((Number(this.state.recommended) / (Number(this.state.recommended) + Number(this.state.notRecommended))) * 100).toFixed(0)}% of reviewers recommend this product.</p>
        <div id="progress-bars">
          <p>1 Star:</p>
          <ProgressBar now={(dummyMetaData.ratings[1] / this.state.totalRatings) * 100} />
          <p>2 Stars:</p>
          <ProgressBar now={(dummyMetaData.ratings[2] / this.state.totalRatings) * 100} />
          <p>3 Stars: </p>
          <ProgressBar now={(dummyMetaData.ratings[3] / this.state.totalRatings) * 100} />
          <p>4 Stars:</p>
          <ProgressBar now={(dummyMetaData.ratings[4] / this.state.totalRatings) * 100} />
          <p>5 Stars: </p>
          <ProgressBar now={(dummyMetaData.ratings[5] / this.state.totalRatings) * 100} />
        </div>
      </div>
    );
  }
}


export default ReviewSummary;