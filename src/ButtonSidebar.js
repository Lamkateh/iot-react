import React, { Component } from "react";

import "./ButtonSidebar.css";

class ButtonSidebar extends Component {
  render() {
    const {title, className} = this.props
    return (
        <button className={className}>
            {title}
        </button>
    );
  }
}

export default ButtonSidebar;