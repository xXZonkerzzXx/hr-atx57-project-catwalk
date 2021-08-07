import React from "react";
import ReactDOM from "react-dom";
import Reviews from "./ReviewList.jsx";
import Overview, { onSearchBarSubmit } from "./Overview.jsx";
import ImageGallery from "./ImageGallery.jsx";
import ReviewSummary from "./ReviewSummary.jsx";
import { Grid } from "@material-ui/core";
import axios from "axios";
import config from "../../config.js";
import Logo from './imgs/PlaidOPuss.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      currentItem: {
        category: "Ducks",
        name: "Mallard",
        price: "Free",
        id: 24156,
        photos: [{ thumbnail_url: "" }, {}, {}],
      },
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
    this.getAvgRating = this.getAvgRating.bind(this);
  }

  onSearchBarInput(e) {
    e.persist();
    this.setState({
      input: e.target.value,
    });
  }

  async onSearchBarSubmit(e) {
    e.preventDefault();
    const currentItemSet = await this.setState({
      currentItem: this.props.allItems[Number(this.props.input)]
    });
  }

  async getAvgRating() {
    var rating = 0;
    var totalRatings = 0;
    for (var key in this.state.ratings) {
      rating += Number(this.state.ratings[key]) * Number(key);
      totalRatings += Number(this.state.ratings[key]);
    }
    var avgRating = rating / totalRatings;
    const avgRatingSet = await this.setState({
      avgRating: avgRating,
    });
  }

  componentDidMount() {
    const data = {
      headers: config,
      baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hratx/",
    };
    axios
      .get("/products", data)
      .then(async (response) => {
        const itemsSet = await this.setState({
          currentItem: response.data[0],
          allItems: response.data
        });
        axios
          .get(`products/${this.state.currentItem.id}/styles`, data)
          .then(async (content) => {
            const currentStylesSet = await this.setState({
              currentStyles: content.data.results,
            });
            axios
              .get(
                `/reviews/meta?product_id=${this.state.currentItem.id.toString()}`,
                data
              )
              .then(async (response) => {
                const ratingsSet = await this.setState({
                  ratings: response.data.ratings,
                  characteristics: response.data.characteristics
                });
                const avgRatingSet = await this.getAvgRating();
              })
              .catch((err) => {
                console.error("Error from reviews get Request", err);
              });
          })
          .catch((err) => {
            console.error("Error from styles get request: ", err);
          });
      })
      .catch((err) => {
        console.error("Error from products get request: ", err);
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
            <h1>Plaid O'Puss</h1>
          </Grid>
          <Grid item xs={3}>
            <img id="logo" alt='plaidOPuss Logo' src={Logo}></img>
          </Grid>
          <Grid item xs={3}>
            <form onSubmit={this.onSearchBarSubmit}>
            <input className='search'
              value={this.state.input}
              onChange={this.onSearchBarInput}
            ></input>
            <button className='submit' type="submit">Search</button>
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} justifyContent='space-around' container={true}>
            <span>
              SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW
              PRODUCT HIGHLIGHT
            </span>
          </Grid>
        </Grid>

        <Overview avgRating={this.state.avgRating}
          input={this.state.input}
          allItems={this.state.allItems}
          onSearchBarSubmit={this.onSearchBarSubmit}/>

        <div className="reviews">
          <ReviewSummary currentItem={this.state.currentItem} chars={this.state.chars}/>
          <Reviews currentItem={this.state.currentItem} characteristics={this.state.characteristics} chars={this.state.chars}/>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
