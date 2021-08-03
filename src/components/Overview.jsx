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
import FullGallery from 'react-image-gallery';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {},
      avgRating: 0,
      currentItem: this.props.currentItem,
      currentStyles: this.props.currentStyles,
      mainImgIndex: null,
      cartCount: 0
    };
    this.getDefaultImg = this.getDefaultImg.bind(this);
    this.getQtySelector = this.getQtySelector.bind(this);
    this.renderQtyOption = this.renderQtyOption.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentItem.id !== this.props.currentItem.id) {
      this.setState(
        {
          currentItem: this.props.currentItem,
          currentStyles: this.props.currentStyles,
        },
        () => {
          const data = {
            headers: config,
            baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hratx/",
          };
          axios
            .get(
              `/reviews/meta?product_id=${this.props.currentItem.id.toString()}`,
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
                });
                // getDefaultImg();
              });
            })
            .catch((err) => {
              console.error("Error from reviews get Request", err);
            });
        }
      );
    }
  }

  getDefaultImg() {
    for (let i = 0; i < this.state.currentStyles.length; i++) {
      if (this.state.currentStyles[i]["default?"] === true) {
        this.setState({
          mainImgIndex: i,
        });
        console.log(this.state.currentStyles[i].photos[0].thumbnail_url);
        // return (
        //   <div>
        //     <img
        //       src={this.state.currentStyles[i].photos[0].thumbnail_url}
        //     ></img>
        //     <p>hello</p>
        //   </div>
        // );
      }
    }
  }

  getQtySelector(i) {
    if (this.state.currentStyles[i]) {
      for (let j = 0; j < this.state.currentStyles[i].skus.null.quantity; j++) {
        renderQtyOption(j);
      }
    }
  }

  renderQtyOption(j) {
    return <option value={j}>{j}</option>;
  }

  onAddToCart() {
    this.setState({cartCount: this.state.cartCount + 1});
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
            <DefaultImg currentStyles={this.props.currentStyles} mainImgIndex={this.props.mainImgIndex} />
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
                  value={this.state.avgRating}
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
              <Styles currentStyles={this.props.currentStyles} />
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
        <ImageGallery />
      </div>
    );
  }
}

export default Overview;
