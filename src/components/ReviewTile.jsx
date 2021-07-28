import React from 'react';
import { Rating } from '@material-ui/core';
import ReviewData from '../../reviewDummyData.js';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.review.helpfulness,
      reviewSummary: this.props.review.summary,
      rating: this.props.review.rating,
      response: this.props.review.response,
      date: new Date(this.props.review.date),
      helpfulClicked: false,
      reported: false
    };
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
    this.onReportClick = this.onReportClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.review.reviewer_name !== prevProps.review.reviewer_name) {
      this.setState({date: new Date(this.props.review.date), rating: this.props.review.rating});
    }
  }

  onHelpfulClick(event) {
    this.setState({helpful: this.state.helpful + 1, helpfulClicked: true});
  }

  onReportClick() {
    this.setState({reported: true});
  }

  render() {
    if (!this.state.reported) {
      return (
        <div className="review-tile" key={this.props.id}>
          <Rating name="half-rating-read" size="large" value={this.state.rating} precision={1 / 4} readOnly/>
          <p id="review-date">{this.props.review.reviewer_name} {new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(this.state.date)}</p>
          <p id="review-summary">{this.props.review.summary}</p>
          <p id="review-body">{this.props.review.body}</p>
          {this.props.review.recommend ? <p id="recommended">&#10003; I recommend this product!</p> : null}
          {this.props.review.response ? <p id="seller-response"><b>Response from seller:</b> <br></br><br></br>{this.props.review.response}</p> : null}
          <p id="is-helpful"> Helpful? <button onClick={!this.state.helpfulClicked ? this.onHelpfulClick : null}><u>Yes</u></button> &#40;{this.props.review.helpfulness}&#41;</p>
          <p id="report-review" onClick={this.onReportClick}><u>Report</u></p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReviewTile;