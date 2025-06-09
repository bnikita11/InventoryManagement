import React from "react";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage'; // Your main dashboard content

function MainLayout(){
     return (
    <div className="flex min-h-screen bg-lightBg"> {/* Main container with light background */}
      <Sidebar />
      <div className="flex-1 flex flex-col"> {/* Main content area */}
        <Header />
        <main className="p-6 flex-1 overflow-auto"> {/* Padding around content, allows scrolling */}
          <DashboardPage />
        </main>
      </div>
    </div>
  );

}
export default MainLayout;