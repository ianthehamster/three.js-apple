import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Categories from './components/Categories.jsx';
import LaptopsProductPage from './components/LaptopsProductPage.jsx';
import PhonesProductPage from './components/PhonesProductPage.jsx';
import AccessoriesProductPage from './components/AccessoriesProductPage.jsx';
import TabletsProductPage from './components/TabletsProductPage.jsx';
import AboutUs from './components/AboutUs.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/laptopPage" element={<LaptopsProductPage />} />
        <Route path="/phonesPage" element={<PhonesProductPage />} />
        <Route path="/accessoriesPage" element={<AccessoriesProductPage />} />
        <Route path="/tabletsPage" element={<TabletsProductPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
