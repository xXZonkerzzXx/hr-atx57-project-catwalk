import React from 'react';

class DefaultImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImgIndex: this.props.mainImgIndex,
      currentStyles: this.props.currentStyles
    };
  }

  render() {
    return (
      <div>
        <img
          src={this.state.currentStyles[i].photos[0].thumbnail_url}
        ></img>
        <p>hello</p>
      </div>
    );
  }
}

export default DefaultImg;