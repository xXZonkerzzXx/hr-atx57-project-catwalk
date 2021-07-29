import React from "react";
import ReactDOM from "react-dom";
import Reviews from "./ReviewList.jsx";
import Overview from "./Overview.jsx";
import ImageGallery from "./ImageGallery.jsx";
import { Grid } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onSearchBarInput = this.onSearchBarInput.bind(this);
  }

  onSearchBarInput(e) {
    e.persist();
    this.setState({
      input: e.target.value,
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

        <Overview />

        {/*<Overview />
        <Reviews />
        <Questions />
        <Related /> */}

        <Reviews />

      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
