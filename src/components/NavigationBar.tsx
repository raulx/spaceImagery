import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const location = useLocation();
  const pages = [
    {
      name: "home",
      path: "/",
    },

    { name: "mars", path: "/mars" },
    { name: "gallery", path: "/gallery" },
  ];

  useEffect(() => {
    // Set active link based on current route
    switch (location.pathname) {
      case "/":
        setActiveLink("home");
        break;

      case "/mars":
        setActiveLink("mars");
        break;
      case "/gallery":
        setActiveLink("gallery");
        break;
      default:
        setActiveLink("home");
        break;
    }
  }, [location]);

  return (
    <Navbar
      isBordered={true}
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      className="sm:py-4 py-2 bg-[#FFF6F6]"
    >
      <NavbarContent className="hidden sm:block">
        <NavbarBrand>
          <Logo />

          <span className="font-KronaOne text-sm font-bold uppercase tracking-widest mx-6 p-4 bg-white rounded-full">
            Space Imagery
          </span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end" className="sm:flex hidden">
        <div className="flex gap-6 items-center bg-white rounded-full shadow-sm px-8 py-2">
          {pages.map((page) => {
            return (
              <NavbarItem key={page.name}>
                <Link
                  to={page.path}
                  className={`capitalize text-lg tracking-widest text-[#353564] hover:text-[#353564] transition-all  ${
                    activeLink === page.name && "text-[#353564] font-bold"
                  }`}
                >
                  {page.name}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>
      {/* mobile screen  */}
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <span className="font-KronaOne text-xs font-bold uppercase tracking-widest mx-8 px-4 py-2 bg-white rounded-full">
          Space Imagery
        </span>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="bg-[#FFF6F6] my-4  border-2 rounded-lg">
          {pages.map((page) => {
            return (
              <Link
                className={`w-full flex text-sm justify-center items-center uppercase my-4 text-black ${
                  activeLink === page.name && "font-bold"
                }`}
                key={page.name}
                to={page.path}
              >
                {page.name}
              </Link>
            );
          })}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavigationBar;
