import {Sidebar} from './Sidebar.jsx';
import Header from './Header.jsx';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
function MainLayout(){
  const [isSidebarOpen,setIsSidebarOpen]=useState(false);
  
     return (
    <div className=" min-h-screen "> {/* Main container with light background */}
      <Sidebar isSidebarOpen={isSidebarOpen}/>
      <div className="flex flex-col "> {/* Main content area */}
        
        <main className={("p-6 flex-1", isSidebarOpen ? "ml-64" : "ml-0")}> {/* Padding around content, allows scrolling */}
          <Header toggleButton={()=>setIsSidebarOpen(prev=>!prev)}/>
            <Outlet/>
          
        </main>
      </div>
    </div>
  );

}
export default MainLayout;