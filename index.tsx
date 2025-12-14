// Import React library to use JSX and React features
import React from 'react';
// Import the Client DOM library to interact with the web browser's DOM
import ReactDOM from 'react-dom/client';
// Import the main App component which holds our routing and layout
import App from './App';

// Find the HTML element with the id 'root' inside index.html
// This is where our React app will "live"
const rootElement = document.getElementById('root');

// Safety check: if 'root' doesn't exist, stop execution and show an error
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root on the found DOM element.
// This enables the new Concurrent Mode features in React 18.
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  // StrictMode is a development tool that highlights potential problems in an application.
  // It runs components twice in dev mode to detect side effects.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);