import React, { Component } from "react";

import "./Overlay.css";
import Sidebar from "./Sidebar";
import TimeSlider from "./TimeSlider";

class Overlay extends Component {
  handleTimeSliderChange = (value) => {
    this.props.onTimeSliderChange(value);
  };

  render() {
    const { minDate, maxDate } = this.props;
    return (
      <div className="overlay">
        <Sidebar />
        <div className="overlay-right">
          <TimeSlider
            min={minDate}
            max={maxDate}
            onChange={this.handleTimeSliderChange}
          />
        </div>
      </div>
    );
  }
}

export default Overlay;
