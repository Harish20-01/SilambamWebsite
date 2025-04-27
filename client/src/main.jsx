import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from "../public/MessageToastContent";
import {Toaster} from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </ToastProvider>
    <Toaster></Toaster>
  </StrictMode>,
)
