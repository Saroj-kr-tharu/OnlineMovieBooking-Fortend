import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaFilm, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from '../../../redux/Slices/movieSlice';
import { getAllShow } from '../../../redux/Slices/showSlice';
import ModeratorDashboard from './ModeratorDashboard';
import MovieDetails from './MovieDetails';
import ShowDetails from './ShowDetails';


function ModeratorCom() {

    // State definitions
    const [selectedOption, setSelectedOption] = useState("Dashboard");
    const [showAddMovie, setShowAddMovie] = useState(false);
    const dispatch = useDispatch();
    
    // Redux state
     const auth = useSelector((state) => state.auth);
     const MovieList = useSelector(state => state.movie.movieList);
     const ShowList = useSelector(state => state.show.showList);

    function loadCinemaMovie(){
     if (ShowList.length === 0) {
        dispatch(getAllShow());
    }

    if (MovieList.length === 0) {
        dispatch(getAllMovie());
    }

    }

    useEffect(() => { loadCinemaMovie() }, [] )

    
 
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowAddMovie(false); 
    };



    const leftDataDetails = [
    {'title': 'Dashboard', icon: FaTachometerAlt},
    {'title': 'Show', icon: FaCalendarAlt},
    {'title': 'Movie', icon: FaFilm},
    ]
     
    return (
        <motion.div
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
            staggerChildren: 0.1,
            opacity: { duration: 0.8 },
            scale: { duration: 0.6 }
            }}

        className="p-4 rounded-xl w-full bg-neutral-900/80">
            {/* User info section */}
            <div className="flex gap-x-4 items-center text-xl font-semibold"> 
                <div className="text-3xl text-white"><FaUserCircle /></div>
                <div>{auth.email}</div> 
            </div>

            


            {/* Main content section */}
            <div className="mt-2 flex flex-col sm:flex-row gap-4">
                {/* Navigation sidebar */}
              
                <motion.div 
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    initial={{ x: -100, opacity: 0, scale: 0.95 }}
                    transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1], 
                    staggerChildren: 0.1,
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.6 }
                }}

                id="leftside" className="flex flex-row sm:flex-col   gap-y-4 sm:gap-y-4 mt-10 text-xl font-semibold w-1/3 sm:w-1/8"> 

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

                    

                </motion.div>
                
                {/* Content area */}
                <div id="rightside" className="w-full sm:w-11/12 bg-neutral-800/50 p-4 rounded-lg">
                    {selectedOption === "Movie" ? (
                        <MovieDetails />
                    ) : selectedOption === "Show" ? (
                        <ShowDetails />
                    ) : selectedOption === "Dashboard" ? (
                        <ModeratorDashboard />
                    ) : (
                        <div>Please select an option</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ModeratorCom;