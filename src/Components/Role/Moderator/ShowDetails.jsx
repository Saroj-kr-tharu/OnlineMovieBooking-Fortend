import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteShow, getAllShow, updateShow } from '../../../redux/Slices/showSlice';
import AddsShow from './AddsShow';



function ShowDetails() {
    
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    
    
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        movieId: "",
        cinemaId: "",
        screenName: "",
        showTime: [],
        seats: []
    });

    function loadMovies() {
        if (showList.length <= 0) dispatch(getAllShow());
    }

    useEffect(() => { 
        loadMovies();
    }, []);

    // Delete function
    const handleDeleteMovie = (movieId) => {
        console.log('show id => ', movieId);
        dispatch(deleteShow(movieId))
    };

    // Edit functions
    const handleEditClick = (show) => {
        setEditingMovie(show._id);
        setEditFormData({
            id: show._id || '',
            movieId: show.movieId && typeof show.movieId === 'object' ? show.movieId._id : show.movieId || '',
            cinemaId: show.cinemaId && typeof show.cinemaId === 'object' ? show.cinemaId._id : show.cinemaId || '',
            screenName: show.screenName || '',
            showTime: show.showTime || [],
            seats: show.seats || []
        });
        setShowAddMovie(false); // Hide add movie form when editing
    };

    const handleCancelEdit = () => {
        setEditingMovie(null);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "showTime") {
            // Handle datetime input for showTime
            setEditFormData({
                ...editFormData,
                showTime: [value] // Wrap in array as per your data structure
            });
        } else {
            setEditFormData({
                ...editFormData,
                [name]: value
            });
        }
    };

    const handleUpdateMovie = (showId) => {
        console.log("Updating show with ID:", showId, "New data:", editFormData);
        setEditingMovie(null);
        dispatch(updateShow(editFormData));
    };

    const toggleAddMovie = () => {
        setShowAddMovie(!showAddMovie);
        setEditingMovie(null); // Close any open edit forms
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    // Helper function to safely display movie and cinema information
    const getIdOrName = (obj, defaultValue = 'Not set') => {
        if (!obj) return defaultValue;
        if (typeof obj === 'object') return obj._id || obj.name || obj.title || defaultValue;
        return obj;
    };

    return (
        <motion.div
        whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}
        >
            {/* Header with title and add button */}
            <div className="text-xl font-bold border-b-1 border-primary mb-3 flex justify-between items-center">
                <span>Show Information</span>
                <button 
                    className="btn btn-primary btn-sm flex items-center gap-2"
                    onClick={toggleAddMovie}
                >
                    <FaPlus /> Add Show
                </button>
            </div>
            
            {/* Add show form component */}
            {showAddMovie && <AddsShow />}

            {/* Show listing - UPDATED RESPONSIVE VERSION */}
            {showList.length > 0 && !showAddMovie && (
                <motion.div 
                whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -10, opacity: 0 }}
            transition={{
              x: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}
                >
                    <h3 className="p-4 pb-2 text-sm md:text-base opacity-60 tracking-wide">
                        Available Shows
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {showList.map((show, index) => (
                            <div key={show._id || index} className="card bg-base-100 shadow-md">
                                {editingMovie === show._id ? (
                                    // Edit show form - mobile friendly
                                    <div className="card-body p-4 bg-base-200 rounded-lg">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Show ID</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="id"
                                                value={show._id} 
                                                disabled
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Movie ID</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="movieId"
                                                value={editFormData.movieId} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Cinema ID</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="cinemaId"
                                                value={editFormData.cinemaId} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Screen Name</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="screenName"
                                                value={editFormData.screenName} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Show Time</span>
                                            </label>
                                            <input 
                                                type="datetime-local" 
                                                name="showTime"
                                                value={editFormData.showTime && editFormData.showTime.length > 0 ? 
                                                    new Date(editFormData.showTime[0]).toISOString().slice(0, 16) : 
                                                    ''}
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="card-actions justify-end mt-4">
                                            <button 
                                                className="btn btn-primary btn-md" 
                                                onClick={() => handleUpdateMovie(show._id)}
                                            >
                                                Confirm
                                            </button>
                                            <button 
                                                className="btn btn-ghost btn-md" 
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Show display card - responsive
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-xl font-semibold">{show.screenName}</div>
                                            <div className="text-2xl font-thin opacity-30 tabular-nums">
                                                #{String(index + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs uppercase font-semibold opacity-60 mb-2">
                                            {show.showTime && show.showTime.length > 0 ? 
                                                formatDate(show.showTime[0]) : 
                                                'No showtime available'}
                                        </div>
                                        
                                        {/* Display movie title if available - prominently */}
                                        {show.movieId && typeof show.movieId === 'object' && show.movieId.title && (
                                            <div className="text-sm font-medium ">
                                                Movie: <span className="text-primary">{show.movieId.title}</span>
                                            </div>
                                        )}

                                        {show.cinemaId && typeof show.cinemaId === 'object' && show.cinemaId.name && (
                                            <div className="text-sm font-medium ">
                                                Cinema: <span className="text-primary">{show.cinemaId.name}</span>
                                            </div>
                                        )}

                                        {show.cinemaId && typeof show.cinemaId === 'object' && show.cinemaId.location && (
                                            <div className="text-sm font-medium ">
                                                Location : <span className="text-primary">{show.cinemaId.location}</span>
                                            </div>
                                        )}

                                        
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className="badge badge-outline">
                                                Movie ID: {getIdOrName(show.movieId)}
                                            </span>
                                            <span className="badge badge-outline">
                                                Cinema ID: {getIdOrName(show.cinemaId)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="badge badge-outline">
                                                {show.seats ? `${show.seats.length} seats` : 'No seats'}
                                            </span>
                                            <span className="text-xs text-info">
                                                Added: {formatDate(show.createdAt)}
                                            </span>
                                        </div>

                                        <div className="card-actions justify-end mt-auto">
                                            <button 
                                                onClick={() => handleEditClick(show)} 
                                                className="btn btn-sm md:btn-md btn-primary gap-2"
                                            >
                                                <FaEdit /> <span className="hidden sm:inline">Edit</span>
                                            </button>

                                            <button 
                                                onClick={() => handleDeleteMovie(show._id)} 
                                                className="btn btn-sm md:btn-md btn-error gap-2"
                                            >
                                                <MdDelete /> <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default ShowDetails;