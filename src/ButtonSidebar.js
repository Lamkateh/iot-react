import React, { Component } from "react";

import "./ButtonSidebar.css";

class ButtonSidebar extends Component {
  handleClick = () => {
    const { groupId } = this.props;
    this.props.onClick(groupId);
  };

  render() {
    const { title, className } = this.props;
    return (
      <button className={className} onClick={this.handleClick}>
        {title}
      </button>
    );
  }
}

export default ButtonSidebar;
