import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCinema } from '../../../redux/Slices/CinemaSlice';
import { getAllMovie } from '../../../redux/Slices/movieSlice';
import { createShow } from '../../../redux/Slices/showSlice';


function AddsShow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // You might need to fetch movies and cinemas for dropdowns
    const MovieList = useSelector(state => state.movie.movieList);
    const CinemaList = useSelector(state => state.cinema.cinemaList);

    function loadCinemaMovie(){
     if (CinemaList.length === 0) {
        dispatch(getAllCinema());
    }

    if (MovieList.length === 0) {
        dispatch(getAllMovie());
    }

    }

    useEffect(() => { loadCinemaMovie() }, [] )
    
    const [formData, setFormData] = useState({
        movieId: "",
        cinemaId: "",
        screenName: "",
        showTime: "",
    });
    
    const [seatConfig, setSeatConfig] = useState({
        rows: 1,
        columns: 1,
        basePrice: 300
    });
    
    const [seats, setSeats] = useState([]);
    
    // Generate seats based on row and column input
    const generateSeats = () => {
        const newSeats = [];
        const rows = Number(seatConfig.rows);
        const cols = Number(seatConfig.columns);
        
        for (let r = 0; r < rows; r++) {
            const rowLabel = String.fromCharCode(65 + r); // A, B, C, etc.
            for (let c = 1; c <= cols; c++) {
                newSeats.push({
                    seatNumber: `${rowLabel}${c}`,
                    status: "Available",
                    price: Number(seatConfig.basePrice)
                });
            }
        }
        
        setSeats(newSeats);
    };
    
    // Reset form
    function resetForm() {
        setFormData({
            movieId: "",
            cinemaId: "",
            screenName: "",
            showTime: "",
        });
        setSeatConfig({
            rows: 1,
            columns: 1,
            basePrice: 300
        });
        setSeats([]);
    }
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    // Handle seat config changes
    const handleSeatConfigChange = (e) => {
        const { name, value } = e.target;
        setSeatConfig({
            ...seatConfig,
            [name]: value
        });
    };
    
    // Handle seat price change
    const handleSeatPriceChange = (index, price) => {
        const updatedSeats = [...seats];
        updatedSeats[index].price = Number(price);
        setSeats(updatedSeats);
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const showData = {
            ...formData,
            seats: seats
        };
        
        console.log('Show data => ', showData);
        const response = await dispatch(createShow(showData));
        
        if(response?.payload?.data) {
            navigate('/moderatorDashboard');
        }
        resetForm();
    };
    
    return (
        <div className="w-full rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Add New Show</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Movie</label>
                        <select
                            name="movieId"
                            className="input w-full"
                            value={formData.movieId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Movie</option>
                            {MovieList.length > 0 && (
                              MovieList.map( (item) => (
                                <option value={item._id}>{item.title}</option>

                              ))
                            )}
                        </select>
                    </div>
                    
                    <div>
                        <label className="label">Cinema</label>
                        <select
                            name="cinemaId"
                            className="input w-full"
                            value={formData.cinemaId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Cinema</option>
                          { CinemaList.length > 0 && 
                              CinemaList.map((item) => (
                                <option value={item._id}>{item.name}</option>
                              ))
                            }
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Screen Name</label>
                        <input
                            type="text"
                            name="screenName"
                            className="input w-full"
                            placeholder="Screen Name"
                            value={formData.screenName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="label">Show Time</label>
                        <input
                            type="datetime-local"
                            name="showTime"
                            className="input w-full"
                            value={formData.showTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-2">Seat Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Number of Rows</label>
                            <input
                                type="number"
                                name="rows"
                                className="input w-full"
                                min="1"
                                max="26"
                                value={seatConfig.rows}
                                onChange={handleSeatConfigChange}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="label">Seats per Row</label>
                            <input
                                type="number"
                                name="columns"
                                className="input w-full"
                                min="1"
                                value={seatConfig.columns}
                                onChange={handleSeatConfigChange}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="label">Base Price (₹)</label>
                            <input
                                type="number"
                                name="basePrice"
                                className="input w-full"
                                min="1"
                                value={seatConfig.basePrice}
                                onChange={handleSeatConfigChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        className="btn btn-secondary mt-4"
                        onClick={generateSeats}
                    >
                        Generate Seats
                    </button>
                </div>
                
                {seats.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Seats ({seats.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {seats.map((seat, index) => (
                                <div key={seat.seatNumber} className="border p-2 rounded">
                                    <div className="font-semibold">{seat.seatNumber}</div>
                                    <div className="flex items-center">
                                        <label className="text-sm mr-1">Price:</label>
                                        <input
                                            type="number"
                                            className="input input-sm w-full"
                                            value={seat.price}
                                            onChange={(e) => handleSeatPriceChange(index, e.target.value)}
                                            min="1"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="flex justify-end gap-2 mt-6">
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={seats.length === 0}
                    >
                        Add Show
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddsShow;