import customStyles from "./style-css/style.css";
import materializeCSS from "./style-css/materialize.css";
import materializeJS from "materialize-css/dist/js/materialize.js"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";

const middleware = [reduxThunk];

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
