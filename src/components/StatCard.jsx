import React from "react";
function StatCard({ title, value, icon, className, description }){
     return (
    <div className={`bg-cardBg rounded-lg shadow-md p-6 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <span className="text-xl text-primaryBlue">{icon}</span>}
      </div>
      <p className="text-3xl font-bold text-textDark mt-1">{value}</p>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  );

}
export default StatCard;