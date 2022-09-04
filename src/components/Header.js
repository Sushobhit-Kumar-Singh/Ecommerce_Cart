import { FaShoppingCart } from "react-icons/fa";  //to import icon,fa- icon librarry
import { AiFillDelete } from "react-icons/ai";
import React from 'react';
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";

//to add items to cart when we click add to cart
const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();


   //for HEADER or TOP PORTION of website
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 100 }}>    {/* /* bg for background */}
      <Container style={{color:"red",backgroundcolor:"red"}}>                                             {/* /*align the things to centre */}
        <Navbar.Brand   style={{fontSize:50, color:"white",}}> 
        <img src="favicon.ico" style={{height:50}}/> {/* for logo*/}    
                   {/* for ecommerce website name */}
          <Link to="/" >Smart Buy</Link>                    {/*name of website*,wrapped in router in app.js*/}
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">   
            <FormControl                       /*FormControl is an input/text box ,its a self closing tag*/
              style={{ width: 500 }}
              type="search"
              placeholder="Search for a Choice..."
              className="m-auto"             /* to margin automatically,to create equal spacing bw widgets */
              aria-label="Search"
          
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>   /* for cart icon,copied,learn more from react bootstrap documentation */
        )}
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">                {/* //Toggle means button */}
              <FaShoppingCart color="white" fontSize="25px" /> {/*FaShoppingCart -name of cart icon */}
              <Badge>{cart.length}</Badge>              {/* cart.length to show no of items in cart on cart icon*/ }
            </Dropdown.Toggle>

            {/* //For Mapping/Function of cart */}
            
            <Dropdown.Menu style={{ minWidth: 370 }}>       {/* //Dropdown.Menu-to show no of items in cart */}
                                                            {/* minWidth is width of pop up */}
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}          //"src" means source
                        className="cartItemImg"
                        alt={prod.name}          //"alt" means all tag
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span> 
                        {/* "split(".")[0]" to remove zero after decimal in price */}
                      </div>

                    
                      <AiFillDelete                  //to add delete icon beside product in pop up                
                        fontSize="20px"
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  
                  {/* "Go To Cart" button in pop up */}
                  <Link to="/cart">       
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
