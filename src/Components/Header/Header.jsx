import logo from "../../assets/logo_dark.svg";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../redux/Slices/AuthSlice';
import { getAllCinema } from '../../redux/Slices/CinemaSlice';
import { getShowByLocation } from '../../redux/Slices/showSlice';
import BookingNavbar from '../BookingNavbar/BookingNavbar';

 
function Header() {
  const authState = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Kathmandu"); // Default city
  const cinemaLocation = useSelector((state) => state.cinema.cinemaList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = [
    {
      title: 'Location', 
      options: [...new Set(cinemaLocation.map(item => item?.location).filter(Boolean))]
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function loadShowBylocation() {
    if (cinemaLocation.length === 0) {
      dispatch(getAllCinema());
    }
  }
  
  function handleCityClick(city) {
    setSelectedCity(city);
    // alert(city)
    dispatch(getShowByLocation(city));
    setShowCityModal(false);
  }

  useEffect(() => { loadShowBylocation(); }, []);

  const toggleLocation = () => {
    setShowCityModal(true);
  };

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
      whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      initial={isMobile ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{
        y: { duration: isMobile ? 0 : 0.5, ease: "easeIn" },
        opacity: { duration: isMobile ? 0 : 0.5, ease: "easeIn" },
      }}
      viewport={{ once: true }}
    >
      <div className="navbar bg-neutral shadow-sm">
        {/* Mobile view */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn py-2 btn-ghost block sm:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              {Menu.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.link}>{item.title}</Link>
                  </li>
                );
              })}

              <li onClick={toggleLocation} className="sm:hidden flex items-center justify-between">
                <button className="flex items-center justify-between w-full">
                  Location
                </button>
              </li>
            </ul>
          </div>

          <div className="text-xl">
            {" "}
            <Link to={"/"}>
              <img
                className="w-full sm:w-4/5 hover:cursor-pointer"
                src={logo}
                alt="logo"
              />{" "}
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal px-1">
            {Menu.map((item, index) => {
              return (
                <li className="uppercase" key={index}>
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
              className="btn btn-xs sm:btn-sm sm:text-sm text-[10px]"
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
            {!authState.isLoggedIn ? (
              // Options for logged out users
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
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
                  <Link to="/changepassword">Change Password</Link>
                </li>
                <li>
                  <Link
                    to={
                      authState.role == 'ADMIN'
                        ? '/adminDashboard'
                        : authState.role == 'MODERATOR'
                        ? '/moderatorDashboard'
                        : "/"
                    }
                  >
                    {authState.role}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <BookingNavbar />

      {/* City Selection Modal */}
      {showCityModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowCityModal(false)}
        >
          <div 
            className="bg-gray-800 text-white p-6 rounded-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Cities</h2>
              <button onClick={() => setShowCityModal(false)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {menu[0].options.map(opt => (
                <button 
                  onClick={() => handleCityClick(opt)} 
                  className={`text-center border border-gray-600 rounded-md py-2 cursor-pointer hover:bg-opacity-80 ${selectedCity === opt ? 'bg-primary text-white' : ''}`} 
                  key={opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Header;