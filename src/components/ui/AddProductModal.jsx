import React, { useState, useEffect } from "react";

const initialForm = {
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
    status: "in_stock",
};

const AddProductModal = ({ isOpen, onClose, onAdd, editData, onUpdate }) => {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        } else {
            setFormData(initialForm);
        }
    }, [editData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updated = {
            ...formData,
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.price),
            lastUpdated: new Date().toISOString(),
        };

        if (editData) {
            onUpdate(updated);
        } else {
            onAdd({ ...updated, id: Date.now().toString() });
        }

        setFormData(initialForm);
        onClose();
    };


    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
                }`}
        >
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-opacity-30"
                onClick={onClose}
            ></div>

            {/* Dialog Box */}
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {editData ? "Edit Product" : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        name="sku"
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-1 rounded"
                        >
                            Cancel
                        </button>

                        {editData ? (
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-1 rounded"
                            >
                                Add
                            </button>
                        )}
                    </div>

                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AddProductModal;
