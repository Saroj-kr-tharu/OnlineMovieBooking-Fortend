import logo from "../../assets/logo_dark.png";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../redux/Slices/AuthSlice';
import BookingNavbar from '../BookingNavbar/BookingNavbar';

function Header() {
  const authState = useSelector( (state) => state.auth );
  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const Menu = [
    { title: "Home", link: "/" },
    { title: "Movie", link: "/movie" },
    { title: "Schedules", link: "/schedules" },
  ];

  function logoutfun() {
  try {
    dispatch(logoutUser());
    navigate('/login');
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

 
  return (
    <motion.div
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: -100, opacity: 0 }}
              transition={{
                y: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.5, ease: "easeIn" },
              }}
              viewport={{ once: true }}> 


    
    <div className="navbar bg-neutral   shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Menu.map((item,index) => {
              return (
                <li key={index}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className=" text-xl   ">
          {" "}
          <Link to={"/"}>
            <img
              className="w-1/4   hover:cursor-pointer"
              src={logo}
              alt="logo"
            />{" "}
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {Menu.map((item) => {
            return (
              <li className="uppercase">
                <Link to={item.link}> {item.title} </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end">
    
    {authState.isLoggedIn ? (
    // Show when user is logged in
    <button
      className="btn sm:text-sm text-xs"
      popoverTarget="popover-1"
      style={{ anchorName: "--anchor-1" }}
    >
      {authState.email}
    </button>
  ) : (
    // Show when user is not logged in
    <button
      className="btn sm:text-sm text-xs"
      popoverTarget="popover-1"
      style={{ anchorName: "--anchor-1" }}
    >
      Sign In
    </button>
  )}

  <ul
    className="dropdown menu w-40 rounded-box bg-base-100 shadow-sm"
    popover="auto"
    id="popover-1"
    style={{ positionAnchor: "--anchor-1" }}
  >
    {!authState.isLoggedIn ? ( // Options for logged out users
      <>
        <li>
          <Link to="/login"  >
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            Register
          </Link>
        </li>
      </>
    ) : (
      // Options for logged in users
      <>
        <li>
          <Link to="/" onClick={() => logoutfun()}>
            Logout
          </Link>
        </li>
        <li>
          <Link to="/changepassword" >
            Change Password
          </Link>
        </li>
        <li>
          <Link  to={
            authState.role =='ADMIN' ? '/adminDashboard': 
            authState.role == 'MODERATOR' ? '/moderatorDashboard': "/"
          } >
            {authState.role}
          </Link> 
        </li>
      </>
    )}
  </ul>
</div>
    </div>
          < BookingNavbar />

    </motion.div>
  );
}

export default Header;
