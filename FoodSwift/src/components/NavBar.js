import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./contextReducer";

export default function NavBar() {
    const [cartView,setCartView]=useState(false)
    const bg = 'brown';
    const background='#fec47f';
    const navigate =useNavigate();
    let data =useCart();

    const handleLogout =()=>{
      localStorage.removeItem("authToken");
      navigate("/login")
    }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg" style={{backgroundColor:bg}}>
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic mx-1" to="/">
              FoodSwift
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-0">
                <li className="nav-item">
                  <Link className="nav-link fs-4 mx-4" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                {(localStorage.getItem("authToken"))?
                  <li className="nav-item">
                    <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                  </li>

              :""}
              </ul>

              {(!localStorage.getItem("authToken"))?
              <div className="d-flex">
              <Link className="btn text-white mx-1" style={{backgroundColor:background}} to="/login">Login</Link>
              
              <Link className="btn text-white mx-1" style={{backgroundColor:background}}  to="/signup">Signup</Link>
              </div>
              :
              <div>
              <div className="btn text-white mx-2" style={{backgroundColor:background}} onClick={()=>{setCartView(true)}}>
               My Cart {" "}
               <Badge pill bg="danger">{!data || data.length}</Badge>
              </div>

             {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

              <div className="btn text-white mx-2" style={{backgroundColor:background}} onClick={handleLogout}>
               Logout
              </div>
              </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

