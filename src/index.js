import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";

import { store } from "./reducers";

import App from "./App";
import "./index.css";

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
