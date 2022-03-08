import React, { Component } from "react";

import "./Overlay.css";
import Sidebar from "./Sidebar";
import TimeSlider from "./TimeSlider";
import Form from "./Form";

class Overlay extends Component {
  render() {
    return (
      <div className="overlay">
        <Sidebar />
        <div className="overlay-right">
          <TimeSlider min={1646247748} max={1646298748} />
          <Form />
        </div>
      </div>
    );
  }
}

export default Overlay;
