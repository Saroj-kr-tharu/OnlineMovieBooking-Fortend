import { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import seats from '../../assets/seats.png';
import './curveDisplay.css';

import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MovieBookingComponent({data}) {
    const LocationListShow = useSelector(state => state.show.LocationListShow);
    const navigate = useNavigate();
    const [filteredShowData, setFilteredShowData] = useState([]);

    useEffect(function() {
        if(LocationListShow.length > 0) {
            const filteredShows = LocationListShow.filter(item => item.movieId.title === data?.Movie);
            setFilteredShowData(filteredShows);
            console.log('Filtered Shows => ', filteredShows);
        }
    }, [LocationListShow, data]);

    // Extract date from the filtered data
    const getShowDate = () => {
        if (filteredShowData && filteredShowData[0]?.showTime?.length > 0) {
            return new Date(filteredShowData[0].showTime[0]);
        }
        return null;
    }; 
 
    const showDate = getShowDate();
    const showDay = showDate?.getDate();
    const showMonth = showDate ? showDate.toLocaleString('default', { month: 'short' }).toLowerCase() : '';
    const showDayName = showDate ? showDate.toLocaleString('default', { weekday: 'short' }) : '';

    // Date section states
    const [isDateSectionCollapsed, setIsDateSectionCollapsed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(filteredShowData?.[0]?.cinemaId?.name || "All");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    
    // Seats section states 
    const [isSeatsCollapsed, setIsSeatsCollapsed] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [seatMap, setSeatMap] = useState({});

    // Process seats from API data
    useEffect(() => {
        if (filteredShowData && filteredShowData[0]?.seats) {
            const newSeatMap = {};
            filteredShowData[0].seats.forEach(seat => {
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
        }
    }, [filteredShowData]);

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
        const defaultPrice = 380;
        return selectedSeats.length * (filteredShowData?.[0]?.seats?.[0]?.price || defaultPrice);
        };

    const handleBuyClick = () => {
        setShowSummary(true);
       
    };

    function confirmBuy(){
        console.log('filterShowData => ', filteredShowData)
         const data = {
            movieLeft: {Movie: filteredShowData[0].movieId.title} ,
            filteredShowData: filteredShowData,
            Date: selectedDate,
            cinema: selectedCinema,
            seats: selectedSeats,
            Language: selectedLanguage,
            Time: selectedTimeSlot,
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
        className="flex flex-col gap-y-4">
            {/* Date Selection Section */}
            <div className={`w-4/5 sm:w-full ${!isDateSectionCollapsed ? 'bg-neutral-700' : ''} rounded-sm py-4 px-6`}>
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
                                {showDate ? (
                                    <>
                                        <div className="text-[10px]">{showDate.toDateString()}</div>
                                        <div className="mt-1 flex gap-4">
                                            <div 
                                                className={`flex w-10 hover:cursor-pointer hover:bg-primary hover:border-primary flex-col items-center border-1 rounded-sm btn-xs ${selectedDate !=null ? "bg-primary border-primary" : "btn-primary"} space-y-[-2px]`}
                                               onClick={() => {
                                                    if (showDate) {
                                                        const year = showDate.getFullYear();
                                                        const month = String(showDate.getMonth() + 1).padStart(2, '0');
                                                        const day = String(showDate.getDate()).padStart(2, '0');
                                                        setSelectedDate(`${year}-${month}-${day}`);
                                                    }
                                                    }}
                                                     > 
                                                <span className="text-[10px] opacity-80">{showMonth}</span>    
                                                <span className="text-base font-bold">{showDay}</span>    
                                                <span className="text-[10px] opacity-80">{showDayName}</span>    
                                            </div>
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
                                    className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${selectedCinema === "All" ? "bg-primary" : "bg-neutral-800"}`}
                                    onClick={() => setSelectedCinema("All")}
                                >
                                    All
                                </div>
                                {filteredShowData?.map((show, index) => (
                                    <div 
                                        key={index}
                                        className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-[10px] hover:btn-primary ${selectedCinema === show.cinemaId.name ? "bg-primary" : "bg-neutral-800"}`}
                                        onClick={() => setSelectedCinema(show.cinemaId.name)}
                                    >
                                        {show.cinemaId.name}
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
                            {filteredShowData?.map((show, index) => (
                                <div key={index} id="wrapper" className="flex flex-col sm:flex-row gap-y-3 sm:gap-x-8">
                                    <div className="text-xs uppercase">
                                        <div className="font-semibold">{show.cinemaId.name}</div>
                                        <div className="text-yellow-400 font-semibold">(Screen: {show.screenName})</div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        {show.showTime.map((time, idx) => {
                                            
                                            const timeObj = new Date(time);
                                           
                                            const formattedTime = timeObj.toISOString().substr(11, 5);
                                            const timeSlotId = `${show.cinemaId.name}-${formattedTime}`;
                                           
                                            
                                            return (
                                                <div key={idx} className="indicator indicator-xs group">
                                                    <span className="indicator-item indicator-bottom indicator-center badge badge-secondary badge-xs uppercase">2D</span>
                                                    <button 
                                                        className={`btn btn-xs ${selectedTimeSlot === timeSlotId ? "btn-success" : "btn-primary group-hover:btn-success"}`}
                                                        onClick={() => setSelectedTimeSlot(timeSlotId)}
                                                    >
                                                        {formattedTime}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Seats Selection Section - Only show interactive version if date and time are selected */}
            {selectedDate && selectedTimeSlot && selectedCinema !== "All"  ? (
                <div className={`w-4/5 sm:w-full ${!isSeatsCollapsed ? 'bg-neutral-700' : ''} rounded-sm py-4 px-6`}>
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
                                <div className="w-1/2">
                                    <div className="curved-divider"></div>
                                </div>
                            </div>

                            <div id="seats" className="flex flex-col gap-y-4">
                                <div className="flex justify-center border-b-2 border-primary">
                                    <div className="uppercase text-xs font-semibold">
                                        {filteredShowData && filteredShowData[0]?.seats?.[0]?.price 
                                            ? `Platinum NPR ${filteredShowData[0].seats[0].price}` 
                                            : 'Platinum NPR 380'}
                                    </div>
                                </div>

                                <div id="seats-layout" className="flex flex-col gap-y-2">
                                    {Object.keys(seatMap).map(row => (
                                        <div key={row} className="flex">
                                            <div>{row}</div>
                                            <div className="ml-10 flex gap-x-2">
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
                                    
                                    {/* If no seats are available from API, show dummy seats */}
                                    {Object.keys(seatMap).length === 0 && (
                                        <>
                                            <div className="flex">
                                                <div>A</div>
                                                <div className="ml-10 flex gap-x-2">
                                                    {[1, 2, 3, 4].map((seatNumber) => (
                                                        <img  
                                                            key={`A${seatNumber}`}
                                                            src={seats} 
                                                            className="w-6 sm:w-8 hover:cursor-pointer" 
                                                            style={getSeatStyle('A', seatNumber)} 
                                                            onClick={() => handleSeatClick('A', seatNumber, "Available")}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div>B</div>
                                                <div className="ml-10 flex gap-x-2">
                                                    {[1, 2, 3, 4].map((seatNumber) => (
                                                        <img  
                                                            key={`B${seatNumber}`}
                                                            src={seats} 
                                                            className="w-6 sm:w-8 hover:cursor-pointer" 
                                                            style={getSeatStyle('B', seatNumber)} 
                                                            onClick={() => handleSeatClick('B', seatNumber, "Available")}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
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
                                    <div className="flex gap-2">
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
                                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                    <div className="bg-neutral-800 p-6 rounded-md max-w-md w-full">
                                        <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                                        <div className="mb-4">
                                            <div className="font-semibold">Movie: {filteredShowData?.[0]?.movieId?.title || "Unknown"}</div>
                                            <div className="font-semibold">Cinema: {selectedCinema !== "All" ? selectedCinema : filteredShowData?.[0]?.cinemaId?.name || "Unknown"}</div>
                                            <div className="font-semibold">Date: {showDate ? showDate.toDateString() : "Unknown"}</div>
                                            <div className="font-semibold">Time: {selectedTimeSlot ? selectedTimeSlot.split("-")[1] : "Unknown"}</div>
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
                                            <div>NPR {selectedSeats.length * (filteredShowData?.[0]?.seats?.[0]?.price || 380)}</div>
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
                <div className="w-4/5 sm:w-full bg-neutral-800 rounded-sm py-4 px-6">
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