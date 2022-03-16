import React, { Component } from "react";
import Api from "./Api";

import "./Form.css";

class Form extends Component {

  constructor(props) {
		super(props)

    this.state = {
      projectName: null,
      startDate: null,
      endDate: null,
      gap: null
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleGapChange = this.handleGapChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

  handleCrossClick = () => {
    this.props.onFormChange("hidden");
  };

  handleNameChange(value) {
		this.setState({ projectName: value })
	}

	handleStartDateChange(value) {
		this.setState({ startDate: value })
	}

  handleEndDateChange(value) {
		this.setState({ endDate: value })
	}

  handleGapChange(value) {
		this.setState({ gap: value })
	}

  handleFormSubmit(event) {
    event.preventDefault()

    const { projectName, startDate, endDate, gap } = this.state

    Api.post("/groups", {
      name: projectName,
      start: startDate,
      end: endDate,
      period: gap
    })
      .then(function () {
        this.handleCrossClick()
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  render() {
    const { className } = this.props
    return (
        <div className={"card form " + className}>
          <button 
            className="exit"
            onClick={this.handleCrossClick}
          >
            X Fermer
          </button>
          <form 
            className="inputs"
            onSubmit={this.handleFormSubmit}
          >
            <input 
              type="text"
              placeholder="Nom du projet"
              onChange={this.handleNameChange}
              required
            />
            <div className="date">
              <input
                type="datetime-local"
                placeholder="Début de projet"
                onChange={this.handleStartDateChange}
                min="2022-03-16T00:00"
                max="2023-03-15T23:59"
                required
              />
              <input
                type="datetime-local"
                placeholder="Fin de projet"
                onChange={this.handleEndDateChange}
                min="2022-03-16T00:00"
                max="2023-03-15T23:59"
                required
              />
            </div>
            <input
              type="number"
              placeholder="Intervalle entre les mesures en seconde"
              onChange={this.handleGapChange}
              min="1"
              required
            />
            <button
              type="submit"
            >
              Valider
            </button>
          </form>
        </div>
    );
  }
}

export default Form;