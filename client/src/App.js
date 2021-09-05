import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './components/landing';
import Home from './components/home';
import Nav from './components/home/nav';
import CreatePoke from './components/create';
import DetailPoke from './components/cards/detailCard';



function App() {  
  
  return (
    <div className="App">
     <Route
      exact path='/'
      component={Landing}
     />

      <Route
      path= '/pokeApp'
      component= {Nav}
      />

     <Route 
     path='/pokeApp'
     component={Home}
     />

     <Route 
     exact path='/pokeApp/create'
     component={CreatePoke}
     />

    <Route
    exact path='/pokeApp/pokemon/:id'
    component={DetailPoke}
    />

    </div>
  );
}

export default App;
