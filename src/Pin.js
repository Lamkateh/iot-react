import * as React from "react";

import "./Pin.css";

function Pin({ onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="pin"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
  );
}

export default React.memo(Pin);
