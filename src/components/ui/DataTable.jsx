import React from "react";

const InventoryTable = ({ items, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price (Rs)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.sku}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${item.status === "in_stock"
                      ? "bg-green-500"
                      : item.status === "low_stock"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                >
                  {item.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 flex gap-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
