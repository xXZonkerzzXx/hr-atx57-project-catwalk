import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="review-tile">
        <p id="star-rating">Star Rating goes here</p>
        <p id="review-date">Author of review and Review Date goes here</p>
        <p id="review-summary">Review Summary goes here</p>
        <p id="review-body">Review Body Goes here</p>
        <p id="recommended">If author recommends product.</p>
        <p id="seller-response">If seller has responded to review, place here</p>
        <p id="is-helpful"> Helpful? <button><u>Yes</u></button> &#40;#ofHelpfuls&#41;</p>
        <p id="report-review"><u>Report</u></p>
      </div>
    );
  }
}

export default ReviewTile;