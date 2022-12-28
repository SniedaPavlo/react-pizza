import React from 'react';
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import Cart from './/Pages/Cart'
import Header from './components/Header';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom'

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  console.log(searchValue)
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home searchValue={searchValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
