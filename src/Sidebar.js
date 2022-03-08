import React, { Component } from "react";

import Button from "./ButtonSidebar";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
		super(props)
		this.state = {
			measures: [
        {title: "Usine infectée", avgTemperature: 13},
        {title: "Polytech Nancy"},
        {title: "Kremlin"},
        {title: "Brrrr"}
      ]
		}
	}

  /*componentDidMount() {
		this.getMeasures()
	}

  getMeasures() {
		const self = this
		Api.get("/measures", {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
			},
		}).then(function (response) {
			self.setState({
				measures: response.data.content,
			})
		})
	}*/

  render() {
    const {measures} = this.state
    return (
      <div className="card sidebar">
        <div className="logo">
          PolyAnalyzer
        </div>
        <Button 
          title="+ Ajouter une mesure"
          className="btn primary"
        />
        {measures.map(({title}) => (
          <Button
            title={title}
            className="btn secondary"
          />
        ))}

      </div>
    );
  }
}

export default Sidebar;
