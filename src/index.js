import {store} from './Components/store/store';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import React,{StrictMode} from 'react';
import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  </StrictMode>

);

     
