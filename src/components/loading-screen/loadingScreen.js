import React from "react";
import { auth } from "../../firebase";

import "./loading.css";

const loadingScreen = () => {
	return (
		<div id="loading-wrapper">
			<div id="loading-text">Hold On..</div>
			<div id="loading-content"></div>
		</div>
	);
};

export default loadingScreen;
