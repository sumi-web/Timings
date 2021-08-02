import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";

const reducers = combineReducers({
	auth_store: authReducer,
	common_store: commonReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
