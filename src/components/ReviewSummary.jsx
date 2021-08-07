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
      sizeChars: props.chars.Size,
      widthChars: props.chars.Width,
      comfortChars: props.chars.Comfort,
      qualityChars: props.chars.Quality,
      lengthChars: props.chars.Length,
      fitChars: props.chars.Fit,
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
          console.log(response);
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
                <div>
                  {char === 'Size' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.sizeChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.sizeChars[4].label}</p>
                    </div>
                  ) : char === 'Width' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.widthChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.widthChars[4].label}</p>
                    </div>
                  ) : char === 'Comfort' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.comfortChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.comfortChars[4].label}</p>
                    </div>
                  ) : char === 'Quality' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.qualityChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.qualityChars[4].label}</p>
                    </div>
                  ) : char === 'Length' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.lengthChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.lengthChars[4].label}</p>
                    </div>
                  ) : char === 'Fit' ? (
                    <div className="characteristicLabels">
                      <p className="characteristicLabels">{this.state.fitChars[0].label}</p>{' '}
                      <p className="characteristicLabels lastCharacteristic">{this.state.fitChars[4].label}</p>
                    </div>
                  ) : null}
                </div>
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
