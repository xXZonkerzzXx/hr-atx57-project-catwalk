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
        {/* <Overview />
        <Reviews /> */}
      </main>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));