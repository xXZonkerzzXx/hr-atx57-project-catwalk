import React from 'react';
import ImageGallery from './ImageGallery.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ImageGallery />
      </div>
    );
  }

}

export default Overview;