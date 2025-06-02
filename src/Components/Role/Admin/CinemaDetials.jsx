import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCinema, getAllCinema, updateCinema } from '../../../redux/Slices/CinemaSlice';
import AddCinemaCom from './AddCinemaCom'; // Replace with your actual cinema add component


function CinemaDetials() {
    
    const dispatch = useDispatch();
    const cinemaList = useSelector((state) => state.cinema.cinemaList);
    
    const [showAddCinema, setShowAddCinema] = useState(false);
    const [editingCinema, setEditingCinema] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        location: "",
        managerId: "",
        screens: []
    });

    function loadCinemas() {
        if (cinemaList.length === 0) {
            dispatch(getAllCinema());
        }
    }

    useEffect(() => { 
        if (cinemaList.length > 0) return;
        loadCinemas();
    }, []);

    // Delete function
    const handleDeleteCinema = (cinemaId) => {
        dispatch(deleteCinema(cinemaId));
    };

    // Edit functions
    const handleEditClick = (cinema) => {
        setEditingCinema(cinema._id);
        setEditFormData({
            id: cinema._id || '',
            name: cinema.name || '',
            location: cinema.location || '',
            managerId: cinema.managerId || '',
            screens: cinema.screens || []
        });
        setShowAddCinema(false); // Hide add cinema form when editing
    };

    const handleCancelEdit = () => {
        setEditingCinema(null);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleUpdateCinema = (cinemaId) => {
        console.log("Updating cinema with ID:", cinemaId, "New data:", editFormData);
        setEditingCinema(null);
        dispatch(updateCinema(editFormData));
    };

    const toggleAddCinema = () => {
        setShowAddCinema(!showAddCinema);
        setEditingCinema(null); // Close any open edit forms
    };

    return (
        <motion.div
        whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -5, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}
        >
            {/* Header with title and add button */}
            <div className="text-xl font-bold border-b-1 border-primary mb-3 flex justify-between items-center">
                <span>Cinema Information</span>
                <button 
                    className="btn btn-primary btn-sm flex items-center gap-2"
                    onClick={toggleAddCinema}
                >
                    <FaPlus /> Add Cinema
                </button>
            </div>
            
            {/* Add cinema form component */}
            {showAddCinema && <AddCinemaCom />}

            {/* Cinema listing */}
            {cinemaList.length > 0 && !showAddCinema && (
                <div>
                    <h3 className="p-4 pb-2 text-sm md:text-base opacity-60 tracking-wide">
                        Available Cinemas
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {cinemaList.map((cinema, index) => (
                            <div key={cinema._id || index} className="card bg-base-100 shadow-md">
                                {editingCinema === cinema._id ? (
                                    // Edit cinema form - mobile friendly
                                    <div className="card-body p-4 bg-base-200 rounded-lg">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Cinema ID</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="id"
                                                value={cinema._id} 
                                                disabled
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Cinema Name</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={editFormData.name} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Location</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="location"
                                                value={editFormData.location} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Manager ID</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="managerId"
                                                value={editFormData.managerId} 
                                                onChange={handleEditFormChange}
                                                className="input input-bordered w-full" 
                                            />
                                        </div>

                                        {/* Note: Screen editing would require more complex UI, not included here */}
                                        <div className="text-sm mt-2 mb-3 text-warning">
                                            Note: Screen information can't be edited here.
                                        </div>

                                        <div className="card-actions justify-end mt-4">
                                            <button 
                                                className="btn btn-primary btn-md" 
                                                onClick={() => handleUpdateCinema(cinema._id)}
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
                                    // Cinema display card - responsive
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-xl font-semibold">{cinema.name}</div>
                                            <div className="badge badge-primary">{cinema.location}</div>
                                        </div>
                                        
                                        <div className="text-sm mb-3 flex items-center gap-2">
                                            <span className="font-medium">Manager ID:</span> 
                                            <span className="badge badge-outline badge-sm">{cinema.managerId}</span>
                                        </div>
                                        
                                        <div className="divider my-2">Screens</div>
                                        
                                        {cinema.screens && cinema.screens.length > 0 ? (
                                            <div className="space-y-3">
                                                {cinema.screens.map((screen) => (
                                                    <div key={screen._id} className="collapse collapse-arrow bg-base-200">
                                                        <input type="checkbox" /> 
                                                        <div className="collapse-title font-medium p-3 min-h-8 flex items-center">
                                                            {screen.screenName} - {screen.layout}
                                                        </div>
                                                        <div className="collapse-content p-3 text-sm">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                <div>
                                                                    <span className="font-medium">Projection:</span> {screen.projectionType}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">Sound:</span> {screen.soundSystem}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-2">
                                                                <div className="font-medium">Pricing:</div>
                                                                <div className="flex flex-wrap gap-2 mt-1">
                                                                    <div className="badge">Premium: ₹{screen.seatPricing.premium}</div>
                                                                    <div className="badge badge-accent">Platinum: ₹{screen.seatPricing.platinum}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm italic opacity-70">No screens available</div>
                                        )}
                                        
                                        <div className="card-actions justify-end mt-4">
                                            <button 
                                                onClick={() => handleEditClick(cinema)} 
                                                className="btn btn-sm md:btn-md btn-primary gap-2"
                                            >
                                                <FaEdit /> <span className="hidden sm:inline">Edit</span>
                                            </button>

                                            <button 
                                                onClick={() => handleDeleteCinema(cinema._id)} 
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
                </div>
            )}
        </motion.div>
    );
}

export default CinemaDetials;