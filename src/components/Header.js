import { useState,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const[btnNameReact,setBtnNameReact]=useState("Login");

  const onlineStatus=useOnlineStatus();

  const {loggedInUser} = useContext(UserContext);
  console.log(loggedInUser);
  const cartItems=useSelector((store)=>store?.cart?.items);
  console.log(cartItems);
  return (
    <div className="flex justify-between bg-pink-50 shadow-lg m-2">
      <div className="w-36">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-1 m-1">
          <li className="px-10">
            OnlineStatus:{onlineStatus ? "Online" : "Offline"}
          </li>
          <li className="px-10">
            <Link to="/">Home</Link>
          </li>
          <li className="px-10">
            <Link to="/About">AboutUs</Link>
          </li>
          <li className="px-10">
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className="px-10">
            <Link to="/Contact">ContactUs</Link>
          </li>
          <li className="px-10">
          {console.log('cart items', cartItems)}
            <Link to="/cart">
            Cart - ({cartItems?.length} items)
            </Link>
          </li>
          <button
            className="px-25"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
              console.log(btnNameReact);
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-10 font-bold">
            <Link to="/">{loggedInUser}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;