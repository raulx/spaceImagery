import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-6 flex justify-center sm:items-center items-end sm:h-48 py-6 sm:py-0">
      <div className="flex w-11/12 sm:justify-between justify-center items-center ">
        <div className="text-center sm:block hidden">
          <p>Mail Us At</p>
          <p>Raulx103@gmail.com</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className=" text-2xl">&copy;</span>
          <span className=" font-KronaOne ">SpaceImagery</span>
        </div>
        <div className="sm:flex gap-4 hidden">
          <Link to={"/"}>Home</Link>
          <Link to={"/mars"}>Mars</Link>
          <Link to={"/gallery"}>Gallery</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
