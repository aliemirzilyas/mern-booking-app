import { Link } from "react-router-dom";
import logo from "../assets/logo-white.svg";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="mernholidays.com logo" width={256} />
        </Link>

        <div className="flex items-center gap-6 font-medium tracking-tight text-gray-50">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
