"use client";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function Page() {
  return (
    <div className={`grid grid-cols-5 w-full h-fit gap-x-[10px]`}>
      <Sidebar className={`!bg-white`} width="100%">
        <Menu>
          <MenuItem>Home</MenuItem>
          <MenuItem>Home</MenuItem>
          <MenuItem>Home</MenuItem>
          <MenuItem>Home</MenuItem>
        </Menu>
      </Sidebar>
      <div className={`col-span-4 h-[100vh] bg-white`}></div>
    </div>
  );
}

export default Page;
