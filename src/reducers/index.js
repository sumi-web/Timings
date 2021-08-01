import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
	auth_store: authReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
