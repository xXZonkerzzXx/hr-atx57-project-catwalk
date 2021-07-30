/* eslint-disable indent */
import React from 'react';
import { Rating } from '@material-ui/core';
import dummyMetaData from '../../reviewDummyMetaData.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Slider } from '@material-ui/core';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      sizeChars: [
        { 'label': 'A size too small', 'value': 0 },
        { 'label': '1/2 a size too small', 'value': 1 },
        { 'label': 'Perfect', 'value': 2 },
        { 'label': '1/2 a size too big', 'value': 3 },
        { 'label': 'A size too wide', 'value': 4 },
      ],
      widthChars: [
        { 'label': 'Too narrow', 'value': 0 },
        { 'label': 'Slightly Narrow', 'value': 1 },
        { 'label': 'Perfect', 'value': 2 },
        { 'label': 'Slightly wide', 'value': 3 },
        { 'label': 'Too wide', 'value': 4 },
      ],
      comfortChars: [
        { 'label': 'Uncomfortable', 'value': 0 },
        { 'label': 'Slightly uncomfortable', 'value': 1 },
        { 'label': 'Ok', 'value': 2 },
        { 'label': 'Comfortable', 'value': 3 },
        { 'label': 'Perfect', 'value': 4 },
      ],
      qualityChars: [
        { 'label': 'Poor', 'value': 0 },
        { 'label': 'Below average', 'value': 1 },
        { 'label': 'What I expected', 'value': 2 },
        { 'label': 'Pretty great', 'value': 3 },
        { 'label': 'Perfect', 'value': 4 },
      ],
      lengthChars: [
        { label: 'Runs short', value: 0 },
        { label: 'Runs slightly short', value: 1 },
        { label: 'Perfect', value: 2 },
        { label: 'Runs slightly long', value: 3 },
        { label: 'Runs long', value: 4 },
      ],
      fitChars: [
        { label: 'Runs tight', value: 0 },
        { label: 'Runs slightly tight', value: 1 },
        { label: 'Perfect', value: 2 },
        { label: 'Runs slightly long', value: 3 },
        { label: 'Runs long', value: 4 },
      ],
    };
  }

  componentDidMount() {
    var avgRating = 0;
    var totalRatings = 0;
    var ratings = dummyMetaData.ratings;
    for (var key in ratings) {
      avgRating = avgRating + ratings[key] * key;
      totalRatings += Number(ratings[key]);
    }
    avgRating = avgRating / totalRatings;
    this.setState({
      rating: avgRating,
      totalRatings: totalRatings,
      recommended: dummyMetaData.recommended.true,
      notRecommended: dummyMetaData.recommended.false,
    });
  }

  render() {
    return (
      <div id="reviews-summary">
        <h3>
          {this.state.rating.toFixed(1)}{' '}
          <Rating
            name="half-rating-read"
            size="large"
            value={this.state.rating}
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
          <p>1 Star:</p>
          <ProgressBar
            now={(dummyMetaData.ratings[1] / this.state.totalRatings) * 100}
          />
          <p>2 Stars:</p>
          <ProgressBar
            now={(dummyMetaData.ratings[2] / this.state.totalRatings) * 100}
          />
          <p>3 Stars: </p>
          <ProgressBar
            now={(dummyMetaData.ratings[3] / this.state.totalRatings) * 100}
          />
          <p>4 Stars:</p>
          <ProgressBar
            now={(dummyMetaData.ratings[4] / this.state.totalRatings) * 100}
          />
          <p>5 Stars: </p>
          <ProgressBar
            now={(dummyMetaData.ratings[5] / this.state.totalRatings) * 100}
          />
        </div>
        <div id="product-characteristics">
          {Object.keys(dummyMetaData.characteristics).map((char) => {
            return (
              <div className='slider-bars'>
              <Slider
                defaultValue={0}
                aria-label='Custom marks'
                aria-labelledby="discrete-slider-restrict"
                step={1}
                min={0}
                max={4}
                valueLabelDisplay="on"
                size="small"
                valueLabelFormat={(num) => {
                  if (char === 'Size') {
                    return this.state.sizeChars[num].label;
                  } else if (char === 'Width') {
                    return this.state.widthChars[num].label;
                  } else if (char === 'Comfort') {
                    return this.state.comfortChars[num].label;
                  } else if (char === 'Quality') {
                    return this.state.qualityChars[num].label;
                  } else if (char === 'Length') {
                    return this.state.lengthChars[num].label;
                  } else if (char === 'Fit') {
                    return this.state.fitChars[num].label;
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

