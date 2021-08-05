import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './ReviewList.jsx';
import Overview from './Overview.jsx';
import ImageGallery from './ImageGallery.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import config from '../../config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentItem: {
        category: 'Ducks',
        name: 'Mallard',
        price: 'Free',
      },
      currentStyles: [],
      avgRating: 0,
      ratings: {},
      chars: {
        Size: [
          { 'label': 'A size too small', 'value': 1 },
          { 'label': '1/2 a size too small', 'value': 2 },
          { 'label': 'Perfect', 'value': 3 },
          { 'label': '1/2 a size too big', 'value': 4 },
          { 'label': 'A size too wide', 'value': 5 },
        ],
        Width: [
          { 'label': 'Too narrow', 'value': 1 },
          { 'label': 'Slightly Narrow', 'value': 2 },
          { 'label': 'Perfect', 'value': 3 },
          { 'label': 'Slightly wide', 'value': 4 },
          { 'label': 'Too wide', 'value': 5 },
        ],
        Comfort: [
          { 'label': 'Uncomfortable', 'value': 1 },
          { 'label': 'Slightly uncomfortable', 'value': 2 },
          { 'label': 'Ok', 'value': 3 },
          { 'label': 'Comfortable', 'value': 4 },
          { 'label': 'Perfect', 'value': 5 },
        ],
        Quality: [
          { 'label': 'Poor', 'value': 1 },
          { 'label': 'Below average', 'value': 2 },
          { 'label': 'What I expected', 'value': 3 },
          { 'label': 'Pretty great', 'value': 4 },
          { 'label': 'Perfect', 'value': 5 },
        ],
        Length: [
          { 'label': 'Runs short', 'value': 1 },
          { 'label': 'Runs slightly short', 'value': 2 },
          { 'label': 'Perfect', 'value': 3 },
          { 'label': 'Runs slightly long', 'value': 4 },
          { 'label': 'Runs long', 'value': 5 },
        ],
        Fit: [
          { 'label': 'Runs tight', 'value': 1 },
          { 'label': 'Runs slightly tight', 'value': 2 },
          { 'label': 'Perfect', 'value': 3 },
          { 'label': 'Runs slightly long', 'value': 4 },
          { 'label': 'Runs long', 'value': 5 },
        ],
      },
      characteristics: []
    };
    this.onSearchBarInput = this.onSearchBarInput.bind(this);
  }

  onSearchBarInput(e) {
    e.persist();
    this.setState({
      input: e.target.value,
    });
  }

  componentDidMount() {
    const data = {
      headers: config,
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/'
    };
    axios.get('/products?count=100', data)
      .then((response) => {
        this.setState({
          currentItem: response.data[24]
        });
        axios.get(`products/${this.state.currentItem.id}/styles`, data)
          .then((content) => {
            this.setState({
              currentStyles: content.data.results
            });
          })
          .catch((err) => {
            console.error('Error from styles get request: ', err);
          });
        axios.get(`/reviews/meta?product_id=${this.state.currentItem.id.toString()}`, data)
          .then((response) => {
            this.setState({ ratings: response.data.ratings, characteristics: response.data.characteristics}, () => {
              var rating = 0;
              var totalRatings = 0;
              for (var key in this.state.ratings) {
                rating += (Number(this.state.ratings[key]) * Number(key));
                totalRatings += Number(this.state.ratings[key]);
              }
              var avgRating = (rating / totalRatings);
              this.setState({
                avgRating: avgRating
              });
            });
          })
          .catch((err) => {
            console.error('Error from reviews get Request', err);
          });
      })
      .catch((err) => {
        console.error('Error from products get request: ', err);
      });
  }

  render() {
    return (
      <main style={{ padding: 20 }}>
        <Grid
          container
          spacing={5}
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Grid item xs={3}>
            <h1>Logo</h1>
          </Grid>
          <Grid item xs={3}>
            <input
              value={this.state.input}
              onChange={this.onSearchBarInput}
            ></input>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <span>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</span>
          </Grid>
        </Grid>

        <Overview
          currentItem={this.state.currentItem} currentStyles={this.state.currentStyles}
          avgRating={this.state.avgRating}
          ratings={this.state.ratings} />

        <div className="reviews">
          <ReviewSummary currentItem={this.state.currentItem} chars={this.state.chars}/>
          <Reviews currentItem={this.state.currentItem} characteristics={this.state.characteristics} chars={this.state.chars}/>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));