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
      isBlurred={true}
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
        <div className="flex gap-6 items-center rounded-full px-8 py-2 btn-gradient transition duration-300 shadow-lg">
          {pages.map((page) => {
            return (
              <NavbarItem key={page.name}>
                <Link
                  to={page.path}
                  className={`capitalize text-lg tracking-widest text-white transition-all  ${
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
        <NavbarMenuItem className="shadow-md py-4 rounded-lg w-full gradient-1 mx-auto mt-6">
          {pages.map((page) => {
            return (
              <Link
                className={`w-full flex justify-center items-center tracking-widest capitalize my-4 text-white ${
                  activeLink === page.name && "text-2xl font-bold"
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
