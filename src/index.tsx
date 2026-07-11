import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Info = React.lazy(() => import('./info'));
const Sw = React.lazy(() => import('./SwProjects'));
const Gd = React.lazy(() => import('./GdProjects'));
const Contact = React.lazy(() => import('./contact'));
const Screamingheads = React.lazy(() => import('./graphics pages/screamingheads'));
const Scarymonsters = React.lazy(() => import('./graphics pages/scarymonsters'));
const Tees = React.lazy(() => import('./graphics pages/tees'));

function PageLoader() {
  return <div className="page-loader" aria-live="polite">Loading...</div>;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/info" element={<Info />} />
          <Route path="/sw-projects" element={<Sw />} />
          <Route path="/gd-projects" element={<Gd />} />
          <Route path="/gd-projects/Screaming-Heads" element={<Screamingheads />} />
          <Route path="/gd-projects/Scary-Monsters" element={<Scarymonsters />} />
          <Route path="/gd-projects/T-Shirts" element={<Tees />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
