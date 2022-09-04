import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import React from 'react';
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card style={{borderRadius:10}}>                     
         {/* //card for produts to be shown on cards */}
        <Card.Img variant="top" src={prod.image} alt={prod.name} /> 
        {/*TO display image */}
        <Card.Body style={{backgroundColor:"black",borderRadius:10}}>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            
          <span>₹ {prod.price.split(".")[0]}</span>
            
            {/* /* for Delivery option filter */ }
            
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
           
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (   
            //" p.id === prod.id ?():()" means if item available icart then show "remove from cart" otherwise show "add to cart"
            //"some" checks if particular thing exist in a an array or not
            <Button             //Remove from Cart
              variant="danger"  //variant="danger" --red color
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button              //Add to Cart Button
              onClick={() =>
                dispatch({      //"dipatch" inbuilt function,takes two parameters 
                  type: "ADD_TO_CART",  //no varient --button will be blue  by default
                  payload: prod,
                })
              }
              disabled={!prod.inStock}  // button will be disabled by default 
              //and will Add only if product is available 
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
