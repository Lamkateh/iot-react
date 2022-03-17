import React, { Component } from "react";
import Api from "./Api";

import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: null,
      startDate: null,
      endDate: null,
      gap: null,
    };
  }

  handleCrossClick = () => {
    this.props.onFormChange("hidden");
  };

  handleNameChange = (e) => {
    this.setState({ projectName: e.target.value });
  };

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };

  handleGapChange = (e) => {
    this.setState({ gap: e.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { projectName, startDate, endDate, gap } = this.state;

    const self = this;

    Api.post("/groups", {
      name: projectName,
      start: startDate,
      end: endDate,
      period: gap,
    })
      .then(function () {
        self.setState({
          projectName: "",
          startDate: null,
          endDate: null,
          gap: "",
        });
        self.handleCrossClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { className } = this.props;
    const { projectName, startDate, endDate, gap } = this.state;
    return (
      <div className={"card form " + className}>
        <button className="exit" onClick={this.handleCrossClick}>
          X Fermer
        </button>
        <form className="inputs" onSubmit={this.handleFormSubmit}>
          <input
            value={projectName}
            type="text"
            placeholder="Nom du projet"
            onChange={this.handleNameChange}
            required
          />
          <div className="date">
            <input
              value={startDate}
              type="datetime-local"
              placeholder="Début de projet"
              onChange={this.handleStartDateChange}
              min="2022-03-16T00:00"
              max="2023-03-15T23:59"
              required
            />
            <input
              value={endDate}
              type="datetime-local"
              placeholder="Fin de projet"
              onChange={this.handleEndDateChange}
              min="2022-03-16T00:00"
              max="2023-03-15T23:59"
              required
            />
          </div>
          <input
            value={gap}
            type="number"
            placeholder="Intervalle entre les mesures en seconde"
            onChange={this.handleGapChange}
            min="1"
            required
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    );
  }
}

export default Form;
