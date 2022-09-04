import { createContext, useContext, useReducer } from "react";
import faker from "faker";  //faker helps us generate dummy/fake data of products json  etc.
import { cartReducer, productReducer } from "./Reducers";
import React from 'react';

const Cart = createContext();
faker.seed(99);  // to allow faker to send same data each time,otherwise data will keep changing

  //Creating Fake Data through faker

  const Context = ({ children }) => {        
  const products = [...Array(20)].map(() => ({   //20 products undefined,map to define array products
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),    //commerce -generated from faker commerce section
    price: faker.commerce.price(),            //ramdom-randomly generated from faker
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),//inStock will tell about availability of product
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {  //useReducer same as useState but for complex task
    products: products,
    cart: [],  //bcz cart will be empty initially
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);    //to show different deatails of product

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider> //Cart.Provider will wrap whole react app
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
