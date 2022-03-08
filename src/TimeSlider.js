import React, { Component } from "react";
import Slider from "@mui/material/Slider";

import "./TimeSlider.css";

const minDistance = 20;

class TimeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = { value: [20, 37], valueText: "ici", min: null, max: null };
  }

  componentDidMount() {
    const { min, max } = this.props;
    this.setState({ min: min, max: max, value: [min, max] });
  }

  componentDidUpdate(prevProps) {
    const { min, max } = this.props;
    if (prevProps.min !== min || prevProps.max !== max) {
      this.setState({ min: min, max: max, value: [min, max] });
    }
  }

  computeDate = (timestamp) => {
    const { min, max } = this.state;
    const minDate = new Date(min * 1000);
    const maxDate = new Date(max * 1000);
    const date = new Date(timestamp * 1000);

    let result =
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);

    if (!this.datesAreOnSameDay(minDate, maxDate)) {
      result =
        ("0" + date.getDay()).slice(-2) +
        "/" +
        ("0" + date.getMonth()).slice(-2) +
        "/" +
        ("0" + date.getFullYear()).slice(-2) +
        " " +
        result;
    }

    return result;
  };

  datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  handleChange = (event, newValue, activeThumb) => {
    const { min, max } = this.state;

    if (!Array.isArray(newValue)) {
      return;
    }

    let value = [min, max];

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        if (newValue[1] < max) {
          value = [newValue[0], newValue[0] + minDistance];
        }
      } else {
        if (newValue[0] > min) {
          value = [newValue[1] - minDistance, newValue[1]];
        }
      }
    } else {
      value = newValue;
    }

    this.setState({ value: value });
    this.props.onChange(value);
  };

  render() {
    const { value, valuetext, min, max } = this.state;
    return (
      <div className="card time-slider">
        <div className="indicator indicator-left">
          {this.computeDate(value[0])}
        </div>
        <Slider
          getAriaLabel={() => "Sélection de l'intervalle de temps"}
          value={value}
          min={min}
          max={max}
          onChange={this.handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          disableSwap
        />
        <div className="indicator indicator-right">
          {this.computeDate(value[1])}
        </div>
      </div>
    );
  }
}

export default TimeSlider;
