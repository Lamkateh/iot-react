import React, { Component } from "react";
import Button from "./ButtonSidebar";
import Stats from "./StatsSidebar";

import "./Sidebar.css";

class Sidebar extends Component {

  handleFormClick = () => {
    this.props.onFormChange("visible");
  };

  handleGroupClick = (id) => {
    this.props.onSelectionChange(id);
  };

  render() {
    const { groups, selectedGroupId, averageTemperature, averageHumidity } = this.props;

    return (
      <div className="card sidebar">
        <div className="logo">PolyAnalyzer</div>
        <Button 
          title="+ Ajouter une mesure" 
          className="btn primary" 
          onClick={this.handleFormClick}
        />
        {groups.map(({ id, name }) => (
          <div className="group">
            <Button
              key={id}
              groupId={id}
              title={name}
              className={selectedGroupId === id ? "btn secondary selected" : "btn secondary"}
              onClick={this.handleGroupClick}
            />
            <Stats 
              className={selectedGroupId === id ? "stats" : "stats invisible"}
              averageTemperature={averageTemperature}
              averageHumidity={averageHumidity}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Sidebar;
