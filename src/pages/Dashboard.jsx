import { useState } from "react";
import { mockRecentProducts, mockStats } from "../components/dashboard/Mockdata";

function Dashboard(){
    const [stats,setStats]=useState(mockStats)
   
    const [recentProducts,setRecentProducts]=useState(mockRecentProducts)
    

    const lowStockProducts=recentProducts.filter(item=>item.quantity<5);
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 ">Inventory Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <h2 className="text-2xl font-semibold text-blue-700">{stats.totalProducts}</h2>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="text-gray-500 text-sm">Low Stock Items</p>
                    <h2 className="text-2xl font-semibold text-yellow-300">{stats.lowStockItems}</h2>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="text-gray-500 text-sm">Out Of Stock</p>
                    <h2 className="text-2xl font-semibold text-red-400">{stats.outOfStockItems}</h2>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="text-gray-500 text-sm">Total Stock Values</p>
                    <h2 className="text-2xl font-semibold text-green-600">Rs.{stats.totalValue}</h2>
                </div>              
            </div>
            {/* Recent Products */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Recent Products</h2>
                <ul className="bg-white rounded-xl shadow divide-y">
                    {recentProducts.map(product=>(
                        <li key={product.id} className="text-gray-600 p-4 flex justify-between">
                            <span>{product.name} </span>
                            <span className="">{product.quantity} pcs Rs. {product.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-red-600 mb-3">Low Stock Alerts</h2>
                    <ul className="text-red-700 list-disc list-inside">
                        {lowStockProducts.map(product=>(
                            <li key={product.id}>
                                {product.name}-only {product.quantity} left
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Dashboard;