import React, { Component } from "react";

import "./Overlay.css";
import Sidebar from "./Sidebar";
import TimeSlider from "./TimeSlider";
import Form from "./Form";

class Overlay extends Component {
  handleTimeSliderChange = (value) => {
    this.props.onTimeSliderChange(value);
  };

  handleSelectionChange = (id) => {
    this.props.onSelectionChange(id);
  };

  handleFormChange = (id) => {
    this.props.onFormChange(id);
  };

  render() {
    const { minDate, maxDate, groups } = this.props;
    return (
      <div className="overlay">
        <Sidebar
          onFormChange={this.handleFormChange}
          onSelectionChange={this.handleSelectionChange}
          groups={groups}
        />
        <div className="overlay-right">
          <TimeSlider
            min={minDate}
            max={maxDate}
            onChange={this.handleTimeSliderChange}
          />
          <Form 
            onFormChange={this.handleFormChange}
          />
        </div>
      </div>
    );
  }
}

export default Overlay;
