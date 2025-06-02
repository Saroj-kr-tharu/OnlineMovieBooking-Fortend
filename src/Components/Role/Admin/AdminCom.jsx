import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCinema } from '../../../redux/Slices/CinemaSlice';
import AddRole from './AddRole';
import CinemaDetail from './CinemaDetials';


function AdminCom() {
    // State definitions 
    const [selectedOption, setSelectedOption] = useState("Movie");
    const [selectedOperation, setSelectedOperation] = useState("Show");
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

    const handleOperationClick = (operation) => {
        setSelectedOperation(operation);
    };
    
    return (
        <div className="p-4 rounded-xl w-full bg-neutral-900/80">
            {/* User info section */}
            <div className="flex gap-x-4 items-center text-xl font-semibold"> 
                <div className="text-3xl text-white"><FaUserCircle /></div>
                <div>{auth.email}</div> 
            </div>

            {/* Stats section */}
            <div className="flex items-center text-xl font-semibold border-b-1 border-primary gap-x-4 mt-2">
                <div>Cinema: <span className="text-yellow-400">0</span></div>
                <div><span className="text-primary mr-2">|</span> Moderator: <span className="text-yellow-400">0 </span></div>
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
                <div id="leftside" className="flex flex-col gap-y-4 sm:gap-y-8 mt-10 text-xl font-semibold w-full sm:w-1/4"> 
                    <div 
                        className={`btn btn-sm sm:btn-xl ${selectedOption === "Movie" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => handleOptionClick("Movie")}
                    >  
                        Moderator
                    </div>    
                    <div 
                        className={`btn btn-sm sm:btn-xl ${selectedOption === "Show" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => handleOptionClick("Show")}
                    >  
                        Cinema
                    </div>    
                </div>
                
                {/* Content area */}
                <div id="rightside" className="w-full sm:w-3/4 bg-neutral-800/50 p-4 rounded-lg">
                    {selectedOption === "Movie" ? (
                        <div> <AddRole /> </div>
                    ) : (
                        <CinemaDetail />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default AdminCom;