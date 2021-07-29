import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './ReviewList.jsx';
import Overview from './Overview.jsx';
import ImageGallery from './ImageGallery.jsx';
import ReviewSummary from './ReviewSummary.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <main>
        This is where the app will load.
        <Overview />

        {
        /*<Overview />
        <Reviews />
        <Questions />
        <Related /> */}
        <div className="reviews">
          <ReviewSummary />
          <Reviews />
        </div>
      </main>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));