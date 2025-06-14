
import { MdConfirmationNumber, MdEventAvailable, MdEventSeat, MdMovie } from "react-icons/md";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonutChartCard from '../../DashboardCompnent/DonutChartCard';
import InfoCard from "../../DashboardCompnent/InfoCard";


function ModeratorDashboard(){

     const MovieList = useSelector(state => state.movie.movieList);
     const ShowList = useSelector(state => state.show.showList);
     const [totalSeat, setTotalSeat] = useState(null)
     const [totalBook, setTotalBook] = useState(null)
     const [totalAvaiable, setTotalAvailable] = useState(null)

     useEffect(()=> {
    console.log('Total Show list => ',ShowList);
    
    const total_seats = ShowList.reduce((total, show) => {
        return total + show.seats.length;
    }, 0);
    
        const total_seat_soldout = ShowList.reduce((total, show) => {
        const soldOutSeats = show.seats.filter(seat => seat.status === "SoldOut");
        return total + soldOutSeats.length;
    }, 0);
    
    setTotalSeat(total_seats)
    setTotalBook(total_seat_soldout)
    setTotalAvailable(total_seats-total_seat_soldout || 0)

}, [ShowList])

 const DonotChartData = [
    {
        'label': ['Movies', 'Shows'],
        'title': 'Movie Overview', 
        value: [[MovieList.length, ShowList.length]],  
        color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
    },

    

     {
        'label': ['Total Shows', 'SoldOut', 'Total Seat', 'Avaiable Seat'],
        'title': 'Booking Overview', 
        value: [[ ShowList.length, totalBook, totalSeat, totalAvaiable]], 
        color: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
    },
]

const mainChartAnalysis =  [ 
     {
        'label': ['Movie', 'Shows', 'Seats', 'Booking', 'Available'],
        'title': 'Chart Analysis', 
        value: [[MovieList.length, ShowList.length, totalSeat, totalBook, totalAvaiable ]], 
        color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
    },
]

    const data = [
        {title: 'Total Movie', value: MovieList.length, icon: <MdMovie  />},
        {title: 'Total Show', value: ShowList.length, icon: <MdEventAvailable  />},
        {title: 'Total Booking', value: totalBook, icon: <MdConfirmationNumber  />}, 
       {title: 'Total Available Seats', value: totalAvaiable, icon: <MdEventSeat />},
    ]

    return(
          <motion.div
        whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}

           
        >
           

            <div id="overview" className="flex w-full flex-col gap-y-0 overflow-x-hidden">
                <div> <h2 className="text-2xl font-bold text-primary border-b-2 ">Overview</h2> </div>
                
              <div className="flex flex-wrap mt-4 w-full justify-center gap-2">
    {
        data.map((item, index) => {
            return (
                <motion.div
                    key={index}
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: index < 2 ? -100 : 100, opacity: 0 }}
                    transition={{
                        x: { duration: 1, ease: "easeIn" },
                        opacity: { duration: 1, ease: "easeIn" },
                    }}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.5rem)] md:w-60 max-w-xs"
                >
                    <InfoCard data={item} /> 
                </motion.div>
            )
        })
    }
</div>


              <div className="text-2xl mt-4 border-b-2 text-primary font-semibold" >  Chart Analysis  </div>
                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: 100, opacity: 0 }}
                        transition={{
                        x: { duration: 1, ease: "easeIn" },
                        opacity: { duration: 1, ease: "easeIn" },
                        }} className="flex sm:flex-row flex-col justify-center ">
                        {
                        mainChartAnalysis.map((item, index) => {
                            return (
                                <div key={index} id={`char_basic_donut_${index}`} className="w-full  h-80 mt-6">
                                    <DonutChartCard chartdata={item} />
                                </div>
                            )
                        })
                    }
                    </motion.div>

                    <div className="text-2xl mt-4 border-b-2 text-primary font-semibold" >  Chart Overview  </div>
                    <div className="flex sm:flex-row flex-col justify-center  ">
                   {
                        DonotChartData.map((item, index) => {
                            return (
                                <motion.div
                                    whileInView={{ x: 0, opacity: 1 }}
                                    initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
                                    transition={{
                                        x: { duration: 1, ease: "easeIn" },
                                        opacity: { duration: 1, ease: "easeIn" },
                                    }} 
                                    key={index} id={`char_basic_donut_${index}`} 
                                    
                                    className="w-full  h-80 mt-6">
                                    <DonutChartCard chartdata={item} />
                                </motion.div>
                            )
                        })
                    }
              </div>


            </div>
            
          
        </motion.div>
    )
}

 
export default ModeratorDashboard