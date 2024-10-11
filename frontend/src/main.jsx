import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {store,persistor} from './store/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <PersistGate persistor={persistor}>
  <Provider store={store}>
  
    <App />

  </Provider>
  </PersistGate>
  </StrictMode>
)
