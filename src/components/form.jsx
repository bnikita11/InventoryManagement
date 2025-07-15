// import { useState } from "react";
// import  service from "../appwrite/config";
// import AuthService from "../appwrite/auth";
// import { logout } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// export const ProductForm = () => {
//   const [name, setName] = useState('');
//   const [sku, setSku] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [category, setCategory] = useState('');
//   const navigate=useNavigate();
//   const dispatch=useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call createProduct function here
//     await service.createProduct(name, sku, price, quantity, category);
//   };
//   const handleLogout=async()=>{
//     await AuthService.logout();
//     dispatch(logout());
//     navigate("/login");

//   }

//   return (
//     <div className="flex flex-col">
//         <form onSubmit={handleSubmit}>
//       <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
//       <input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" required />
//       <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" required />
//       <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" type="number" required />
//       <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
//       <button type="submit">Add Product</button>
//     </form>
//     <button type="button" onClick={handleLogout}>Logout</button>


//     </div>
    

    
//   );
// };
