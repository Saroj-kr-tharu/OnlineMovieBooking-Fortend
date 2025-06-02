import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from '../../../redux/Slices/movieSlice';
import { getAllShow } from '../../../redux/Slices/showSlice';
import MovieDetails from './MovieDetails';
import ShowDetails from './ShowDetails';



function ModeratorCom() {
    // State definitions
    const [selectedOption, setSelectedOption] = useState("Movie");
    const [selectedOperation, setSelectedOperation] = useState("Show");
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

    
 
    // Event handlers
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowAddMovie(false); 
    };

    const handleOperationClick = (operation) => {
        setSelectedOperation(operation);
    };
    
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

            {/* Stats section */}
            <div className="flex items-center text-xl font-semibold border-b-1 border-primary gap-x-4 mt-2">
                <div>Movie: <span className="text-yellow-400">{MovieList.length || 0}</span></div>
                <div><span className="text-primary mr-2">|</span> Show: <span className="text-yellow-400">{ShowList.length || 0} </span></div>
            </div>


            {/* Main content section */}
            <div className="mt-2 flex flex-col sm:flex-row gap-4">
                {/* Navigation sidebar */}
              
                <motion.div 
                whileInView={{ x: 0, opacity: 1, scale: 1 }}
initial={{ x: -100, opacity: 0, scale: 0.95 }}
transition={{
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
  staggerChildren: 0.1,
  opacity: { duration: 0.8 },
  scale: { duration: 0.6 }
}}

                id="leftside" className="flex flex-col gap-y-4 sm:gap-y-8 mt-10 text-xl font-semibold w-full sm:w-1/4"> 
                    <div 
                        className={`btn btn-sm sm:btn-xl ${selectedOption === "Movie" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => handleOptionClick("Movie")}
                    >  
                        Movie 
                    </div>    
                    <div 
                        className={`btn btn-sm sm:btn-xl ${selectedOption === "Show" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => handleOptionClick("Show")}
                    >  
                        Show 
                    </div>    
                </motion.div>
                
                {/* Content area */}
                <div id="rightside" className="w-full sm:w-3/4 bg-neutral-800/50 p-4 rounded-lg">
                    {selectedOption === "Movie" ? (
                        <MovieDetails />
                    ) : (
                        <ShowDetails />
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ModeratorCom;