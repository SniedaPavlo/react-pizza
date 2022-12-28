import React from 'react';
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import Cart from './/Pages/Cart'
import Header from './components/Header';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom'

export const SearchContext = React.createContext(null)

function App() {

  const [searchValue, setSearchValue] = React.useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
