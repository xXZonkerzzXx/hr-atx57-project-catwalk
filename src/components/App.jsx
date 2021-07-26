import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        This is where the app will load.
        {/* <Overview />

        <Questions />
        <Related /> */}
        <Reviews />
      </main>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));