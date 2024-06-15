"use client";

import {
  Sidebar,
  Menu,
  MenuItem,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";

import HomeIcon from "@mui/icons-material/Home";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import TokenRoundedIcon from "@mui/icons-material/TokenRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";

import { useRouter } from "next/navigation";
import { useState } from "react";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const [hasImage, setHasImage] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const router = useRouter();
  const menuItemsStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: "#0098e5",
      [`&.${menuClasses.disabled}`]: {
        color: "#9fb6cf",
      },
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba("#fbfcfd", hasImage && !collapsed ? 0.4 : 1)
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: "#9fb6cf",
      },
      "&:hover": {
        backgroundColor: hexToRgba("#c5e4ff", hasImage ? 0.8 : 1),
        color: "#44596e",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  const handleMenuItemClick = ({
    item,
    subUrl,
  }: {
    item: string;
    subUrl: string;
  }) => {
    setActiveItem(item);

    router.push(subUrl);
  };

  return (
    <div className={`w-full h-fit flex space-x-2 relative`}>
      {broken && (
        <button
          className={`absolute top-[13px] bg-white z-10 w-[30px] h-[30px] rounded-full shadow-lg left-[10px] block`}
          type="button"
          onClick={() => setToggled((p) => !p)}
        >
          <MenuRoundedIcon color="action" />
        </button>
      )}
      <Sidebar
        breakPoint="sm"
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        className={`!bg-white h-[calc(100vh-70px)] !border-0`}
        width="230px"
        backgroundColor={hexToRgba(
          themes["light"].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes["light"].sidebar.color,
        }}
      >
        <Menu className={`h-[70%]`} menuItemStyles={menuItemsStyles}>
          <MenuItem
            active={activeItem === "home"}
            icon={<HomeIcon />}
            onClick={() =>
              handleMenuItemClick({ item: "home", subUrl: "/dashboard" })
            }
          >
            Home
          </MenuItem>
          <MenuItem
            active={activeItem === "create"}
            icon={<LibraryAddRoundedIcon />}
            onClick={() =>
              handleMenuItemClick({
                item: "create",
                subUrl: "/dashboard/collection/create",
              })
            }
          >
            Create
          </MenuItem>

          <MenuItem
            icon={<FormatQuoteRoundedIcon />}
            active={activeItem === "testimonial"}
            onClick={() =>
              handleMenuItemClick({
                item: "testimonial",
                subUrl: "/dashboard/testimonial/create",
              })
            }
          >
            Testimonial
          </MenuItem>
          <MenuItem
            active={activeItem === "Form 2"}
            icon={<TokenRoundedIcon />}
            onClick={() =>
              handleMenuItemClick({ item: "mint", subUrl: "/dashboard/mint" })
            }
          >
            Mint
          </MenuItem>
        </Menu>
        <button
          type="button"
          onClick={() => setCollapsed((p) => !p)}
          className={`w-full text-white block mx-auto h-[30px]`}
        >
          {collapsed ? (
            <KeyboardDoubleArrowRightRoundedIcon color="action" />
          ) : (
            <KeyboardDoubleArrowLeftRoundedIcon color="action" />
          )}
        </button>
      </Sidebar>
      <div className={`flex-grow xl:flex flex h-[100%] bg-white`}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
