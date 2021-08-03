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
        price: 'Free'
      },
      currentStyles: [],
      avgRating: 0,
      ratings: {}
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
    axios.get('/products', data)
      .then((response) => {
        this.setState({
          currentItem: response.data[0]
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
            this.setState({ ratings: response.data.ratings }, () => {
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

        {/*<Overview />
        <Reviews />
        <Questions />
        <Related /> */}
        <div className="reviews">
          <ReviewSummary currentItem={this.state.currentItem} />
          <Reviews currentItem={this.state.currentItem} />
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root')
);
