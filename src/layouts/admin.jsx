import React, { useState } from "react";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

const AdminLayout = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar}/>
        {children}
      </main>
      </div>
    </>
  );
};

export default AdminLayout;
