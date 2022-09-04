//For Cart page

import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import React from 'react';

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {     //useEffect -inbuilt fxn
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
      //"acc"-accumulator,"curr"-current
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        
      {/* ListGroup- a property from bootstrap */}
      
      {/*below code for showing and styling items in the cart */}
        <ListGroup> 
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                {/* md={2} means medium screen,and will take 2 gap/space/breakpoints of screen,bootstrap */}
                  <Image src={prod.image} alt={prod.name} fluid rounded /> 
                  {/* :fluid rounded" for image shape in cart */}
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>

                  {/* Dropdown menu for Changing no of Items in Cart */}
                  
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  
                  {/* delete button in cart */}
                  <Button
                    type="button"
                    variant="light"
                    
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px"  color="red"/>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      
      {/* Side Bar of Cart */}
      
      <div className="filters summary">
        <span style={{color:"white"}} className="title">Subtotal ({cart.length}) items</span>
        
        <span style={{ color:"white",fontWeight: 700, fontSize: 30 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
