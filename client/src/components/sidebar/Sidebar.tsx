import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../../styles/sidebar.sass";

import { FaGem, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [toggle, useToggle] = useState(false);

  return (
    <ProSidebar
      className="side-bar"
      collapsed={false}
      toggled={true}
      breakPoint="md"
    >
      <SidebarHeader className="side-bar-header">
        <div>Viwater</div>
      </SidebarHeader>
      <SidebarContent className="side-bar-content">
        <Menu iconShape="circle">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter className="side-bar-footer">
        <div>Footer</div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
