import React, { Component } from "react";
import Button from "./ButtonSidebar";

import "./Sidebar.css";

class Sidebar extends Component {
  handleGroupClick = (id) => {
    this.props.onSelectionChange(id);
  };

  render() {
    const { groups } = this.props;
    return (
      <div className="card sidebar">
        <div className="logo">PolyAnalyzer</div>
        <Button title="+ Ajouter une mesure" className="btn primary" />
        {groups.map(({ id, name }) => (
          <Button
            key={id}
            groupId={id}
            title={name}
            className="btn secondary"
            onClick={this.handleGroupClick}
          />
        ))}
      </div>
    );
  }
}

export default Sidebar;
