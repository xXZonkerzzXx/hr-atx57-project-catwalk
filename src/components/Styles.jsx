/* eslint-disable func-style */
import React from "react";
import { Grid } from "@material-ui/core";

function Styles(props) {
  const renderStyleThumb = (i) => {
    if (props.currentStyles[i]) {
      return (
        <Grid item xs>
          <img className="style" src={props.currentStyles[i].photos[0].thumbnail_url}></img>
        </Grid>
      );
    }
  };

  const renderStyles1stRow = () => {
    let array = [];
    for (let i = 0; i <= 3; i++) {
      array.push(renderStyleThumb(i));
    }
    return array;
  };

  const renderStyles2ndRow = () => {
    let array = [];
    for (let i = 4; i <= 7; i++) {
      array.push(renderStyleThumb(i));
    }
    return array;
  };

  return (
    <div>
      <Grid item xs>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          {renderStyles1stRow()}
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          {renderStyles2ndRow()}
        </Grid>
      </Grid>
    </div>
  );
}

export default Styles;
