import React, { Component } from "react";

import "./StatsSidebar.css";

class StatsSidebar extends Component {
    render() {
        const { className, averageTemperature, averageHumidity } = this.props;
        return (
            <div className={className}>
                <span className="title">Statistiques</span>
                <span>Température moyenne : { averageTemperature + " °C" }</span>
                <span>Humidité moyenne : { averageHumidity + " %" }</span>
            </div>
        );
    }
}

export default StatsSidebar;