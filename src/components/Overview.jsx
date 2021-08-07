/* eslint-disable func-style */
import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery.jsx';
import Styles from './Styles.jsx';
import { Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Rating } from '@material-ui/core';
import config from '../../config.js';
import axios from 'axios';
import DefaultImg from './DefaultImg.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgRating: props.avgRating,
      currentItem: props.currentItem || {},
      currentStyles: props.currentStyles || [],
      mainImgIndex: null,
      cartCount: 0,
      styleIndex: 0
    };
    this.getDefaultImg = this.getDefaultImg.bind(this);
    this.getQtySelector = this.getQtySelector.bind(this);
    this.renderQtyOption = this.renderQtyOption.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.getStyleName = this.getStyleName.bind(this);
    this.setStyleIndex = this.setStyleIndex.bind(this);
    this.setMainImgIndex = this.setMainImgIndex.bind(this);
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

  getStyleName() {
    if (this.state.currentStyles[this.state.mainImgIndex]) {
      return this.state.currentStyles[this.state.mainImgIndex].name;
    }
  }

  setStyleIndex(e) {
    this.setState({ styleIndex: e.target.parentElement.parentElement.attributes[0].value });
  }

  setMainImgIndex(e) {
    this.setState({
      mainImgIndex: e.target.parentElement.parentElement.attributes[1].value,
      styleIndex: 0
    });
  }

  getQtySelector() {
    let array = [];
    for (let j = 1; j < 15; j++) {
      array.push(this.renderQtyOption(j));
    }
    return array;
  }

  renderQtyOption(j) {
    return <option value={j} key={j}>{j}</option>;
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
              styleIndex={this.state.styleIndex}
            />
            <ImageGallery
              currentStyles={this.state.currentStyles}
              mainImgIndex={this.state.mainImgIndex}
              setStyleIndex={this.setStyleIndex}/>
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
                <span>STYLE {'>'} {this.getStyleName()}</span>
              </Grid>
              <Styles
                currentStyles={this.state.currentStyles}
                setMainImgIndex={this.setMainImgIndex}
              />
              <Grid item xs>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={3}>
                    <select name="Select Size" className='selector'>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </Grid>
                  <Grid item xs={3}>
                    <select name="Select Quantity" className='selector'>
                      {this.getQtySelector()}
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
                    <button className="add-fav" onClick={this.onAddToCart}>Add to Cart</button>
                  </Grid>
                  <Grid item xs={3}>
                    <button className='add-fav' >Fav</button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Grid item xs>
                <a href="https://twitter.com/intent/tweet?button_hashtag=localhost:3000&ref_src=twsrc%5Etfw" className="twitter-hashtag-button" data-show-count="false">Tweet</a>
                </Grid>
                <Grid item xs>
                <a data-pin-do="buttonFollow" href="https://www.pinterest.com/PlaidOPuss/">Plaid&nbsp;O'Puss</a>
                </Grid>
                <Grid item xs>
                <div className="fb-like" data-href="https://www.facebook.com/Plaid-OPuss-136523078581296/" data-width="80" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
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

