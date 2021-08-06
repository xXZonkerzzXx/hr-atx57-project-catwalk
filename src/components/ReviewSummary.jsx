/* eslint-disable indent */
import React from 'react';
import { Rating, Slider } from '@material-ui/core';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import config from '../../config.js';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemId: this.props.currentItem.id,
      avgRating: 0,
      ratings: 0,
      characteristics: {},
      sizeChars: [
        { label: 'A size too small', value: 1 },
        { label: '1/2 a size too small', value: 2 },
        { label: 'Perfect', value: 3 },
        { label: '1/2 a size too big', value: 4 },
        { label: 'A size too wide', value: 5 },
      ],
      widthChars: [
        { label: 'Too narrow', value: 1 },
        { label: 'Slightly Narrow', value: 2 },
        { label: 'Perfect', value: 3 },
        { label: 'Slightly wide', value: 4 },
        { label: 'Too wide', value: 5 },
      ],
      comfortChars: [
        { label: 'Uncomfortable', value: 1 },
        { label: 'Slightly uncomfortable', value: 2 },
        { label: 'Ok', value: 3 },
        { label: 'Comfortable', value: 4 },
        { label: 'Perfect', value: 5 },
      ],
      qualityChars: [
        { label: 'Poor', value: 1 },
        { label: 'Below average', value: 2 },
        { label: 'What I expected', value: 3 },
        { label: 'Pretty great', value: 4 },
        { label: 'Perfect', value: 5 },
      ],
      lengthChars: [
        { label: 'Runs short', value: 1 },
        { label: 'Runs slightly short', value: 2 },
        { label: 'Perfect', value: 3 },
        { label: 'Runs slightly long', value: 4 },
        { label: 'Runs long', value: 5 },
      ],
      fitChars: [
        { label: 'Runs tight', value: 1 },
        { label: 'Runs slightly tight', value: 2 },
        { label: 'Perfect', value: 3 },
        { label: 'Runs slightly long', value: 4 },
        { label: 'Runs long', value: 5 },
      ],
    };
  }

  componentDidMount() {
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
    };
    this.setState({ currentItemId: this.props.currentItem.id }, () => {
      axios
        .get(
          `/reviews/meta?product_id=${this.state.currentItemId.toString()}`,
          data
        )
        .then((response) => {
          this.setState({ ratings: response.data.ratings }, () => {
            var rating = 0;
            var totalRatings = 0;
            for (var key in this.state.ratings) {
              rating += Number(this.state.ratings[key]) * Number(key);
              totalRatings += Number(this.state.ratings[key]);
            }
            var avgRating = rating / totalRatings;
            this.setState({
              avgRating: avgRating,
              totalRatings: totalRatings,
              recommended: response.data.recommended.true,
              notRecommended: response.data.recommended.false,
              characteristics: response.data.characteristics,
            });
          });
        })
        .catch((err) => {
          console.error('Error from reviews get Request', err);
        });
    });
  }

  render() {
    return (
      <div id="reviews-summary">
        <h3 id="avg-rating">
          {this.state.avgRating.toFixed(1)}{' '}
          <Rating
            name="quarter-rating-read"
            size="large"
            value={this.state.avgRating}
            precision={1 / 4}
            readOnly
          />
        </h3>
        <p>
          {(
            (Number(this.state.recommended) /
              (Number(this.state.recommended) +
                Number(this.state.notRecommended))) *
            100
          ).toFixed(0)}
          % of reviewers recommend this product.
        </p>
        <div id="progress-bars">
          <div>
            1 Star:
            <ProgressBar
              variant="success"
              now={(this.state.ratings[1] / this.state.totalRatings) * 100}
            />{' '}
            <p className="numOfReviews">{this.state.ratings[1]}</p>
          </div>
          <div>
            2 Stars:
            <ProgressBar
              variant="success"
              now={(this.state.ratings[2] / this.state.totalRatings) * 100}
            />{' '}
            <p className="numOfReviews">{this.state.ratings[2]}</p>
          </div>
          <div>
            3 Stars:
            <ProgressBar
              variant="success"
              now={(this.state.ratings[3] / this.state.totalRatings) * 100}
            />{' '}
            <p className="numOfReviews">{this.state.ratings[3]}</p>
          </div>
          <div>
            4 Stars:
            <ProgressBar
              variant="success"
              now={(this.state.ratings[4] / this.state.totalRatings) * 100}
            />{' '}
            <p className="numOfReviews">{this.state.ratings[4]}</p>
          </div>
          <div>
            5 Stars:
            <ProgressBar
              variant="success"
              now={(this.state.ratings[5] / this.state.totalRatings) * 100}
            />{' '}
            <p className="numOfReviews">{this.state.ratings[5]}</p>
          </div>
        </div>
        <div id="product-characteristics">
          {Object.keys(this.state.characteristics).map((char) => {
            return (
              <div className="slider-bars" key={char}>
                <p>{char}</p>
                <Slider
                  value={
                    this.state.characteristics[char]
                      ? Number(this.state.characteristics[char].value)
                      : 3
                  }
                  disabled={true}
                  aria-label="Custom marks"
                  aria-labelledby="discrete-slider-restrict"
                  step={0.1}
                  min={1}
                  max={5}
                  valueLabelDisplay="on"
                  size="small"
                  valueLabelFormat={(num) => {
                    if (char === 'Size') {
                      return this.state.sizeChars[Math.round(num)].label;
                    } else if (char === 'Width') {
                      return this.state.widthChars[Math.round(num)].label;
                    } else if (char === 'Comfort') {
                      return this.state.comfortChars[Math.round(num)].label;
                    } else if (char === 'Quality') {
                      return this.state.qualityChars[Math.round(num)].label;
                    } else if (char === 'Length') {
                      return this.state.lengthChars[Math.round(num)].label;
                    } else if (char === 'Fit') {
                      return this.state.fitChars[Math.round(num)].label;
                    }
                  }}
                />
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ReviewSummary;
