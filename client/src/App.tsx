import React, { useEffect } from "react";
import "./styles/app.sass";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProSidebar from "./components/sidebar/Sidebar";

import Home from "./components/home/home";
import FakeDevice from "./components/fakeDevice/fakeDevice";
import Headerbar from "./components/headerbar/Headerbar";
import Viwater from "./components/viwater/viwater";

function App() {
  useEffect(() => {
    document.title = "Device Checking Viwater";
  });
  return (
    <div className="App">
      <Router>
        <div className="box-container">
          <div>
            <ProSidebar />
            <Headerbar />
          </div>
          <div className="right-container">
            <Routes>
              <Route path="/viwater" element={<Viwater />} />
              <Route path="/fakedevice" element={<FakeDevice />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
