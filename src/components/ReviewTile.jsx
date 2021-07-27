import React from 'react';
import { Rating } from '@material-ui/core';
import ReviewData from '../../reviewDummyData.js';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
  }

  onHelpfulClick(event) {
    console.log(ReviewData);
  }

  render() {
    return (
      <div id="review-tile">
        <Rating name="half-rating-read" size="large" defaultValue={2.75} precision={1 / 4} readOnly/>
        <p id="review-date">Author of review and Review Date goes here</p>
        <p id="review-summary">Review Summary goes here</p>
        <p id="review-body">Review Body Goes here</p>
        <p id="recommended">If author recommends product.</p>
        <p id="seller-response">If seller has responded to review, place here</p>
        <p id="is-helpful"> Helpful? <button onClick={this.onHelpfulClick}><u>Yes</u></button> &#40;#ofHelpfuls&#41;</p>
        <p id="report-review"><u>Report</u></p>
      </div>
    );
  }
}

export default ReviewTile;