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
                  <td className="name">{keyName.charAt(0).toUpperCase() + keyName.substring(1) + " : "}</td>
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
