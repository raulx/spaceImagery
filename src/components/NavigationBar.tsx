import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

function NavigationBar() {
  return (
    <Navbar className="flex justify-between p-2 sticky w-full border-b bg-gradient-to-bl from-white to-slate-300 py-4 opacity-95 top-0 left-0">
      <NavbarBrand>
        <p>Acme</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>item1</NavbarItem>
        <NavbarItem>item2</NavbarItem>
        <NavbarItem>item3</NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>link1</NavbarItem>
        <NavbarItem>link2</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavigationBar;
