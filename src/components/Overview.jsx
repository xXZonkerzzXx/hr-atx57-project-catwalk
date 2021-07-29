import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import { Grid } from '@material-ui/core';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={7}>
            <div id='default-image'></div>
          </Grid>
          <Grid item xs={5}>
            <Grid
              container
              direction='column'
              justifyContent='flex-start'
              alignItems='flex-start'
            >
              <Grid item xs>
                <span>Star Rating - Read all reviews</span>
              </Grid>
              <Grid item xs>
                <span>CATEGORY</span>
              </Grid>
              <Grid item xs>
                <h2>Expanded Product Name</h2>
              </Grid>
              <Grid item xs>
                $369
              </Grid>
              <Grid item xs>
                <span>STYLE {'>'} SELECTED STYLE</span>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                  <Grid item xs>
                    <img></img>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
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
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <Grid item xs={10}>
                    <span>Add to Cart</span>
                  </Grid>
                  <Grid item xs>
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