import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ThemeProvider } from '@mui/material';
// import {theme} from "./theme"
import {store} from './redux/store'
import {persistor} from './redux/store'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from 'react-auth-kit'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
