import React, { Component } from "react";
import "./App.css";
import Overlay from "./Overlay";
import ReactMapGl, { Marker, Source, Layer } from "react-map-gl";
import Pin from "./Pin";
import Api from "./Api";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";

// test commit

const mapboxAccessToken =
  "pk.eyJ1IjoiYnJ1bm9kaWxpdmlvIiwiYSI6ImNsMDl5eWFkbTBpNzYzaW55emhmajRnbmUifQ.N52n-xAZkStMwY4Wm_u7Ug";

const skyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      noSelectedGroup: true,
      selectedGroup: { start: 0, end: 0, measures: [] },
      maxTimeShow: null,
      minTimeShow: null,
      terrain: false,
      markerLabel: null,
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.getGroups();
  }

  componentDidUpdate(prevProps, prevState) {
    const { groups, noSelectedGroup, selectedGroup } = this.state;
    if (groups.length > 0 && noSelectedGroup) {
      this.setState({ noSelectedGroup: false });
      this.getMeasures(groups[0].id);
    }
    if (prevState.selectedGroup !== selectedGroup) {
      this.fitToBounds();
    }
  }

  getGroups() {
    const self = this;
    Api.get("/groups", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
      self.setState({
        groups: response.data.data,
      });
    });
  }

  getMeasures = (id) => {
    Api.get("/groups/" + id).then((response) => {
      this.setState({
        selectedGroup: response.data.data,
        minTimeShow: this.toTimestamp(response.data.data.start),
        maxTimeShow: this.toTimestamp(response.data.data.end),
      });
    });
  };

  handleMouseEnterPin = (index) => {
    const { selectedGroup } = this.state;

    this.setState({ markerLabel: selectedGroup.measures[index].values });
  };
  handleMouseLeavePin = () => {
    this.setState({ markerLabel: null });
  };

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
          <Pin
            index={index}
            onMouseEnter={this.handleMouseEnterPin}
            onMouseLeave={this.handleMouseLeavePin}
          />
        </Marker>
      ));
    return result;
  };

  toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };

  fitToBounds = () => {
    const paddingLeft = document.querySelector(".sidebar").clientWidth + 32 * 2;
    const { selectedGroup } = this.state;
    let coordinates = [];
    selectedGroup.measures.forEach((measure) => {
      coordinates.push([measure.values.longitude, measure.values.latitude]);
    });

    const line = lineString(coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);

    this.mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: { top: 40, right: 40, bottom: 40, left: paddingLeft },
        duration: 1000,
      }
    );
  };

  handleTimeSliderChange = (value) => {
    this.setState({ minTimeShow: value[0], maxTimeShow: value[1] });
  };

  handleSelectionChange = (id) => {
    this.getMeasures(id);
  };

  render() {
    const { selectedGroup, groups, terrain, markerLabel } = this.state;
    return (
      <div id="map">
        <ReactMapGl
          ref={this.mapRef}
          mapboxAccessToken={mapboxAccessToken}
          mapStyle={
            terrain
              ? "mapbox://styles/mapbox/satellite-v9"
              : "mapbox://styles/mapbox/streets-v11"
          }
          initialViewState={{
            latitude: 48.65,
            longitude: 6.15,
            zoom: 12,
            bearing: 0,
            pitch: 0,
          }}
          terrain={terrain ? { source: "mapbox-dem", exaggeration: 2 } : {}}
        >
          {this.markers()}
          {terrain ? (
            <Source
              id="mapbox-dem"
              type="raster-dem"
              url="mapbox://mapbox.mapbox-terrain-dem-v1"
              tileSize={512}
              maxzoom={14}
            />
          ) : null}
          {terrain ? <Layer {...skyLayer} /> : null}
        </ReactMapGl>
        <Overlay
          markerLabel={markerLabel}
          groups={groups}
          minDate={this.toTimestamp(selectedGroup.start)}
          maxDate={this.toTimestamp(selectedGroup.end)}
          onTimeSliderChange={this.handleTimeSliderChange}
          onSelectionChange={this.handleSelectionChange}
        />
      </div>
    );
  }
}

export default App;
