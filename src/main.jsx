import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store";
import { StrictMode } from 'react'
import React from "react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>
)
