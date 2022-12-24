import React from 'react';
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import Cart from './/Pages/Cart'
import Header from './components/Header';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
