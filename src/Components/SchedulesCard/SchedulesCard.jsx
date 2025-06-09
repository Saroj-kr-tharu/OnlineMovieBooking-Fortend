import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function SchedulesCard({data}) {
    
    const navigate = useNavigate();

    // Early return if data is undefined
    if (!data) return <div className="p-4">No schedule data available</div>;
    
    // Format dates and times from allShowTimes or showTime array
   const formatSchedules = () => {
    // Use allShowTimes if available, otherwise fall back to showTime
    const showtimes = data.allShowTimes || data.showTime;
    if (!showtimes || !showtimes.length) return [];
    
    // Group showtimes by date
    const groupedByDate = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    showtimes.forEach(timestamp => {
        const dateObj = new Date(timestamp);
        const dateToCheck = new Date(dateObj);
        dateToCheck.setHours(0, 0, 0, 0); // Set to beginning of the day
        
        // Skip past dates
        if (dateToCheck < today) return;
        
        // Calculate days from today
        const diffDays = Math.round((dateToCheck - today) / (1000 * 60 * 60 * 24));
        
        // Only include dates within the next 7 days
        if (diffDays >= 0 && diffDays < 7) {
            const dateKey = dateObj.toDateString();
            
            // Format time correctly with hours and minutes from UTC values
            const hours = dateObj.getUTCHours();
            const minutes = dateObj.getUTCMinutes();
            
            // Format time in 12-hour format with AM/PM
            let hour = hours % 12;
            hour = hour ? hour : 12; // Convert 0 to 12
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const timeString = `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            
            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = {
                    date: dateObj,
                    times: []
                };
            }
            
            // Avoid duplicate times for the same date
            if (!groupedByDate[dateKey].times.includes(timeString)) {
                groupedByDate[dateKey].times.push(timeString);
            }
        }
    });
    
    // Convert to array sorted by date
    return Object.values(groupedByDate).sort((a, b) => a.date - b.date);
};
    
    const schedules = formatSchedules();
    
    // Helper to format date display
    const formatDateDisplay = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);
        
        const diffDays = Math.round((dateToCheck - today) / (1000 * 60 * 60 * 24));
        
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        if (diffDays === 0) {
            return {
                dayLabel: 'TODAY',
                dateLabel: `${months[date.getMonth()]} ${date.getDate()}${getDaySuffix(date.getDate())}`
            };
        }
        
        return {
            dayLabel: days[date.getDay()],
            dateLabel: `${months[date.getMonth()]} ${date.getDate()}${getDaySuffix(date.getDate())}`
        };
    };
    
    // Get suffix for day (1st, 2nd, 3rd, etc)
    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'TH';
        switch (day % 10) {
            case 1:  return 'ST';
            case 2:  return 'ND';
            case 3:  return 'RD';
            default: return 'TH';
        }
    };

    function handleDate(time, date){
    // Convert time from "2:48 PM" format to "14:48" format
    let [hourMin, ampm] = time.split(' ');
    let [hours, minutes] = hourMin.split(':');
    
    // Convert hours to 24-hour format
    hours = parseInt(hours);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    // Format time as "HH:MM"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
    
    const selectObj = {
        Movie: data?.movieId?.title,
        selectedDate: date.toISOString(), // Convert date to ISO string
        seletectTime: formattedTime,
        selectedCinema: data?.cinemaId?.name || null,
    }
    
    console.log('selected date => ', selectObj);
    navigate('/nowShowing', {state: selectObj});
}

    function handleClick(){
        const finalData = {
            Movie: data?.movieId?.title
        }
  
        navigate('/nowShowing', {state: finalData});
    }
    
    return(
        <motion.div id="wrapper" className="flex flex-col md:flex-row rounded-2xl hover:cursor-pointer px-3 sm:px-4 py-4 sm:py-6 w-full bg-neutral shadow-lg">
            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{
                    x: { duration: 0.5, ease: "easeIn" },
                    opacity: { duration: 0.5, ease: "easeIn" },
                }}
                id="left-side-container" className="flex w-full md:w-[30%] pr-0 md:pr-4 border-b md:border-b-0 pb-4 md:pb-0 mb-4 md:mb-0">
                {/* Movie Poster */}
                <div className="w-1/3 sm:w-2/5 md:w-2/3 h-auto">
                    <img
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    src={data.movieId?.image}
                    alt={data.movieId?.title} />
                </div>

                {/* Movie Details */}
                <div className="w-2/3 sm:w-3/5 md:w-2/3 pl-3 sm:pl-4 gap-y-1 sm:gap-y-2 flex flex-col justify-start">
                    <h2 className="card-title text-base sm:text-xl font-bold capitalize line-clamp-2">{data.movieId?.title}</h2>
                    
                    <div className="flex gap-x-2 mt-0.5 sm:mt-1"> 
                        <div className="badge badge-secondary px-1.5 sm:px-2 py-1.5 sm:py-2 text-[10px] sm:text-xs">PG</div>    
                        <div className="badge badge-primary px-1.5 sm:px-2 py-1.5 sm:py-2 text-[10px] sm:text-xs">{data.movieId?.duration} min</div>    
                    </div>
                    
                    <div className="text-[10px] sm:text-xs w-full text-justify overflow-hidden line-clamp-3 sm:line-clamp-5 mt-0.5 sm:mt-1">
                        {data.movieId?.description}
                    </div>

                    <div className="card-actions justify-start mt-1 sm:mt-2">
                        <button onClick={() => handleClick()} className="btn btn-xs btn-primary px-2 sm:px-3 text-[10px] sm:text-xs">More Info</button>
                    </div>
                </div>
            </motion.div>
            
            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 100, opacity: 0 }}
                transition={{
                    x: { duration: 0.5, ease: "easeIn" },
                    opacity: { duration: 0.5, ease: "easeIn" },
                }}
                id="right-side" className="w-full md:w-[70%] pl-0 md:pl-4">
                
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Choose Date & Time</h3>
                
                {/* Horizontally scrollable date and time section */}
                <div className="flex overflow-x-auto no-scrollbar pb-2 gap-1">
                    {schedules.slice(0, 7).map((schedule, index) => {
                        const dateInfo = formatDateDisplay(schedule.date); 
                        const isToday = dateInfo.dayLabel === 'TODAY';
                        
                        return (
                            <div key={index} className="flex-shrink-0 min-w-[100px] xs:min-w-[110px] sm:min-w-[120px] max-w-[130px]">
                                {/* Date header */}
                                <div className={`
                                    rounded-t-md p-1.5 sm:p-2 text-center border-t border-l border-r 
                                    ${isToday ? 'bg-primary text-white' : 'bg-base-200'}
                                `}>
                                    <div className="font-bold text-xs sm:text-sm">{dateInfo.dayLabel}</div>
                                    <div className="text-[10px] sm:text-xs">{dateInfo.dateLabel}</div>
                                </div>
                                
                                {/* Time slots section */}
                                <div className={`
                                    p-1.5 sm:p-2 rounded-b-md border-white border-b border-l border-r
                                    ${isToday ? 'border-primary bg-primary/5' : 'border-base-300'}
                                `}>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        {schedule.times.map((time, timeIndex) => (
                                            <button 
                                                onClick={() => handleDate(time, schedule.date)}
                                                key={`time-${timeIndex}`}
                                                className={`
                                                    btn btn-xs h-7 w-full hover:bg-primary text-center justify-center text-[10px] sm:text-xs
                                                    ${isToday ? 'btn-primary hover:bg-slate-700' : 'btn-outline'}
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SchedulesCard;