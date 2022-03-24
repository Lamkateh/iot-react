import * as React from "react"

import "./Pin.css"

function Pin(props) {
	const handleMouseEnter = () => {
		props.onMouseEnter(props.index)
	}

	const handleMouseLeave = () => {
		props.onMouseLeave()
	}
	return (
		<div
			className="pin"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{props.isFirst && "1"}
		</div>
	)
}

export default React.memo(Pin)
