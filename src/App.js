import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Header />                
      {/* //to wrap the link inside router as link can,t be defined outside router  */}
      <div className="App">
        <Route path="/" exact>   
        {/*exact to prevent path (/) overlap */}
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
