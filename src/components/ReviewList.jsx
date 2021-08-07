import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import config from '../../config.js';
import axios from 'axios';
import WriteReviewForm from './WriteReviewModal.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemId: this.props.currentItem.id,
      reviews: [],
      numOfReviews: 2,
      avgRating: 0,
      showWriteReview: false
    };
    this.onSortChange = this.onSortChange.bind(this);
    this.onMoreReviewsClick = this.onMoreReviewsClick.bind(this);
    this.onWriteReviewClick = this.onWriteReviewClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  componentDidMount() {

    this.setState({ currentItemId: this.props.currentItem.id }, () => {
      const data = {
        headers: config,
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
      };
      axios
        .get(
          `reviews?product_id=${this.state.currentItemId.toString()}&count=100&sort=relevant`,
          data
        )
        .then((response) => {
          this.setState({ reviews: response.data.results }, () => {
            var rating = 0;
            for (var i = 0; i < this.state.reviews.length; i++) {
              rating += this.state.reviews[i].rating;
            }
            var divisor = this.state.reviews.length;
            var avgRating = rating / divisor;
            this.setState({ avgRating: avgRating });
          });
        })
        .catch((err) => {
          console.error('Error from reviews get Request', err);
        });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({characteristics: this.props.characteristics, chars: this.props.chars});
    }
  }

  onHelpfulClick(event) {
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
    };
    axios
      .put(`reviews/${this.props.review.review_id}/helpful`, null, data)
      .then(() => {
        this.setState({
          helpful: this.state.helpful + 1,
          helpfulClicked: true,
        });
      })
      .catch((err) => {
        console.error('Error', err);
      });
  }

  onSortChange(event) {
    console.log(event.target.value);
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
    };
    axios.get(`reviews?product_id=${this.state.currentItemId.toString()}&count=100&sort=${event.target.value}`, data)
      .then((response) => {
        this.setState({reviews: response.data.results});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onMoreReviewsClick() {
    this.setState({ numOfReviews: this.state.numOfReviews + 2 });
  }

  onWriteReviewClick() {
    this.setState({showWriteReview: true});
  }
  onCloseClick() {
    this.setState({showWriteReview: false});
  }

  render() {
    return (
      <div id="review-module">
        <div id="review-header">
          <h2>{this.state.reviews.length} reviews</h2>
          <label htmlFor="sort-list">
            <b>Sorted By: </b>
          </label>
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
                return (
                  <ReviewTile
                    key={index}
                    review={review}
                    currentItemId={this.state.currentItemId}
                    onHelpfulClick={this.onHelpfulClick}
                  />
                );
              }
            })}
          </div>
        </div>
        <div id="review-list-buttons">
          {this.state.reviews.length > this.state.numOfReviews ? <button id="more-reviews" onClick={this.onMoreReviewsClick}>More Reviews</button> : null}
          <button id="write-review" onClick={this.onWriteReviewClick}>Write Review</button>
          <WriteReviewForm showWriteReview={this.state.showWriteReview} currentItemId={this.state.currentItemId} characteristics={this.state.characteristics || {}} chars={this.state.chars} onCloseClick={this.onCloseClick}/>
        </div>
      </div>
    );
  }
}

export default ReviewList;
