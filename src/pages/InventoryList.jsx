import { Search } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { mockInventory } from "../components/ui/MockInventory";
import InventoryTable from "../components/ui/DataTable";
import AddProductModal from "../components/ui/AddProductModal";


function InventoryList() {
    const [productSearchQuery, setProductSearchQuery] = useState();
    const [products, setProducts] = useState(mockInventory);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showAddNewProduct, setShowAddNewProduct] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const itemsToDisplay = productSearchQuery ? filteredProducts : products;
    const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);



    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowAddNewProduct(true); // opens the modal
    };

    const handleUpdate = (updatedItem) => {
        const updated = products.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        setProducts(updated);
    };
    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            const updated = products.filter((item) => item.id !== id);
            setProducts(updated);
        }
    };



    // Adding api

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await getInventory();
    //             setProducts(data);
    //         } catch (error) {
    //             console.error("Failed to fetch inventory", error);
    //         }
    //     }
    //     fetchData();
    // }, []);


    // const handleAddProduct = async (product) => {
    //     const newItem = await addInventory(product);
    //     setProducts(prev => [...prev, newItem]);
    // };

    // const handleEdit = (item) => {
    //     setEditItem(item);
    //     setShowAddNewProduct(true);
    // };

    // const handleUpdate = async (updatedItem) => {
    //     const updated = await updateInventory(updatedItem);
    //     setProducts(prev =>
    //         prev.map((item) => (item.$id === updated.$id ? updated : item))
    //     );
    // };

    // const handleDelete = async (id) => {
    //     setProductSearchQuery("");
    //     await deleteInventory(id);
    //     setProducts(prev => prev.filter(item => item.$id !== id));
    // };



    useEffect(() => {
        const lowerCaseQuery = productSearchQuery?.toLowerCase() || "";
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.sku.toLowerCase().includes(lowerCaseQuery) ||
            product.category.toLowerCase().includes(lowerCaseQuery) ||
            product.quantity.toString().includes(lowerCaseQuery) ||
            product.price.toString().includes(lowerCaseQuery) ||
            product.status.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(filtered);
    }, [productSearchQuery, products]);



    return (
        <div className="min-w h-screen flex flex-col ml-2">
            <div className="flex justify-between items-center m-2">
                <div className="relative">
                    <input className='rounded-2xl bg-slate-200 border-white '
                        type="text"
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)} />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Search />
                    </span>
                </div>
                <div>
                    <button className="bg-green-300 rounded-2xl px-4 py-1" onClick={() => setShowAddNewProduct(true)}>Add Product</button>
                </div>
            </div>
            <div className="m-4 p-4 ">
                {/* <InventoryTable items={filteredProducts || products} /> */}
                <InventoryTable items={currentItems} onEdit={handleEdit}
                    onDelete={handleDelete} />
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({
                        length: Math.ceil(itemsToDisplay.length / itemsPerPage),
                    }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            {showAddNewProduct &&
                <AddProductModal
                    isOpen={showAddNewProduct}
                    onClose={() => {
                        setShowAddNewProduct(false);
                        setEditItem(null);
                    }}
                    onAdd={handleAddProduct}
                    onUpdate={handleUpdate}
                    editData={editItem}

                />}
        </div>
    )

}
export default InventoryList;