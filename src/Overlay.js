import React, { Component } from "react";

import "./Overlay.css";
import Sidebar from "./Sidebar";
import TimeSlider from "./TimeSlider";

class Overlay extends Component {
  render() {
    return (
      <div className="overlay">
        <Sidebar />
        <div className="overlay-right">
          <TimeSlider min={1646247748} max={1646298748} />
        </div>
      </div>
    );
  }
}

export default Overlay;
