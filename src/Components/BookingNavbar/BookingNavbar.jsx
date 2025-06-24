import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCinema } from '../../redux/Slices/CinemaSlice';
import { getShowByLocation } from '../../redux/Slices/showSlice';

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

function BookingNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LocationShowList = useSelector((state) => state.show.LocationListShow);
    const cinemaLocation = useSelector((state) => state.cinema.cinemaList);
    
    function loadShowBylocation() {
        if (LocationShowList.length === 0) {
            dispatch(getShowByLocation("Kathmandu"));
        }
        if (cinemaLocation.length === 0) {
            dispatch(getAllCinema());
        }
    }

    useEffect(() => { loadShowBylocation(); }, []);

    // State to track selections
    const [selections, setSelections] = useState({
        Location: 'Kathmandu',
        cinema: '',
        Movie: '',
        Date: '', 
        Time: ''
    });

    const menu = [
        {
            title: 'Location', 
            options: [...new Set(cinemaLocation.map(item => item?.location).filter(Boolean))]
        },
        {
            title: 'cinema', 
            options: [ ... new Set(LocationShowList
                .filter(item => !selections.Location || item?.cinemaId?.location === selections.Location)
                .map(item => item?.cinemaId?.name)
                .filter(Boolean))]
        }, 
        {  
            title: 'Movie', 
            options: [ ... new Set(LocationShowList
                .filter(item => 
                    (!selections.Location || item?.cinemaId?.location === selections.Location) &&
                    (!selections.cinema || item?.cinemaId?.name === selections.cinema)
                    )
                .map(item => item?.movieId?.title)
                .filter(Boolean))]
        },
        {
            title: 'Date', 
            options: [... new Set(LocationShowList
                .filter(item => 
                    (!selections.Location || item?.cinemaId?.location === selections.Location) &&
                    (!selections.cinema || item?.cinemaId?.name === selections.cinema) &&
                    (!selections.Movie || item?.movieId?.title === selections.Movie)
                )
                .flatMap(item => 
                    (item?.showTime || []).map(time => {
                        
                        const date = new Date(time);
                        // console.log(` time => ${time} `)
                        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                    })
                )
                .filter(Boolean))]
        },
        {
            title: 'Time', 
            options: [ ... new Set(LocationShowList
                .filter(item => 
                    (!selections.Location || item?.cinemaId?.location === selections.Location) &&
                    (!selections.cinema || item?.cinemaId?.name === selections.cinema) &&
                    (!selections.Movie || item?.movieId?.title === selections.Movie)
                )
                .flatMap(item => 
                    (item?.showTime || [])
                        .filter(time => {
                            if (!selections.Date) return true;
                            const date = new Date(time);
                            const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                            return formattedDate === selections.Date;
                        })
                        .map(time => {
                            const date = new Date(time);
                            let hours = date.getUTCHours();
                            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                            const ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours === 0 ? 12 : hours;
                            return `${hours}:${minutes} ${ampm}`;
                        })
                )
                .filter(Boolean))]
        },
    ];
 
    // Check if a dropdown should be disabled
    const isDisabled = (index) => {
        if (index === 0) return false; // First dropdown always enabled
        
        const prevTitle = menu[index - 1].title;
        return !selections[prevTitle];
    };

    // Handler functions for each dropdown
    const handleLocationChange = (value) => {
        const newSelections = { 
            ...selections,
            Location: value,
            cinema: '',
            Movie: '',
            Date: '',
            Time: ''
        };
        
        setSelections(newSelections);
        dispatch(getShowByLocation(value));
    };

    const handleCinemaChange = (value) => {
        const newSelections = { 
            ...selections,
            cinema: value,
            Movie: '',
            Date: '',
            Time: ''
        };
        
        setSelections(newSelections);
    };

    const handleMovieChange = (value) => {
        const newSelections = { 
            ...selections,
            Movie: value,
            Date: '',
            Time: ''
        };
        
        setSelections(newSelections);
    };

    const handleDateChange = (value) => {
        const newSelections = { 
            ...selections,
            Date: value,
            Time: ''
        };
        
        setSelections(newSelections);
    }; 

    const handleTimeChange = (value) => {
        const newSelections = { 
            ...selections,
            Time: value
        };
        
        setSelections(newSelections);
    };

    // Buy now handler
    const handleBuyNow = () => {
        console.log('Booking details:', selections);
        // navigate('/payment', {state: selections} );
        navigate('/nowShowing', {state: selections})
    };

    return ( 
        <motion.div
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{
                y: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.5, ease: "easeIn" },
              }}
              viewport={{ once: true }}> 
              
            <div className="hidden sm:flex w-full items-center justify-between h-10 bg-neutral shadow-sm">
                <div className="btn btn-ghost text-sm">
                    <span className="text-primary">Cinema</span> | Movie
                </div>
                
                <div className="flex justify-around items-center w-4/5 menu menu-horizontal z-20">
                    {/* Location Dropdown */}
                    <section className="w-1/6">
                        <select 
                            value={selections.Location}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            className="select hover:cursor-pointer bg-neutral border-white border-t-0 border-l-0 border-r-0 select-xs w-full focus:outline-none"
                        >
                            <option value="" disabled>Location</option>
                            {menu[0].options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    {/* Cinema Dropdown */}
                    <section className="w-1/6">
                        <select 
                            value={selections.cinema}
                            disabled={isDisabled(1)}
                            onChange={(e) => handleCinemaChange(e.target.value)}
                            className={`select hover:cursor-pointer bg-neutral border-white border-t-0 border-l-0 border-r-0 select-xs w-full focus:outline-none ${isDisabled(1) ? 'opacity-50' : ''}`}
                        >
                            <option value="" disabled>Cinema</option>
                            {menu[1].options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    {/* Movie Dropdown */}
                    <section className="w-1/6">
                        <select 
                            value={selections.Movie}
                            disabled={isDisabled(2)}
                            onChange={(e) => handleMovieChange(e.target.value)}
                            className={`select hover:cursor-pointer bg-neutral border-white border-t-0 border-l-0 border-r-0 select-xs w-full focus:outline-none ${isDisabled(2) ? 'opacity-50' : ''}`}
                        >
                            <option value="" disabled>Movie</option>
                            {menu[2].options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    {/* Date Dropdown */}
                    <section className="w-1/6">
                        <select 
                            value={selections.Date}
                            disabled={isDisabled(3)}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className={`select hover:cursor-pointer bg-neutral border-white border-t-0 border-l-0 border-r-0 select-xs w-full focus:outline-none ${isDisabled(3) ? 'opacity-50' : ''}`}
                        >
                            <option value="" disabled>Date</option>
                            {menu[3].options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    {/* Time Dropdown */}
                    <section className="w-1/6">
                        <select 
                            value={selections.Time}
                            disabled={isDisabled(4)}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            className={`select hover:cursor-pointer bg-neutral border-white border-t-0 border-l-0 border-r-0 select-xs w-full focus:outline-none ${isDisabled(4) ? 'opacity-50' : ''}`}
                        >
                            <option value="" disabled>Time</option>
                            {menu[4].options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    <div>
                        <div 
                            className={`btn btn-sm btn-primary ${!selections.Time ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={selections.Time ? handleBuyNow : undefined}
                            disabled={!selections.Time}
                        >
                            Buy Now
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default BookingNavbar;