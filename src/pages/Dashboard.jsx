// import React, { useState, useEffect } from 'react';
// import StatCard from '../components/StatCard';
// import { MdCategory, MdShoppingBasket, MdStorage, MdWarning } from 'react-icons/md'; // Icons for stat cards
// import ProductService from '../services/productService';
// import InventoryService from '../services/inventoryService';

// function DashboardPage(){
//     const [totalProducts, setTotalProducts] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0); // Will come from OrderService
//   const [totalStock, setTotalStock] = useState(0);
//   const [outOfStock, setOutOfStock] = useState(0);
//   const [totalCustomers, setTotalCustomers] = useState(0);// From Appwrite Account or custom Users collection
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [productsResp, inventoryResp] = await Promise.all([
//           ProductService.getAllProducts(),
//           InventoryService.getAllInventory(),
//           // Add calls for orders, customers, etc.
//         ]);

//         setTotalProducts(productsResp.length);
//         const totalStockCount = inventoryResp.reduce((sum, item) => sum + item.quantity, 0);
//         setTotalStock(totalStockCount);
//         const outOfStockCount = inventoryResp.filter(item => item.quantity <= 0).length;
//         setOutOfStock(outOfStockCount);

//         // Fetch Total Orders (Hypothetical OrderService)
//         // const orders = await OrderService.getAllOrders();
//         // setTotalOrders(orders.length);

//         // Fetch Total Customers (Hypothetical: Appwrite Function to count users or custom collection)
//         // const customers = await AppwriteFunctionService.getTotalUsers();
//         // setTotalCustomers(customers);

//       } catch (err) {
//         console.error("Failed to fetch dashboard data:", err);
//         setError("Error loading dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center p-4">Loading dashboard data...</div>;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

//   return (
//     <div className="dashboard-content">
//       {/* Welcome Section */}
//       <div className="mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Welcome Nirmal!</h2>
//       </div>

//       {/* Overview Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Products" value={totalProducts} icon={<MdCategory />} />
//         <StatCard title="Orders" value={totalOrders} icon={<MdShoppingBasket />} />
//         <StatCard title="Total Stock" value={totalStock} icon={<MdStorage />} />
//         <StatCard
//           title="Out of Stock"
//           value={outOfStock}
//           icon={<MdWarning />}
//           className="border-2 border-orange-300 bg-orange-50" // Highlight for out of stock
//           description={<span className="text-orange-600">Attention needed</span>}
//         />
//       </div>

//       {/* Middle Section: No of Users, Inventory Values, Top 10 Stores */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* No of Users Card */}
//         <StatCard title="No of Users" value={`${Math.floor(totalCustomers / 1000)}K`} description="Total Customers" className="flex flex-col items-center justify-center p-8">
//           <span className="text-5xl text-blue-600 mb-2">👤</span> {/* Or use MdPeople icon */}
//         </StatCard>

//         {/* Inventory Values Chart (Pie Chart) */}
//         <div className="lg:col-span-1 bg-cardBg rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-textDark mb-4">Inventory Values</h3>
//           {/* <InventoryValueChart totalUnits={totalStock} soldUnits={/* get sold units data */}
//           {/* />*/} 
//           <div className="flex items-center justify-center h-40">
//             <p>Pie Chart Placeholder</p> {/* Replace with Recharts/Chart.js component */}
//           </div>
//           <div className="flex justify-around mt-4 text-sm text-gray-600">
//             <span><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Sold units</span>
//             <span><span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-1"></span> Total units</span>
//           </div>
//         </div>

//         {/* Top 10 Stores by Sales */}
//         <div className="lg:col-span-1 bg-cardBg rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-textDark mb-4">Top 10 Stores by sales</h3>
//           {/* <TopStoresList /> */}
//           <div className="space-y-3">
//             {/* Example list items (replace with dynamic data from Appwrite Function) */}
//             {[
//               { name: 'Gateway IV', sales: '874K' },
//               { name: 'The Rustic Fox', sales: '721K' },
//               { name: 'Velvet Vine', sales: '586K' },
//               { name: 'Blue Harbor', sales: '509K' },
//               { name: 'Nebula Novelties', sales: '395K' },
//               { name: 'Crimson Crafters', sales: '344K' },
//               { name: 'Tidal Treasures', sales: '274K' },
//               { name: 'Whimsy Wild', sales: '213K' },
//               { name: 'Mercantile', sales: '183K' },
//               { name: 'Emporium', sales: '176K' },
//             ].map((store, index) => (
//               <div key={index} className="flex items-center text-sm">
//                 <span className="w-1/2 truncate text-textDark">{store.name}</span>
//                 <div className="w-1/2 bg-gray-200 rounded-full h-2.5 ml-2">
//                   <div
//                     className="bg-primaryBlue h-2.5 rounded-full"
//                     style={{ width: `${(parseInt(store.sales) / 900) * 100}%` }} // Example width calculation
//                   ></div>
//                 </div>
//                 <span className="ml-2 text-gray-500 text-xs font-semibold">{store.sales}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Expense vs Profit Chart (Line Chart) */}
//       <div className="bg-cardBg rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-textDark mb-4">Expense vs Profit</h3>
//         {/* <ExpenseProfitChart /> */}
//         <div className="h-64 flex items-center justify-center">
//           <p>Line Chart Placeholder</p> {/* Replace with Recharts/Chart.js component */}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default DashboardPage;