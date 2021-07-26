import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        This is where the app will go.
        {/* <Overview />
        <Reviews />
        <Questions />
        <Related /> */}
      </main>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));