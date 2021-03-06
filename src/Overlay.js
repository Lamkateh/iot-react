import React, { Component } from "react"

import "./Overlay.css"
import Sidebar from "./Sidebar"
import TimeSlider from "./TimeSlider"
import Form from "./Form"
import AnalyzeLabel from "./AnalyzeLabel"
import LoadingScreen from "./LoadingScreen"

class Overlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classForm: "hidden",
        }
    }

    handleTimeSliderChange = (value) => {
        this.props.onTimeSliderChange(value)
    }

    handleSelectionChange = (id) => {
        this.props.onSelectionChange(id)
    }

    handleFormChange = (value) => {
        this.setState({ classForm: value })
        this.props.onUpdateGroups()
    }

    render() {
        const {
            minDate,
            maxDate,
            groups,
            markerLabel,
            selectedGroupId,
            averageHumidity,
            averageTemperature,
            groupsLoading,
        } = this.props
        const { classForm } = this.state
        return (
            <div className="overlay">
                {groupsLoading ? <LoadingScreen /> : null}
                {markerLabel ? <AnalyzeLabel values={markerLabel} /> : null}
                <Sidebar
                    onFormChange={this.handleFormChange}
                    onSelectionChange={this.handleSelectionChange}
                    groups={groups}
                    selectedGroupId={selectedGroupId}
                    averageTemperature={averageTemperature}
                    averageHumidity={averageHumidity}
                />
                <div className="overlay-right">
                    <TimeSlider
                        min={minDate}
                        max={maxDate}
                        onChange={this.handleTimeSliderChange}
                    />
                    <Form
                        onFormChange={this.handleFormChange}
                        className={classForm}
                    />
                </div>
            </div>
        )
    }
}

export default Overlay
