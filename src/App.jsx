import React from 'react';
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import Cart from './/Pages/Cart'
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Redux/Slices/filterSlice'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss';

export const SearchContext = React.createContext(null)

function App() {

  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = React.useState('')

  return (

    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>

    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    //   <div className="wrapper">
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path='/' element={<Home />} />
    //         <Route path='/cart' element={<Cart />} />
    //         <Route path='*' element={<NotFoundPage />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </SearchContext.Provider>
  );
}

export default App;
