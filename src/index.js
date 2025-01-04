import './index.css';
import { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Switch, Routes, Route, Router  } from "react-router-dom";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import About from "./About.js";
import Products from "./Products.js";
import ProductDetails from "./ProductDetails.js";
import Cart from "./Cart.js";
import Owners from './components/owner/Owners.js';


function App() {
  const [cart, setCart] = useState([]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <BrowserRouter>
      { <Navbar cart={cart} /> }
      <div className="container">
    <Routes>
     
   
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/products" element={<Products
              cart={cart}
              onProductAdd={handleProductAdd}
              onProductDelete={handleProductDelete}
            />} />
          <Route path="/products/:id/*" element={ <ProductDetails onProductAdd={handleProductAdd} />} /> 
          <Route exact path="cart" element={ <Cart cart={cart} />} />
          <Route exact path="/owners" element={<Owners />} /> {/* Add Editor route */}

        
      
    </Routes>
    </div>
  </BrowserRouter>
  );
}

createRoot(document.querySelector("#react-root")).render(<App />);