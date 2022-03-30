import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "react-pro-sidebar";

import { AiOutlineTable } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";

import "../../styles/headerbar.sass";
const Headerbar = () => {
  return (
    <div className="container-fluid container-header-bar">
      <div className="row">
        <div className="col">
          <div className="header-bar">
            <Menu iconShape="circle">
              <div className="row">
                <div className="col-6">
                  <MenuItem className="item-header" icon={<RiAddLine />}>
                    <Link to="/">Thêm</Link>
                  </MenuItem>
                </div>
                <div className="col-6">
                  <MenuItem className="item-header" icon={<RiAddLine />}>
                    <Link to="/viwater">Viwater</Link>
                  </MenuItem>
                </div>
                <div className="col-6">
                  <MenuItem className="item-header" icon={<AiOutlineTable />}>
                    <Link to="/fakedevice">Danh Sách</Link>
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headerbar;
