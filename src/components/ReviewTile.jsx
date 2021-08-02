import React from 'react';
import { Rating } from '@material-ui/core';
import ReviewData from '../../reviewDummyData.js';
import axios from 'axios';
import config from '../../config.js';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.review.helpfulness,
      reviewSummary: this.props.review.summary,
      rating: this.props.review.rating,
      response: this.props.review.response,
      date: new Date(this.props.review.date),
      photos: this.props.review.photos,
      helpfulClicked: false,
      reported: false
    };
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
    this.onReportClick = this.onReportClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.review !== prevProps.review) {
      this.setState({
        date: new Date(this.props.review.date),
        rating: this.props.review.rating,
        helpful: this.props.review.helpfulness + (this.state.helpfulClicked ? 1 : 0),
        photos: this.props.review.photos
      });
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
          <Rating name="quarter-rating-read" size="large" value={this.state.rating} precision={1 / 4} readOnly/>
          <p id="review-date">{this.props.review.reviewer_name} {new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(this.state.date)}</p>
          <p id="review-summary">{this.props.review.summary}</p>
          <p id="review-body">{this.props.review.body}</p>
          <div id="review-photos">
            {this.state.photos.map((photo) => {
              return (<img className="photo" key={photo.id} src={photo.url} alt="Review Photos"></img>);
            })}
          </div>
          {this.props.review.recommend ? <p id="recommended">&#10003; I recommend this product!</p> : null}
          {this.props.review.response ? <p id="seller-response"><b>Response from seller:</b> <br></br><br></br>{this.props.review.response}</p> : null}
          <p id="is-helpful"> Helpful? <button onClick={!this.state.helpfulClicked ? this.onHelpfulClick : null}><u>Yes</u> &#40;{this.state.helpful}&#41;</button>   <button id="not-helpful"><u>No</u></button></p>
          <p id="report-review" onClick={this.onReportClick}><u>Report</u></p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReviewTile;