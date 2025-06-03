import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from '../../redux/Slices/movieSlice';

function MovieDetailsLeft({data}) { 
    const MovieList = useSelector(state => state.movie.movieList);
    const [movie, setMovie] = useState(null);
    const dispatch = useDispatch();
    
      
    useEffect(() => {  
        if (MovieList.length === 0) {
            dispatch(getAllMovie());
        }
    }, [dispatch, MovieList.length]);
    
    useEffect(() => {
        if (MovieList.length > 0 && data?.Movie) {
            // Using title instead of name based on your movie data structure
            const foundMovie = MovieList.find(item => item.title === data.Movie);
            setMovie(foundMovie);
        }
       
        
    }, [MovieList, data?.Movie]);

    // Add conditional rendering - if movie is null, show a loading state
    if (!movie) {
        return (
            <div className="bg-base-100 md:ml-4 w-full sm:w-1/4 shadow-sm flex flex-col items-center justify-center p-4">
                <div className="animate-pulse">
                    <div className="bg-gray-300 h-60 w-48 rounded-2xl"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-4 mx-auto"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mt-2 mx-auto"></div>
                </div>
            </div>
        );
    }

    // Only render the movie details if movie exists
    return(

        <motion.div  whileInView={{ y: 0, opacity: 1, scale: 1 }}
initial={{ y: 50, opacity: 0, scale: 0.95 }}
transition={{
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
  staggerChildren: 0.1,
  opacity: { duration: 0.8 },
  scale: { duration: 0.6 }
}} className="bg-base-100 md:ml-4 w-full sm:w-full shadow-sm flex flex-col items-center sm:items-start">

            <motion.figure className="flex justify-center ml-4 md:justify-start items-start my-4">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full sm:h-50 h-80 rounded-2xl"
                />
            </motion.figure>

            <motion.div className="ml-4 flex flex-col gap-y-2 py-2"> 
                <div className="uppercase text-xs text-primary font-semibold text-center md:text-left w-full">now showing</div>
                <div className="text-center md:text-left w-full">
                    <h2 className="capitalize font-semibold mx-auto">
                        {movie.title}
                        <div className="badge badge-xs ml-2 badge-secondary">{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ""}</div>
                    </h2>

                    <div className="flex justify-center md:justify-start">
                        <div className="btn btn-xs btn-primary">{movie.duration} mins</div>
                        <div className="btn btn-xs btn-primary ml-2 uppercase font-[10px]">pg</div>
                    </div>
                    
                    <div className="text-xs mt-2 w-4/6 sm:w-4/5 text-justify mx-auto md:mx-0">{movie.description}</div>
                    
                    <div className="uppercase flex gap-x-2 mt-2  text-[10px] font-semibold  justify-center sm:mx-auto md:justify-start">  
                        <div className="">Language:</div>    
                        <div className="">Hindi</div>    
                    </div>

                    <div className="uppercase flex gap-x-2 text-[10px] font-semibold  justify-center sm:mx-auto md:justify-start">  
                        <div className="">Cast:</div>    
                        <div className="">{movie.cast}</div>    
                    </div>

                    <div className="uppercase flex gap-x-2 text-[10px] font-semibold  justify-center sm:mx-auto md:justify-start">  
                        <div className="">Director:</div>    
                        <div className="">{movie.director}</div>    
                    </div>

                </div>
            </motion.div>


        </motion.div>
    );
}

export default MovieDetailsLeft;