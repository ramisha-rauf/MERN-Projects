// import React, { useEffect, useState, useRef } from "react";
// import { useDispatchCart, useCart } from "./contextReducer";
// import { useNavigate } from "react-router-dom";

// export default function Card(props) {
//     const bg = '#fec47f';
//     const options = props.options || {};
//     const foodName = props.foodItem.name || "";

//     const priceOptions = Object.keys(options);
//     let navigate=useNavigate();
//     let data = useCart();
//     const priceRef = useRef();
//     let dispatch = useDispatchCart();
//     const [qty, setQty] = useState(1);
//     const [size, setSize] = useState("");
//     const handleClick = () => {
//         if (!localStorage.getItem("authtoken")) {
//           navigate("/login")
//         }
//       }
//     //   const handleQty = (e) => {
//     //     setQty(e.target.value);
//     //   }
//     //   const handleOptions = (e) => {
//     //     setSize(e.target.value);
//     //   }

//     const handleAddToCart = async () => {
//         let food = []
//         for (const item of data) {
//           if (item.id === props.foodItem._id) {
//             food = item;

//             break;
//           }
//         }
//         console.log(food)
//         console.log(new Date())
//         if (food !== null && food.size === size) {
//             await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
//             return
//           }
//           else if (food!== null && food.size !== size) {
//             await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
//             console.log("Size different so simply ADD one more to the list")
//             return
//           }
//           await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
//           return
//         }

//         // setBtnEnable(true)

//       }

//     let finalPrice = qty * parseInt(options[size]);

//     useEffect(() => {
//       setSize(priceRef.current.value);
//     }, []);

//   return (
//     <div>
//       <div>
//         <div
//           className="card mt-3"
//           style={{ width: "18rem", maxHeight: "660px" }}
//         >
//           <img
//             src={props.foodItem.img}
//             className="card-img-top"
//             alt="..."
//             style={{ height: "200px", objectFit: "fill" }}
//           />
//           <div className="card-body">
//             <h5 className="card-title fs-4">{foodName}</h5>
//             <p className="card-text fs-6">{props.foodItem.description}</p>
//             <div className="container w-100">
//               <select
//                 className="m-2 h-1-- fs-5 rounded"
//                 style={{ backgroundColor: bg }}
//                 onChange={(e) => setQty(e.target.value)}
//                 value={qty}
//                 onClick={handleClick}
//               >
//                 {Array.from(Array(6), (e, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="m-2 h-1 fs-5 rounded"
//                 onChange={(e) => setSize(e.target.value)}
//                 style={{ backgroundColor: bg }}
//                 value={size}
//                 ref={priceRef}
//                 onClick={handleClick}
//               >
//                 {priceOptions.map((data) => (
//                   <option key={data} value={data}>
//                     {data}
//                   </option>
//                 ))}
//               </select>

//               <div className="d-inline h-100 fs-5">Rs.{qty * parseInt(options[size])}/-</div>
//             </div>
//             <hr />
//             <button
//               className="btn justify-center ms-2 fs-6 text-white"
//               onClick={handleAddToCart}
//               style={{ backgroundColor: "brown" }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./contextReducer";
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  const bg = "#fec47f";
  let data = useCart();

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
//   const handleClick = () => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    let food = [];
  
    // Check if props.foodItem is defined before accessing its properties
    if (!props.foodItem || !props.foodItem._id) {
      console.error("Invalid food item");
      return;
    }
  
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    if (food !== null && food.size === size) {
      const finalPrice = qty * parseInt(options[size]);
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty
      });
      return;
    } else if (food !== null && food.size !== size) {
      const finalPrice = qty * parseInt(options[size]);
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img
      });
      return;
    }
  
    return;
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]); //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>
      <div  className="card mt-3" style={{ width: "18rem", maxHeight: "660px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h4 className="card-title">{props.foodItem.name}</h4>
          <p className="card-text fs-6">{props.foodItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-1 fs-5 rounded"
              style={{ backgroundColor: bg }}
           //   onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-1 fs-5 rounded"
              style={{ backgroundColor: bg }}
              ref={priceRef}
             // onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              Rs.{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className="btn justify-center ms-2 fs-6 text-white"
            onClick={handleAddToCart}
            style={{ backgroundColor: "brown" }}
          >
            Add to Cart
          </button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  );
}
//
