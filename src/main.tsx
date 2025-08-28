// // src/main.tsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// // import { store } from './app/store'; // (old path, now using central store)
// import { Provider } from 'react-redux';
// import store from './store/store'; // Import Redux store

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );


// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { store } from './app/store'; // (old path, now using central store)
import { Provider } from 'react-redux';
import store from './store/store'; // Import Redux store

// 👇 Expose the store only in development for debugging in DevTools
if (import.meta.env.DEV) {
  (window as any).__APP_STORE__ = store;
  (window as any).__GET_STATE__ = () => store.getState();
  (window as any).__DISPATCH__ = store.dispatch;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);