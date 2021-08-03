import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import config from '../../config.js';
import axios from 'axios';

class ReviewList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItemId: this.props.currentItem.id,
      reviews: [],
      numOfReviews: 2
    };
    this.onSortChange = this.onSortChange.bind(this);
    this.onMoreReviewsClick = this.onMoreReviewsClick.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.currentItem.id !== this.props.currentItem.id) {
      this.setState({ currentItemId: this.props.currentItem.id }, () => {
        const data = {
          headers: config,
          baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/'
        };
        axios.get(`reviews?product_id=${this.state.currentItemId.toString()}&count=100`, data)
          .then((response) => {
            this.setState({ reviews: response.data.results }, () => {
              var rating = 0;
              for (var i = 0; i < this.state.reviews.length; i++) {
                rating += this.state.reviews[i].rating;
              }
              var divisor = this.state.reviews.length;
              var avgRating = (rating / divisor);
              this.setState({ avgRating: avgRating });
            });
          })
          .catch((err) => {
            console.error('Error from reviews get Request', err);
          });
      });
    }
  }

  onHelpfulClick(event) {
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/'
    };
    axios.put(`reviews/${this.props.review.review_id}/helpful`, null, data)
      .then(() => {
        this.setState({helpful: this.state.helpful + 1, helpfulClicked: true});
      })
      .catch((err) => {
        console.error('Error', err);
      });
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
      this.setState({ reviews: sortedReviews });
    } else if (event.target.value === 'helpful') {
      var sortedReviews = this.state.reviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
      this.setState({ reviews: sortedReviews });
    } else if (event.target.value === 'newest') {
      var sortedReviews = this.state.reviews.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      this.setState({ reviews: sortedReviews });
    }
  }

  onMoreReviewsClick() {
    this.setState({ numOfReviews: this.state.numOfReviews + 2 });
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
                return <ReviewTile key={index} review={review} currentItemId={this.state.currentItemId} onHelpfulClick={this.onHelpfulClick}/>;
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