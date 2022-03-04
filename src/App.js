import React, { Component } from "react"
import "./App.css"
import Overlay from "./Overlay"
import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
	"pk.eyJ1IjoiYnJ1bm9kaWxpdmlvIiwiYSI6ImNsMDl5eWFkbTBpNzYzaW55emhmajRnbmUifQ.N52n-xAZkStMwY4Wm_u7Ug"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lng: 6.1877708,
			lat: 48.6595416,
			zoom: 16,
		}
		this.mapContainer = React.createRef()
	}

	componentDidMount() {
		const { lng, lat, zoom } = this.state
		const map = new mapboxgl.Map({
			container: this.mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom: zoom,
		})

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2),
			})
		})

		// Add zoom and rotation controls to the map.
		map.addControl(new mapboxgl.NavigationControl())

		map.on("load", () => {
			// Insert the layer beneath any symbol layer.
			const layers = map.getStyle().layers
			const labelLayerId = layers.find(
				(layer) => layer.type === "symbol" && layer.layout["text-field"]
			).id

			// The 'building' layer in the Mapbox Streets
			// vector tileset contains building height data
			// from OpenStreetMap.
			map.addLayer(
				{
					id: "add-3d-buildings",
					source: "composite",
					"source-layer": "building",
					filter: ["==", "extrude", "true"],
					type: "fill-extrusion",
					minzoom: 16.5,
					paint: {
						"fill-extrusion-color": "#aaa",

						// Use an 'interpolate' expression to
						// add a smooth transition effect to
						// the buildings as the user zooms in.
						"fill-extrusion-height": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "height"],
						],
						"fill-extrusion-base": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "min_height"],
						],
						"fill-extrusion-opacity": 0.6,
					},
				},
				labelLayerId
			)
		})
	}

	render() {
		return (
			<div>
				<div ref={this.mapContainer} className="map-container" />
				<Overlay />
			</div>
		)
	}
}

export default App
