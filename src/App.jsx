import React from 'react';
import PizzaBlog from './components/PizzaBlog';
import Header from './components/Header';
import Categories from './components/Сategories';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {

  const [statePizzas, setPizzas] = React.useState([])

  React.useEffect(() => {
    fetch('https://63a4cc372a73744b00802459.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
      })
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {statePizzas.map((obj) => {
              return <  PizzaBlog {...obj} key={obj.id.toString()} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
