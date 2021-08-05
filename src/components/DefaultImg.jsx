import React from "react";

class DefaultImg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentStyles[this.props.mainImgIndex] !== undefined) {
      return (
        <div>
          <img
            src={
              this.props.currentStyles[this.props.mainImgIndex].photos[0]
                .thumbnail_url
            }
          ></img>
        </div>
      );
    } else {
      return <div>hello</div>;
    }
  }
}

export default DefaultImg;
