import React from "react";
import { useCart, useDispatchCart } from "../components/contextReducer";
import trash from "../trash.svg";

export default function Cart() {
  const bg = "#D2B48C";
  let data = useCart();
  let dispatch = useDispatchCart();
  if (!data ||data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center text-white fs-3">The Cart is Empty</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:4000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className=" m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table class="table table-hover"  style={{ backgroundColor: bg }}>
          <thead className="fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr className="fs-5">
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img src={trash} style={{height:"35px",width:"35px"}} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index}) }} />
                  </button>
                </td>
              </tr>
            ))}

          <div>
            <h1 className="fs-4">Total Price: Rs.{totalPrice}/-</h1>
          </div>
          </tbody>
          
        </table>
        <button
          type="submit"
          className="m-3 btn text-white"
          style={{ backgroundColor: bg }}
          onClick={handleCheckOut}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

// import React from "react";
// import { useCart, useDispatchCart } from "../components/contextReducer";
// import trash from "../trash.svg";
// const express = require('express')
// const app = express()

// export default function Cart() {
//   const bg = "#D2B48C";
//   const data = useCart();
//   const dispatch = useDispatchCart();

//   if (!data || data.length === 0) {
//     return (
//       <div>
//         <div className="m-5 w-100 text-center text-white fs-3">The Cart is Empty</div>
//       </div>
//     );
//   }

//   const handleCheckOut = async () => {
//     try {
//       const userEmail = localStorage.getItem("userEmail");
//       const response = await fetch("http://localhost:4000/api/orderData", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           order_data: data,
//           email: userEmail,
//           order_date: new Date().toDateString(),
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const result = await response.json();
  
//       if (result.success) {
//         dispatch({ type: "DROP" });
//         console.log("Checkout successful");
//       } else {
//         console.error("Checkout failed:", result.message);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error.message);
//     }
//   };

//   const totalPrice = data.reduce((total, food) => total + food.price, 0);

//   return (
//     <div>
//       <div className="m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
//         <table className="table table-hover" style={{ backgroundColor: bg }}>
//           <thead className="fs-4">
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Option</th>
//               <th scope="col">Amount</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food, index) => (
//               <tr className="fs-5" key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{food.name}</td>
//                 <td>{food.qty}</td>
//                 <td>{food.size}</td>
//                 <td>{food.price}</td>
//                 <td>
//                   <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
//                     <img src={trash} style={{ height: "35px", width: "35px" }} alt="delete" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td className=" fs-4">Total Price:Rs.{totalPrice}/-</td>
//               <td></td>
//             </tr>
//           </tfoot>
//         </table>
//         <button
//           type="button"
//           className="m-3 btn text-white"
//           style={{ backgroundColor: bg }}
//           onClick={handleCheckOut}
//         >
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// }
