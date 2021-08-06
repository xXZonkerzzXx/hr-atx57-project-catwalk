import React from 'react';
import { Rating } from '@material-ui/core';
import axios from 'axios';
import config from '../../config.js';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';



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
      reported: false,
      showImgModal: false
    };
    this.onReportClick = this.onReportClick.bind(this);
    this.onHelpfulClick = this.props.onHelpfulClick.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
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


  onReportClick() {
    this.setState({ reported: true });
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/'
    };
    axios.put(`/reviews/${this.props.review.review_id}/report`, null, data)
      .then(() => {
        console.log('Review Reported');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onPhotoClick(event) {
    this.setState({ currentPhotoSrc: event.target.src }, () => {
      this.setState({ showImgModal: true });
    });
  }

  onModalClose() {
    this.setState({showImgModal: false});
  }

  render() {
    if (!this.state.reported) {
      return (
        <div className="review-tile" key={this.props.id}>
          <Rating name="quarter-rating-read" size="large" value={this.state.rating} precision={1 / 4} readOnly />
          <p id="review-date">{this.props.review.reviewer_name} {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(this.state.date)}</p>
          <p id="review-summary">{this.props.review.summary}</p>
          <p id="review-body">{this.props.review.body}</p>
          <div id="review-photos">
            {this.state.photos.map((photo) => {
              return (
                <img className="photo" key={photo.id} src={photo.url} alt="Review Photos" onClick={this.onPhotoClick}></img>
              );
            })}
          </div>
          {this.props.review.recommend ? <p id="recommended">&#10003; I recommend this product!</p> : null}
          {this.props.review.response ? <p id="seller-response"><b>Response from seller:</b> <br></br><br></br>{this.props.review.response}</p> : null}
          <p id="is-helpful"> Helpful? <button type='submit' onClick={!this.state.helpfulClicked ? this.onHelpfulClick : null}><u>Yes</u> &#40;{this.state.helpful}&#41;</button>   <button id="not-helpful"><u>No</u></button></p>
          <p id="report-review" onClick={this.onReportClick}><u>Report</u></p>
          <Modal show={this.state.showImgModal}>
            <ModalHeader >
              Review Photo
              <input type='button' onClick={this.onModalClose} value='X'></input>
            </ModalHeader>
            <ModalBody>
              <img id="review-photo-modal" src={this.state.currentPhotoSrc} alt="Review Photo"></img>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReviewTile;