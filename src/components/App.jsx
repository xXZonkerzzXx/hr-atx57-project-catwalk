import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview.jsx';
import ImageGallery from './ImageGallery.jsx';

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
        {/*
        <Reviews />
        <Questions />
        <Related /> */}
      </main>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));