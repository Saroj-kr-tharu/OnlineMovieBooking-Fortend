

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getAllMovie, updateMovie } from '../../../redux/Slices/movieSlice';
import AddmovieCom from './AddmovieCom';


function MovieDetails() {
    
    const dispatch = useDispatch();
    const MovieList = useSelector((state) => state.movie.movieList);
    
     const [showAddMovie, setShowAddMovie] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id:"",
        title: "",
        genre: "",
        image: "",
        description: "",
        slideImage:""
    });

     function loadMovies(){
        if(MovieList.length === 0){
            dispatch(getAllMovie());

        }
    }

    useEffect(() => { 
        if(MovieList.length > 0) return;
        loadMovies();
     }, []);

     // Delete function
    const handleDeleteMovie = (movieId) => {
        // console.log('movie id => ', movieId);
        
        dispatch(deleteMovie(movieId))
    };

    // Edit functions
    // Edit functions
    const handleEditClick = (movie) => {
        setEditingMovie(movie._id);
        setEditFormData({
            id: movie._id || '',
            title: movie.title || '',
            genre: movie.genre || '',
            image: movie.image || '',
            slideImage: movie.slideImage || '',
            description: movie.description || ''
        });
        setShowAddMovie(false); // Hide add movie form when editing
    };

    const handleCancelEdit = () => {
        setEditingMovie(null);
    };


    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleUpdateMovie = (movieId) => {
        // console.log("Updating movie with ID:", movieId, "New data:", editFormData);
        
        setEditingMovie(null);
        dispatch(updateMovie(editFormData));
    };

     const toggleAddMovie = () => {
        setShowAddMovie(!showAddMovie);
        setEditingMovie(null); // Close any open edit forms
    };

    return(
       <motion.div 
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
    initial={{ y: 50, opacity: 0, scale: 0.95 }}
    transition={{
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
    staggerChildren: 0.1,
    opacity: { duration: 0.8 },
    scale: { duration: 0.6 }
    }}
       >

    {/* Header with title and add button */}
    <div className="text-xl font-bold border-b-1 border-primary mb-3 flex justify-between items-center">
        <span>Movie Information</span>
        <button 
            className="btn btn-primary btn-sm flex items-center gap-2"
            onClick={toggleAddMovie}
        >
            <FaPlus /> Add Movie
        </button>
    </div>
    
    {/* Add movie form component */}
    {showAddMovie && <AddmovieCom />}

    {/* Movie listing */}
    {MovieList.length > 0 && !showAddMovie && (
        <motion.div 
         

        >
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    Available Movies
                </li>
                
               {MovieList.map((movie, index) => (

    <motion.li 
                whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}


            
                
    key={movie._id || index} className="list-row flex flex-col md:flex-row gap-4 p-4 items-center md:items-start">
        {editingMovie === movie._id ? (
            // Edit movie form
            <div className="w-full p-4 bg-base-200 rounded-lg">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Movie Id</span>
                    </label>
                    <input 
                        type="text" 
                        name="id"
                        value={movie._id} 
                        onChange={handleEditFormChange}
                        disabled
                        className="input input-bordered w-full" 
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Movie Title</span>
                    </label>
                    <input 
                        type="text" 
                        name="title"
                        value={editFormData.title} 
                        onChange={handleEditFormChange}
                        className="input input-bordered w-full" 
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Genre</span>
                    </label>
                    <input 
                        type="text" 
                        name="genre"
                        value={editFormData.genre} 
                        onChange={handleEditFormChange}
                        className="input input-bordered w-full" 
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input 
                        type="text" 
                        name="image"
                        value={editFormData.image} 
                        onChange={handleEditFormChange}
                        className="input input-bordered w-full" 
                    />
                </div>

                 <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text"> Slide  Image URL</span>
                    </label>
                    <input 
                        type="text" 
                        name="slideImage"
                        value={editFormData.slideImage} 
                        onChange={handleEditFormChange}
                        className="input input-bordered w-full" 
                    />
                </div>



                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea 
                        name="description"
                        value={editFormData.description} 
                        onChange={handleEditFormChange}
                        className="textarea textarea-bordered w-full" 
                    />
                </div>

                <div className="flex gap-2 mt-4">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => handleUpdateMovie(movie._id)}
                    >
                        Confirm
                    </button>
                    <button 
                        className="btn btn-ghost" 
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ) : (
            // Movie display row - Responsive layout
            <>
                {/* Content container with responsive layout */}
                <div className="flex flex-col items-center md:flex-row md:items-start w-full gap-4">
                    {/* Index number */}
                    <div className="text-4xl font-thin opacity-30 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Image */}
                    <div className="mt-2 md:mt-0">
                        <img 
                            className="size-32 md:size-24 rounded-box object-cover" 
                            src={movie.image} 
                            alt={movie.title}
                        />
                    </div>
                    
                    {/* Movie details */}
                    <div className="flex-grow text-center md:text-left">
                        <div className="text-xl font-semibold">{movie.title}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">
                            {movie.genre || 'Genre N/A'}
                        </div>
                    </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button 
                        onClick={() => handleEditClick(movie)} 
                        className="text-2xl btn btn-primary"
                    >
                        <FaEdit />
                    </button>

                    <button 
                        onClick={() => handleDeleteMovie(movie._id)} 
                        className="text-2xl btn btn-primary"
                    >
                        <MdDelete />
                    </button>
                </div>
            </>
        )}
    </motion.li>
))}
            </ul>
        </motion.div>
    )}

</motion.div>
    )
}


export default MovieDetails;