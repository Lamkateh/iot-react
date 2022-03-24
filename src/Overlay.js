import React, { Component } from "react"

import "./Overlay.css"
import Sidebar from "./Sidebar"
import TimeSlider from "./TimeSlider"
import Form from "./Form"
import AnalyzeLabel from "./AnalyzeLabel"
import LoadingScreen from "./LoadingScreen"

class Overlay extends Component {
	handleTimeSliderChange = (value) => {
		this.props.onTimeSliderChange(value)
	}

	handleSelectionChange = (id) => {
		this.props.onSelectionChange(id)
	}

	render() {
		const { minDate, maxDate, groups, markerLabel, groupsLoading } =
			this.props
		return (
			<div className="overlay">
				{groupsLoading ? <LoadingScreen /> : null}
				{markerLabel ? <AnalyzeLabel values={markerLabel} /> : null}
				<Sidebar
					onSelectionChange={this.handleSelectionChange}
					groups={groups}
				/>
				<div className="overlay-right">
					<TimeSlider
						min={minDate}
						max={maxDate}
						onChange={this.handleTimeSliderChange}
					/>
					<Form />
				</div>
			</div>
		)
	}
}

export default Overlay
