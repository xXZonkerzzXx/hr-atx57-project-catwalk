/* eslint-disable func-style */
import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery.jsx";
import Styles from "./Styles.jsx";
import { Grid } from "@material-ui/core";
import ReactDOM from "react-dom";
import $ from 'jquery';

function Overview(props) {
  const [currentItem, setCurrentItem] = useState({});
  const [currentStyles, setCurrentStyles] = useState([]);

  useEffect(() => {
    setCurrentItem(props.currentItem);
  }, [currentItem]);

  useEffect(async () => {
    const promise = await setCurrentStyles(props.currentStyles)
    console.log(props.currentStyles);
    ReactDOM.render(
      <Styles currentStyles={currentStyles} />,
      document.getElementById("styles-container")
    );
  }, [currentStyles]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={7}>
          <div id="default-image"></div>
        </Grid>
        <Grid item xs={5}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <span>Star Rating - Read all reviews</span>
            </Grid>
            <Grid item xs>
              <span>{props.currentItem.category}</span>
            </Grid>
            <Grid item xs>
              <h2>{props.currentItem.name}</h2>
            </Grid>
            <Grid item xs>
              <span>{props.currentItem.price}</span>
            </Grid>
            <Grid item xs>
              <span>STYLE {">"} SELECTED STYLE</span>
            </Grid>
            <div id="styles-container"></div>
            <Grid item xs>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item xs={7}>
                  <span>Select Size</span>
                </Grid>
                <Grid item xs>
                  <span>Select Qty</span>
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
                  <span>Add to Cart</span>
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

export default Overview;
