/* eslint-disable func-style */
import React from "react";
import { Grid, Avatar } from "@material-ui/core";

function Styles(props) {


  // const renderStyles1stRow = () => {
  //   let array = [];
  //   for (let i = 0; i <= 7; i++) {
  //     array.push(renderStyleThumb(i));
  //   }
  //   return array;
  // };

  // const renderStyles2ndRow = () => {
  //   let array = [];
  //   for (let i = 4; i <= 7; i++) {
  //     array.push(renderStyleThumb(i));
  //   }
  //   return array;
  // };

  return (
    <div>
      <Grid item xs>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {props.currentStyles.map((style, index) => {
            return (
              <Grid key={index} stylethumb={index} onClick={props.setMainImgIndex} item xs={3} className="style">
                <Avatar
                  alt={style.name}
                  src={style.photos[0].thumbnail_url}
                />
              </Grid>
            )})}
        </Grid>
      </Grid>
    </div>
  );
}

export default Styles;
