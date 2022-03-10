import React, { Component } from "react";

import "./AnalyzeLabel.css";

class AnalyzeLabel extends Component {
  render() {
    const { values } = this.props;
    return (
      <div className="card analyze-label">
        <table>
          <tbody>
            {Object.keys(values)
              .filter((key) => !["latitude", "longitude"].includes(key))
              .map((keyName) => (
                <tr>
                  <td>{keyName}</td>
                  <td>
                    {values[keyName].value}
                    {values[keyName].unit}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AnalyzeLabel;
