import React, { Component } from "react"

import "./LoadingScreen.css"

class LoadingScreen extends Component {
	render() {
		return (
			<div className="loading-screen">
				<div className="logo">PolyAnalyzer</div>
				<div class="loader">Loading...</div>
			</div>
		)
	}
}

export default LoadingScreen
