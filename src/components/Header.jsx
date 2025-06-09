function Header(){
     return (
    <header className="bg-white p-6 shadow-sm flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        <MdNotifications className="text-gray-600 text-3xl cursor-pointer hover:text-blue-500" />
        <MdAccountCircle className="text-gray-600 text-3xl cursor-pointer hover:text-blue-500" />
      </div>
    </header>
  );
}
export default Header;