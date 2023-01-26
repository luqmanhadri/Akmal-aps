// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react';


// function Item({ item }) {

//   const [quantity, setQuantity] = useState(0);
//   const handleQuantity = (operation) => {
//     setQuantity(() => {
//       return (
//         operation === "i" ? quantity + 1 : quantity - 1
//     );
//     });
//   };

//   return (
//     <div>
//       <div className='row bs'>
//         <div className='col-md-8'>
//           <h2>{item.item_name}</h2>
//           <h5>{item.store}</h5>
//           <span>Quantity available : {item.item_amount}</span>

//           <div className="optionCounter" >
//             <button
//               disabled={quantity <= 0}
//               className="optionCounterButton"
//               onClick={() => handleQuantity("d")}
//             >
//               -
//             </button>
//             <span className="optionCounterNumber">
//               {quantity}
//             </span>
//             <button
//               className="optionCounterButton"
//               onClick={() => handleQuantity("i")}
//             >
//               +
//             </button>
//           </div>

//           <div style={{ float: 'right' }}>
//             <button className='btn btn-primary'>Add to booking list</button>
//           </div>

//         </div>
//       </div>

//     </div>
//   )
// }

// export default Item