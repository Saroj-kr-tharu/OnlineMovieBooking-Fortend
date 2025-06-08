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
        
        showtimes.forEach(timestamp => {
            const dateObj = new Date(timestamp);
            const dateKey = dateObj.toDateString();
            
            // Format time correctly with hours and minutes from UTC values
            const hours = dateObj.getUTCHours();
            const minutes = dateObj.getUTCMinutes();
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
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
        });
        
        // Convert to array sorted by date
        return Object.values(groupedByDate).sort((a, b) => a.date - b.date);
    };
    
    const schedules = formatSchedules();
    
    // Helper to get day display name
    const getDayName = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);
        
        const diffDays = Math.round((dateToCheck - today) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    };

    function handleDate(time, date){
        // console.log('Movie Title:', data?.movieId?.title);
        // console.log('Selected Date:', date.toLocaleDateString());
        // console.log('Selected Time:', time);

       const seletectObJ = {
    Movie: data?.movieId?.title,
    selectedDate: date || null , 
    seletectTime: time || null ,
    selectedCinema: data?.cinemaId?.name  || null, 
}

        console.log('selected date => ', seletectObJ)
        //   navigate('/nowShowing', {state:  seletectObJ});
    }

    function handleClick(){
        const finalData = {
            Movie: data?.movieId?.title
        }
 
        navigate('/nowShowing', {state: finalData});
    }
    
    return(
        <motion.div  onClick={() => handleClick()} id="wrapper" className="flex flex-col md:flex-row rounded-2xl hover:cursor-pointer px-4 py-6 w-full bg-neutral shadow-lg">
            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{
                    x: { duration: 0.5, ease: "easeIn" },
                    opacity: { duration: 0.5, ease: "easeIn" },
                }}
                id="left-side-container" className="w-full md:w-[30%] pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-base-300 flex gap-x-4 pb-4 md:pb-0 mb-4 md:mb-0 card-side">
                {/* Movie Poster */}
                <div className="w-1/3 sm:w-2/3 min-h-48 md:min-h-64">
                    <img
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    src={data.movieId?.image}
                    alt={data.movieId?.title} />
                </div>

                {/* Movie Details */}
                <div className="w-2/3 gap-y-2 flex flex-col justify-start">
                    <h2 className="card-title text-xl font-bold capitalize">{data.movieId?.title}</h2>
                    
                    <div className="flex gap-x-2 mt-1"> 
                        <div className="badge badge-secondary px-2 py-2 text-xs">PG</div>    
                        <div className="badge badge-primary px-2 py-2 text-xs">{data.movieId?.duration} min</div>    
                    </div>
                    
                    <div className="text-xs w-full text-justify overflow-hidden line-clamp-5 mt-1">
                        {data.movieId?.description}
                    </div>

                    <div className="card-actions justify-start mt-2">
                        <button onClick={() => handleClick()} className="btn btn-xs btn-primary px-3">More Info</button>
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
                {/* Days row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
                    {schedules.map((schedule, index) => (
                        <div key={index} className="flex flex-col items-center p-2 hover:bg-base-300 rounded-lg transition-colors duration-200">
                            {/* Day of week */}
                            <div className="uppercase font-bold text-sm mb-1">
                                {getDayName(schedule.date)}
                            </div>
                            
                            {/* Date */}
                            <div className="text-xs uppercase mb-1">
                                {schedule.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            
                            {/* Language */}
                            <div className="badge badge-primary mb-2 text-xs">English</div>
                            
                            {/* Time */}
                            <div className="flex flex-col gap-1 w-full"> 
                                {schedule.times.map((time, timeIndex) => (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            handleDate(time, schedule.date);
                                        }}
                                        key={`time-${timeIndex}`} 
                                        className="btn btn-xs btn-outline btn-secondary w-full"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SchedulesCard;