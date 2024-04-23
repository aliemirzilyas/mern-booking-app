import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo-black.svg";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "@/contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="py-6">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="mernholidays.com logo" width={256} />
        </Link>

        <div className="flex space-x-3">
          {isLoggedIn ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="rounded-sm font-medium text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-gray-50"
              >
                <Link to="/my-bookings">My bookings</Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="rounded-sm font-medium text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-gray-50"
              >
                <Link to="/my-hotels">My hotels</Link>
              </Button>

              <SignOutButton />
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="rounded-sm font-medium text-blue-600 transition duration-200 hover:text-blue-600"
              >
                <Link to="/sign-in">Sign in</Link>
              </Button>

              <Button
                asChild
                className="rounded-sm bg-blue-600 font-medium text-gray-50 transition duration-200 hover:bg-blue-700"
              >
                <Link to="/register">Create account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
