import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaFilm, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCinema } from '../../../redux/Slices/CinemaSlice';
import AddRole from './AddRole';
import AdminDashboard from './AdminDashboard';
import CinemaDetail from './CinemaDetials';

function AdminCom() {
    // State definitions 
    const [selectedOption, setSelectedOption] = useState("Dashboard"); 
    const [showAddMovie, setShowAddMovie] = useState(false);
    const dispatch = useDispatch();
    
    // Redux state
     const auth = useSelector((state) => state.auth);
     const CinemaList = useSelector(state => state.cinema.cinemaList);

    function loadCinemaMovie(){
     if (CinemaList.length === 0) {
        dispatch(getAllCinema());
    }

    }

    useEffect(() => { loadCinemaMovie() }, [] )

    
 
    // Event handlers
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowAddMovie(false); 
    };

 

    const leftDataDetails = [
        {'title': 'Dashboard', icon: FaTachometerAlt},
        {'title': 'Role', icon: FaCalendarAlt},
        {'title': 'Cinema', icon: FaFilm},
        ]
    
    return (
        <div className="p-4 rounded-xl  w-full bg-neutral-900/80">

            {/* User info section */}
            <div className="flex gap-x-4 items-center text-xl font-semibold"> 
                <div className="text-3xl text-white"><FaUserCircle /></div>
                <div>{auth.email}</div> 
            </div>

            

            {/* Main content section */}
            <motion.div 
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}
            className="mt-2 flex flex-col sm:flex-row gap-4">
                {/* Navigation sidebar */}
                <div id="leftside" className="flex flex-row sm:flex-col gap-y-2 sm:gap-y-4 mt-10 text-xl font-semibold w-1/3 sm:w-1/8"> 
                   

                    {
                        leftDataDetails.map((item) => {
                            return (
                                <div 
                                    key={item.title}
                                    className={`btn btn-xs text-xs  justify-evenly py-4 w-11/12 mx-2 sm:mx-auto cursor-pointer transition-all duration-200 hover:scale-105 ${
                                        selectedOption === item.title ? "btn-primary" : "btn-secondary"
                                    }`}
                                    onClick={() => handleOptionClick(item.title)}
                                    role="button"
                                    tabIndex={0}
                                    
                                >  
                                    <item.icon className="text-lg" />
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </div>
                
                {/* Content area */}
                <div id="rightside" className="w-full sm:w-11/12 bg-neutral-800/50 p-4 rounded-lg">
                    

                    {selectedOption === "Role" ? (
                        <AddRole />
                    ) : selectedOption === "Cinema" ? (
                        <CinemaDetail />
                    ) : selectedOption === "Dashboard" ? (
                        <AdminDashboard />
                    ) : (
                        <div>Please select an option</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default AdminCom;