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
import "../../styles/sidebar.sass";

import { Link } from "react-router-dom";

import { RootState } from "../../store/store";
import {
  toggleAction,
  collapsedAction,
} from "../../feature/sidebar/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineTable } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";

const Sidebar = () => {
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);
  const toggled = useSelector((state: RootState) => state.sidebar.toggled);

  const dispatch = useDispatch();

  function handlerOnClick() {
    dispatch(collapsedAction());
  }

  return (
    <ProSidebar
      className="side-bar"
      collapsed={collapsed}
      toggled={false}
      breakPoint="md"
    >
      <SidebarHeader className="side-bar-header">
        <div> {collapsed === true ? "" : "Viwater"}</div>
        <MenuItem
          className={
            collapsed === true ? "btn-expanse close" : "btn-expanse open"
          }
          icon={collapsed === true ? <FaBars /> : <AiOutlineClose />}
          onClick={handlerOnClick}
        ></MenuItem>
      </SidebarHeader>
      <SidebarContent className="side-bar-content">
        <Menu iconShape="circle">
          <MenuItem icon={<RiAddLine />}>
            <Link to="/">Thêm Thiết Bị</Link>
          </MenuItem>
          <MenuItem icon={<RiAddLine />}>
            <Link to="/viwater">Thêm Mã Viwater</Link>
          </MenuItem>
          <MenuItem icon={<AiOutlineTable />}>
            <Link to="/fakedevice">Danh Sách Thiết Bị Khác</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter className="side-bar-footer">
        <div>{collapsed === true ? "" : "Cello Checking"}</div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
