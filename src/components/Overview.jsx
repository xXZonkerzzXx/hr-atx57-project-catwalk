/* eslint-disable func-style */
import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery.jsx";
import Styles from "./Styles.jsx";
import { Grid } from "@material-ui/core";
import ReactDOM from "react-dom";
import { Rating } from "@material-ui/core";
import config from "../../config.js";
import axios from "axios";
import DefaultImg from "./DefaultImg.jsx";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgRating: props.avgRating,
      currentItem: props.currentItem || {},
      currentStyles: props.currentStyles || [],
      mainImgIndex: null,
      cartCount: 0,
    };
    this.getDefaultImg = this.getDefaultImg.bind(this);
    this.getQtySelector = this.getQtySelector.bind(this);
    this.renderQtyOption = this.renderQtyOption.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

   componentDidMount() {
    const data = {
      headers: config,
      baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hratx/",
    };
    axios.get('/products', data)
      .then(async (response) => {
        const currentItem = await this.setState({
          currentItem: response.data[0]
        });
        axios
          .get(`products/${this.state.currentItem.id}/styles`, data)
          .then(async (content) => {
            const currentStyles = await this.setState({
              currentStyles: content.data.results,
            });
            const defaultImg = await this.getDefaultImg();
          })
          .catch((err) => {
            console.error("Error from styles get request: ", err);
          });
      })
      .catch((err) => {
        console.error("Error from products fetch: ", err);
      })
  }

  async getDefaultImg() {
    for (let i = 0; i < this.state.currentStyles.length; i++) {
      if (this.state.currentStyles[i]["default?"] === true) {
        const mainImgIndex = await this.setState({
          mainImgIndex: i,
        });
        return;
      }
    }
  }

  getQtySelector(i) {
    if (this.state.currentStyles[i]) {
      for (let key in this.state.currentStyles[i].skus) {
        for (let j = 0; j < this.state.currentStyles[i].skus[key].quantity; j++) {
          this.renderQtyOption(j);
        }
      }
    }
  }

  renderQtyOption(j) {
    return <option value={j}>{j}</option>;
  }

  onAddToCart() {
    this.setState({ cartCount: this.state.cartCount + 1 });
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={7}>
            <DefaultImg
              currentStyles={this.state.currentStyles}
              mainImgIndex={this.state.mainImgIndex}
            />
            <ImageGallery
              currentStyles={this.state.currentStyles}
              mainImgIndex={this.state.mainImgIndex}/>
          </Grid>
          <Grid item xs={5}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs>
                <span>Cart {this.state.cartCount}</span>
              </Grid>
              <Grid item xs>
                <Rating
                  name="half-rating-read"
                  size="large"
                  value={this.props.avgRating}
                  precision={1 / 4}
                  readOnly
                />
              </Grid>
              <Grid item xs>
                <span>{this.state.currentItem.category}</span>
              </Grid>
              <Grid item xs>
                <h2>{this.state.currentItem.name}</h2>
              </Grid>
              <Grid item xs>
                <span>${this.state.currentItem.default_price}</span>
              </Grid>
              <Grid item xs>
                <span>STYLE {">"} SELECTED STYLE</span>
              </Grid>
              <Styles currentStyles={this.state.currentStyles} />
              <Grid item xs>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={7}>
                    <select name="Select Size" id="size-select">
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </Grid>
                  <Grid item xs>
                    <select name="Select Quantity" id="qty-select">
                      {this.getQtySelector(this.state.mainImgIndex)}
                    </select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={9}>
                    <button onClick={this.onAddToCart}>Add to Cart</button>
                  </Grid>
                  <Grid item xs={3}>
                    <span>Fav</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Overview;
