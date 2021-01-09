import React from 'react';
import { AdminSidebarData } from '../AdminSidebar/AdminSidebarData';

const SideBar = (props) => {
  //depending on your access level you are shown a selection on the sidebar
  const access = props.access;
  let items = 0;
  switch (access) {
    case 3:
      items = AdminSidebarData;
      break;
    case 4:
      items = SuperAdminSidebarData;
      break;
    default:
      items = AdminSidebarData;
      break;
  }
  if (items !== 0) {
    return (
      <div className="sideBar">
        <h1 className="sideBarHeader">Menu</h1>
        {items.map((val, key) => {
          return (
            <ul key={key}>
              <li
                onClick={() => props.handleSidebar(val.Selection)} //passes the selected item back to the parent component.
                value={val.Selection}
              >
                <div className="icon">{val.Icon}</div>
                <div className="listTitle">{val.Title}</div>
              </li>
            </ul>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <center>...Loading</center>
      </div>
    );
  }
};

export default SideBar;
