import { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import seats from '../../assets/seats.png';
import './curveDisplay.css';

import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MovieBookingComponent({data  }) {
    const LocationListShow = useSelector(state => state.show.LocationListShow);
    const navigate = useNavigate();
    const [filteredShowData, setFilteredShowData] = useState([]);
    
    // Date section states
    const [isDateSectionCollapsed, setIsDateSectionCollapsed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState("All");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedShowingId, setSelectedShowingId] = useState(null);
    
    // Seats section states 
    const [isSeatsCollapsed, setIsSeatsCollapsed] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [seatMap, setSeatMap] = useState({});

 
 
    useEffect(function() {

        console.log('data:', data);
        
        
        if(LocationListShow.length > 0) {
            const filteredShows = LocationListShow.filter(item => item.movieId.title === data?.Movie);
            setFilteredShowData(filteredShows);
            console.log('Filtered Shows => ', filteredShows);
        }
    }, [LocationListShow, data]);

    useEffect(() => {
        console.log('data:', data);
        
        if(LocationListShow.length > 0) {
            const filteredShows = LocationListShow.filter(item => item.movieId.title === data?.Movie);
            setFilteredShowData(filteredShows);
            console.log('Filtered Shows => ', filteredShows);
            
            // Auto-select options based on incoming data
            if (data?.Movie && data?.selectedDate && data?.seletectTime && data?.selectedCinema) {
                // Set selected date (convert to YYYY-MM-DD format)
                const dateObj = new Date(data.selectedDate);
                const formattedDate = dateObj.toISOString().split('T')[0];
                setSelectedDate(formattedDate);
                
                // Set selected cinema
                setSelectedCinema(data.selectedCinema);
                
                
                // This needs to run after filteredShowData is set
                setTimeout(() => {
                    const targetTime = data.seletectTime;
                    const relevantShows = filteredShows.filter(show => 
                        show.cinemaId.name === data.selectedCinema
                    );
                    
                    if (relevantShows.length > 0) {
                        for (const show of relevantShows) {
                            for (const time of show.showTime) {
                                const timeObj = new Date(time);
                                const formattedTime = timeObj.toISOString().substr(11, 5);
                                
                                if (formattedTime === targetTime) {
                                    const timeSlotId = `${show.cinemaId.name}-${formattedTime}-${show._id}`;
                                    setSelectedTimeSlot(timeSlotId);
                                    setSelectedShowingId(show._id);
                                    break;
                                }
                            }
                        }
                    } 
                    // setIsDateSectionCollapsed(true)
                }, 100);
            }
        }
    }, [LocationListShow, data]);

    // Extract unique dates from filtered data
    const getUniqueDates = () => {
        if (!filteredShowData || filteredShowData.length === 0) return [];
        
        // Create a Set to store unique date strings (YYYY-MM-DD)
        const uniqueDatesSet = new Set();
        
        filteredShowData.forEach(show => {
            show.showTime.forEach(time => {
                const date = new Date(time);
                const dateString = date.toISOString().split('T')[0];
                uniqueDatesSet.add(dateString);
            });
        });
        
        // Convert to array and sort chronologically
        return Array.from(uniqueDatesSet).sort();
    };

    const uniqueDates = getUniqueDates();

    // Get formatted date information for display
    const getDateInfo = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }).toLowerCase(),
            dayName: date.toLocaleString('default', { weekday: 'short' })
        };
    };

    // Filter shows by selected date
    const getShowsForSelectedDate = () => {
        if (!selectedDate || !filteredShowData) return [];
        
        return filteredShowData.filter(show => 
            show.showTime.some(time => {
                const showDate = new Date(time);
                const dateString = showDate.toISOString().split('T')[0];
                return dateString === selectedDate;
            })
        );
    };

    const showsForSelectedDate = getShowsForSelectedDate();

    // Process seats from selected showing
    useEffect(() => {
        if (!selectedShowingId || !filteredShowData) return;
        
        const selectedShow = filteredShowData.find(show => show._id === selectedShowingId);
        if (selectedShow && selectedShow.seats) {
            const newSeatMap = {};
            selectedShow.seats.forEach(seat => {
                const row = seat.seatNumber.charAt(0);
                const number = seat.seatNumber.substring(1);
                
                if (!newSeatMap[row]) {
                    newSeatMap[row] = [];
                }
                newSeatMap[row].push({
                    number, 
                    status: seat.status, 
                    price: seat.price
                });
            });
            setSeatMap(newSeatMap);
            // Clear previously selected seats when showing changes
            setSelectedSeats([]);
        }
    }, [selectedShowingId, filteredShowData]);

    // Date section toggle
    const toggleDateSection = () => {
        setIsDateSectionCollapsed(!isDateSectionCollapsed);
    };

    // Seats section toggle
    const toggleSeatsSection = () => {
        setIsSeatsCollapsed(!isSeatsCollapsed);
    };

    // Seat selection handling
    const handleSeatClick = (row, seatNumber, status) => {
        if (status !== "Available") return; // Can't select unavailable seats
        
        const seatId = `${row}${seatNumber}`;
        
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const getSeatStyle = (row, seatNumber, status = "Available") => {
        const seatId = `${row}${seatNumber}`;
        
        if (selectedSeats.includes(seatId)) {
            return { filter: "invert(81%) sepia(53%) saturate(629%) hue-rotate(359deg) brightness(105%) contrast(101%)" };
        }
        
        switch(status) {
            case "Available":
                return { filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(100deg) brightness(118%) contrast(95%)" };
            case "Reserved":
                return { filter: "invert(34%) sepia(66%) saturate(4099%) hue-rotate(213deg) brightness(101%) contrast(101%)" };
            case "SoldOut":
                return { filter: "invert(15%) sepia(95%) saturate(6932%) hue-rotate(359deg) brightness(94%) contrast(112%)" };
            default:
                return {};
        }
    };

    const calculateTotalPrice = () => {
        if (!selectedShowingId) return 0;
        
        const selectedShow = filteredShowData.find(show => show._id === selectedShowingId);
        if (!selectedShow) return 0;
        
        const defaultPrice = 300;
        return selectedSeats.length * (selectedShow?.seats?.[0]?.price || defaultPrice);
    };

    const handleBuyClick = () => {
        setShowSummary(true);
    };

    function confirmBuy() {
        const selectedShow = filteredShowData.find(show => show._id === selectedShowingId);
        if (!selectedShow) return;
        
        const selectedShowTime = selectedTimeSlot ? selectedTimeSlot.split('-')[1] : "";
        
        const data = {
            movieLeft: { Movie: selectedShow.movieId.title },
            filteredShowData: [selectedShow], 
            Date: selectedDate,
            cinema: selectedShow.cinemaId.name,
            seats: selectedSeats,
            Language: selectedLanguage,
            Time: selectedShowTime,
            ShowId: selectedShowingId,
            TotalPrice: calculateTotalPrice()
        };
        console.log('data => ', data);

        navigate('/payment', { state: data });
    }

    const seatInfo = [
        { style: { filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(100deg) brightness(118%) contrast(95%)" }, title: 'Available', image: seats },
        { style: { filter: "invert(34%) sepia(66%) saturate(4099%) hue-rotate(213deg) brightness(101%) contrast(101%)" }, title: 'Reserved', image: seats },
        { style: { filter: "invert(15%) sepia(95%) saturate(6932%) hue-rotate(359deg) brightness(94%) contrast(112%)" }, title: 'Sold Out', image: seats },
        { style: { filter: "invert(81%) sepia(53%) saturate(629%) hue-rotate(359deg) brightness(105%) contrast(101%)" }, title: 'Pick Seats', image: seats },
        { style: {}, title: 'Unavailable', image: seats }
    ];

    return (
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
            className="flex flex-col gap-y-4 ">
            {/* Date Selection Section */}
            <div className={`w-full sm:w-full ${!isDateSectionCollapsed ? 'bg-neutral-700' : ''} rounded-sm py-4 px-6`}>
                <div 
                    id="headerSection" 
                    className={`flex text-xs md:text-xl font-semibold hover:cursor-pointer items-center justify-between ${isDateSectionCollapsed ? 'bg-neutral-700 px-4 py-2 rounded-sm' : ''}`}
                    onClick={toggleDateSection}
                >
                    <div>1. Select Date, Language & Time Slots</div>    
                    <div className="text-x">
                        {isDateSectionCollapsed ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
                    </div>    
                </div> 

                {!isDateSectionCollapsed && (
                    <>
                        <div id="selectDate" className="mt-4">
                            <div className="text-sm text-neutral-400 font-semibold">Select date</div>
                            <div>
                                {uniqueDates.length > 0 ? (
                                    <>
                                        <div className="mt-1 flex gap-4">
                                            {uniqueDates.map((dateString) => {
                                                const dateInfo = getDateInfo(dateString);
                                                return (
                                                    <div
                                                        key={dateString}
                                                        className={`flex w-10 uppercase font-semibold hover:cursor-pointer border-primary hover:bg-primary hover:border-primary flex-col items-center border-1 rounded-sm btn-xs ${
                                                            selectedDate === dateString ? "bg-primary border-primary" : "btn-primary"
                                                        } space-y-[-2px]`}
                                                        onClick={() => setSelectedDate(dateString)}
                                                    >
                                                        <span className="text-[10px] opacity-80">{dateInfo.month}</span>
                                                        <span className="text-base  font-bold">{dateInfo.day}</span>
                                                        <span className="text-[10px] opacity-80">{dateInfo.dayName}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-[10px]">No dates available</div>
                                )}
                            </div>
                        </div>

                        <div id="selectCinema" className="mt-10">
                            <div className="text-sm text-neutral-400 capitalize font-semibold">Select Cinemas</div>
                            <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2 text-xs">
                                <div 
                                    className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${
                                        selectedCinema === "All" ? "bg-primary" : "bg-neutral-800"
                                    }`}
                                    onClick={() => setSelectedCinema("All")}
                                >
                                    All
                                </div>
                                {/* Get unique cinema names from filtered shows for selected date */}
                                {Array.from(new Set(showsForSelectedDate.map(show => show.cinemaId.name))).map((cinemaName, index) => (
                                    <div 
                                        key={index}
                                        className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${
                                            selectedCinema === cinemaName ? "bg-primary" : "bg-neutral-800"
                                        }`}
                                        onClick={() => setSelectedCinema(cinemaName)}
                                    >
                                        {cinemaName}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="selectLanguage" className="mt-2">
                            <div className="text-sm text-neutral-400 capitalize font-semibold">Select Languages</div>
                            <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2 text-xs">
                                <div 
                                    className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${selectedLanguage === "All" ? "bg-primary" : "bg-neutral-800"}`}
                                    onClick={() => setSelectedLanguage("All")}
                                >
                                    All
                                </div>
                                <div 
                                    className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${selectedLanguage === "English" ? "bg-primary" : "bg-neutral-800"}`}
                                    onClick={() => setSelectedLanguage("English")}
                                >
                                    English
                                </div>
                            </div>
                        </div>

                        <div id="cinema-with-time-table" className="mt-6 flex flex-col gap-y-8">
                            {showsForSelectedDate
                                .filter(show => selectedCinema === "All" || show.cinemaId.name === selectedCinema)
                                .reduce((acc, show) => {
                                    // Group by cinema name to avoid duplicate cinema entries
                                    const existingCinema = acc.find(item => item.cinemaId.name === show.cinemaId.name && item.screenName === show.screenName);
                                    if (existingCinema) {
                                        // Merge showTimes if this cinema already exists in the accumulator
                                        existingCinema.showTime = [...new Set([...existingCinema.showTime, ...show.showTime])];
                                        return acc;
                                    }
                                    return [...acc, {...show}];
                                }, [])
                                .map((show, index) => (
                                    <div key={index} id="wrapper" className="flex flex-col sm:flex-row gap-y-3 sm:gap-x-8">
                                        <div className="text-xs uppercase">
                                            <div className="font-semibold">{show.cinemaId.name}</div>
                                            <div className="text-yellow-400 font-semibold">(Screen: {show.screenName})</div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-4">
                                            {show.showTime
                                                .filter(time => {
                                                    // Only show times for the selected date
                                                    const showDate = new Date(time);
                                                    const dateString = showDate.toISOString().split('T')[0];
                                                    return dateString === selectedDate;
                                                })
                                                .map((time, idx) => {
                                                    const timeObj = new Date(time);
                                                    const formattedTime = timeObj.toISOString().substr(11, 5);
                                                    // Create a unique id for each time slot that includes the show ID
                                                    const showingId = filteredShowData.find(s => 
                                                        s.cinemaId.name === show.cinemaId.name && 
                                                        s.screenName === show.screenName && 
                                                        s.showTime.some(t => new Date(t).toISOString() === new Date(time).toISOString())
                                                    )?._id;
                                                    
                                                    const timeSlotId = `${show.cinemaId.name}-${formattedTime}-${showingId}`;
                                                    
                                                    return (
                                                        <div key={idx} className="indicator indicator-xs group">
                                                            <span className="indicator-item indicator-bottom indicator-center badge badge-secondary badge-xs uppercase">2D</span>
                                                            <button 
                                                                className={`btn btn-xs ${selectedTimeSlot === timeSlotId ? "btn-success" : "btn-primary group-hover:btn-success"}`}
                                                                onClick={() => {
                                                                    setSelectedTimeSlot(timeSlotId);
                                                                    setSelectedShowingId(showingId);
                                                                }}
                                                            >
                                                                {formattedTime}
                                                            </button>
                                                        </div>
                                                    );
                                            })}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
            </div>

            {/* Seats Selection Section - Only show interactive version if date and time are selected */}
            {selectedDate && selectedTimeSlot && selectedCinema !== "All" && selectedShowingId ? (
                <div className={`w-full  ${!isSeatsCollapsed ? 'bg-neutral-700' : ''} rounded-sm py-4 px-6`}>
                    <div 
                        id="headerSection" 
                        className={`flex font-semibold hover:cursor-pointer items-center justify-between ${isSeatsCollapsed ? 'bg-neutral-700 px-4 py-2 rounded-sm' : ''}`}
                        onClick={toggleSeatsSection}
                    >
                        <div className="text-xs sm:text-xl">2. Choose Seats</div>    
                        <div className="text-xs md:text-xl">
                            {isSeatsCollapsed ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
                        </div>  
                    </div> 

                    {!isSeatsCollapsed && (
                        <>
                            <div className="w-full flex flex-col items-center">
                                <div className="text-xl font-semibold">Screen</div>
                                <div className="w-10/12 sm:w-1/2">
                                    <div className="curved-divider"></div>
                                </div>
                            </div>

                            <div id="seats" className="flex flex-col items-start sm:items-center gap-y-4">
                                <div className="flex justify-center border-b-2 border-primary">
                                    <div className="uppercase text-xs font-semibold">
                                        {filteredShowData.find(show => show._id === selectedShowingId)?.seats?.[0]?.price 
                                            ? `Platinum NPR ${filteredShowData.find(show => show._id === selectedShowingId).seats[0].price}` 
                                            : 'Platinum NPR 300'}
                                    </div>
                                </div>

                              <div id="seats-layout" className="flex flex-col bg-neutral-700 items-start gap-y-2">
                                        {Object.keys(seatMap).map(row => (
                                            <div key={row} className="flex flex-col  sm:flex-row">
                                                <div className="w-6 text-center">{row}</div>
                                               <div className="flex  justify-baseline sm:justify-center mx-auto max-w-11/12 sm:max-w-none gap-2">
                                                    {seatMap[row].map(seat => (
                                                        <img  
                                                            key={`${row}${seat.number}`}
                                                            src={seats} 
                                                            className="w-6 sm:w-8 hover:cursor-pointer" 
                                                            style={getSeatStyle(row, seat.number, seat.status)} 
                                                            onClick={() => handleSeatClick(row, seat.number, seat.status)}
                                                            title={`${row}${seat.number} - ${seat.status}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        
                                       
                                    </div>
                            </div>
                            
                            <div id="notice" className="flex border-t-2 border-primary pt-4 gap-x-4 justify-center mt-10">
                                {seatInfo.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <img  
                                            src={item.image} 
                                            className="w-5 sm:w-7" 
                                            style={item.style} 
                                        /> 
                                        <div className="text-[8px] sm:text-xs font-semibold">{item.title}</div>
                                    </div>
                                ))}
                            </div>

                            {selectedSeats.length > 0 && (
                                <div className="mt-4 p-2 bg-neutral-800 rounded-md">
                                    <div className="font-semibold mb-1">Selected Seats:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSeats.sort().map(seat => (
                                            <span key={seat} className="px-2 py-1 bg-primary rounded-md text-sm">{seat}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center mt-4">
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={handleBuyClick}
                                    disabled={selectedSeats.length === 0}
                                >
                                    Buy now
                                </button>
                            </div>

                            {showSummary && (
                                <div className="fixed inset-0   bg-opacity-50 backdrop-blur-md  flex items-center justify-center z-50">
                                    <div className="bg-neutral-800 p-6 rounded-md max-w-md w-full">
                                        <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                                        <div className="mb-4">
                                            {selectedShowingId && (
                                                <>
                                                    <div className="font-semibold">Movie: {filteredShowData.find(show => show._id === selectedShowingId)?.movieId?.title || "Unknown"}</div>
                                                    <div className="font-semibold">Cinema: {filteredShowData.find(show => show._id === selectedShowingId)?.cinemaId?.name || "Unknown"}</div>
                                                    <div className="font-semibold">Screen: {filteredShowData.find(show => show._id === selectedShowingId)?.screenName || "Unknown"}</div>
                                                    <div className="font-semibold">Date: {selectedDate ? new Date(selectedDate).toDateString() : "Unknown"}</div>
                                                    <div className="font-semibold">Time: {selectedTimeSlot ? selectedTimeSlot.split("-")[1] : "Unknown"}</div>
                                                </>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <div className="font-semibold">Selected Seats:</div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedSeats.sort().map(seat => (
                                                    <span key={seat} className="px-2 py-1 bg-primary rounded-md">{seat}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="font-semibold">Price:</div>
                                            <div>NPR {calculateTotalPrice()}</div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-6">
                                            <button 
                                                className="btn btn-outline btn-sm"
                                                onClick={() => setShowSummary(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button onClick={() => confirmBuy()} className="btn btn-primary btn-sm">
                                                Confirm Purchase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                /* Disabled Choose Seats section when no date/time selected */
                <div className="w-full sm:w-full bg-neutral-800 rounded-sm py-4 px-6">
                    <div className="flex items-center justify-between opacity-60">
                        <div className="text-xs sm:text-xl font-semibold">2. Choose Seats</div>
                        <div className="text-xs md:text-xl">
                            <FaArrowCircleDown />
                        </div>
                    </div>
                    <div className="text-center py-6 text-sm text-neutral-400">
                        Please select a date and time slot first
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default MovieBookingComponent;