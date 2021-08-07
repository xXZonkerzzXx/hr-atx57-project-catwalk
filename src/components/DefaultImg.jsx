import React from "react";

class DefaultImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyles: this.props.currentStyles,
      mainImgIndex: this.props.mainImgIndex,
      styleIndex: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.styleIndex !== this.props.styleIndex || prevProps.currentStyles[0] !== this.props.currentStyles[0] || prevProps.mainImgIndex !== this.props.mainImgIndex) {
      this.setState({
        currentStyles: this.props.currentStyles,
        mainImgIndex: this.props.mainImgIndex,
        styleIndex: this.props.styleIndex
      })
    }
  }

  render() {
    if (this.state.currentStyles[this.state.mainImgIndex] !== undefined) {
      return (
        <div>
          <img
            className='default-img'
            src={
              this.state.currentStyles[this.state.mainImgIndex].photos[this.state.styleIndex].thumbnail_url
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
