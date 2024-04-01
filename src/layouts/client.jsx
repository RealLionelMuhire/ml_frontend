import React, { useState } from "react";
import ClientSidebar from "../client_scenes/global_client/ClientSidebar";
import ClientTopbar from "../client_scenes/global_client/ClientTopbar"


const ClientLayout = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <div className="app">
      <ClientSidebar isSidebar={isSidebar} />
      <main className="content">
        <ClientTopbar setIsSidebar={setIsSidebar}/>
        {children}
      </main>
      </div>
    </>
  );
};

export default ClientLayout;
