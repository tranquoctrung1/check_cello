import React from "react";
import "./styles/app.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProSidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Router>
        <ProSidebar />
      </Router>
    </div>
  );
}

export default App;
