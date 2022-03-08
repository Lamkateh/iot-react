import React, { Component } from "react";
import "./App.css";
import Overlay from "./Overlay";
import axios from "axios";
import ReactMapGl, { Marker } from "react-map-gl";
import Pin from "./Pin";

const mapboxAccessToken =
  "pk.eyJ1IjoiYnJ1bm9kaWxpdmlvIiwiYSI6ImNsMDl5eWFkbTBpNzYzaW55emhmajRnbmUifQ.N52n-xAZkStMwY4Wm_u7Ug";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: { start: 0, end: 0, measures: [] },
      maxTimeShow: null,
      minTimeShow: null,
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/groups/1").then((response) => {
      this.setState({
        selectedGroup: response.data.data,
        minTimeShow: this.toTimestamp(response.data.data.start),
        maxTimeShow: this.toTimestamp(response.data.data.end),
      });
    });
  }

  markers = () => {
    const { selectedGroup, minTimeShow, maxTimeShow } = this.state;
    const result = selectedGroup.measures
      .filter(
        (measure) =>
          this.toTimestamp(measure.created_at) > minTimeShow &&
          this.toTimestamp(measure.created_at) < maxTimeShow
      )
      .map((measure, index) => (
        <Marker
          key={"marker_" + index}
          longitude={measure.values.longitude}
          latitude={measure.values.latitude}
        >
          <Pin onMouseEnter={() => console.log("hover")} />
        </Marker>
      ));
    return result;
  };

  toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };

  handleTimeSliderChange = (value) => {
    this.setState({ minTimeShow: value[0], maxTimeShow: value[1] });
  };

  render() {
    const { selectedGroup } = this.state;
    return (
      <div id="map">
        <ReactMapGl
          mapboxAccessToken={mapboxAccessToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          initialViewState={{
            latitude: 48.65,
            longitude: 6.15,
            zoom: 12,
            bearing: 0,
            pitch: 0,
          }}
        >
          {this.markers()}
        </ReactMapGl>
        <Overlay
          minDate={this.toTimestamp(selectedGroup.start)}
          maxDate={this.toTimestamp(selectedGroup.end)}
          onTimeSliderChange={this.handleTimeSliderChange}
        />
      </div>
    );
  }
}

export default App;
