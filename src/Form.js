import React, { Component } from "react";

import "./Form.css";

class Form extends Component {

  handleClick() {
  };

  render() {
    const {className} = this.props
    return (
        <div className="card form">
          <button 
            className={className}
            onClick={this.handleClick}
          >
            X
          </button>
        </div>
    );
  }
}

export default Form;