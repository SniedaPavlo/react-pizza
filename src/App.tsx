import React from 'react';
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import Cart from './Pages/Cart'
import Header from './components/Header';
import FullPizza from './components/FullPizza'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss';



function App() {

  // const count = useSelector((state) => state.counter.count)
  // const dispatch = useDispatch()
  return (

    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pizza/:id' element={<FullPizza />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
