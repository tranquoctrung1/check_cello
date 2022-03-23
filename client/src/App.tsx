import React, { useEffect } from "react";
import "./styles/app.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProSidebar from "./components/sidebar/Sidebar";

function App() {
  useEffect(() => {
    document.title = "Device Checking Viwater";
  });
  return (
    <div className="App">
      <Router>
        <ProSidebar />
      </Router>
    </div>
  );
}

export default App;
