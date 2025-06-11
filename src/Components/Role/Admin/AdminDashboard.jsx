
import { MdConfirmationNumber, MdEventAvailable, MdMovie } from "react-icons/md";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonutChartCard from '../../DashboardCompnent/DonutChartCard';
import InfoCard from "../../DashboardCompnent/InfoCard";

import { getAllShow } from '../../../redux/Slices/showSlice';
 
function AdminDashboard(){

     const MovieList = useSelector(state => state.movie.movieList);
     const ShowList = useSelector(state => state.show.showList);
     const CinemaList = useSelector(state => state.cinema.cinemaList);

     const dispatch = useDispatch()
     const [totalSeat, setTotalSeat] = useState(null)
     const [totalLocation, settotalLocation] = useState(null)
     const [totalBook, setTotalBook] = useState(null)
     const [totalAvaiable, setTotalAvailable] = useState(null)

     
         function loadCinemaMovie(){
          if (ShowList.length === 0) {
             dispatch(getAllShow());
         }
        }
      useEffect(() => { loadCinemaMovie() }, [] )



useEffect(() => {
    const unique_locations = [...new Set(CinemaList.map(cinema => cinema.location))];
    settotalLocation(unique_locations);
}, [CinemaList]);


useEffect(()=> {
    
    const total_seats = ShowList.reduce((total, show) => {
        return total + show.seats.length;
    }, 0);
    
        const total_seat_soldout = ShowList.reduce((total, show) => {
        const soldOutSeats = show.seats.filter(seat => seat.status === "SoldOut");
        return total + soldOutSeats.length;
    }, 0);
    
    setTotalSeat(total_seats)
    setTotalBook(total_seat_soldout)
    setTotalAvailable(totalSeat-total_seat_soldout || 0)

}, [ShowList])


 const DonotChartData = [
    {
        'label': ['Cinema', 'Location', 'Available'],
        'title': 'Cinema Overview', 
        value: [[CinemaList.length, totalLocation?.length, totalAvaiable]],  
        color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)']
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
    'label': ['Movie', 'Shows', 'Seats', 'Booking', 'Available', 'Cinema', 'TotalRevenue ', 'Total Location'],
    'title': 'Chart Analysis', 
    value: [[MovieList.length, ShowList.length, totalSeat, totalBook, totalAvaiable, CinemaList.length, totalBook, totalLocation?.length ]], 
    color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)', 'rgb(34, 197, 94)', 'rgb(239, 68, 68)']
},
]

    const data = [
        {title: 'Total Cinema', value: CinemaList.length, icon: <MdMovie size={40} />},
        {title: 'Total Renuve', value: totalBook*300, icon: <MdEventAvailable size={40} />},
        {title: 'Total Location', value: totalLocation?.length, icon: <MdConfirmationNumber size={40} />},
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
           

            <div id="overview" className="flex flex-col gap-y-0">
                <div> <h2 className="text-2xl font-bold text-primary border-b-2 ">Overview</h2> </div>
                <div className="flex mt-4  w-full  flex-row justify-baseline sm:justify-center">
                {
                    data.map( (item, index) => {
                        return <InfoCard key={index} data={item} /> 
                    } )
                }
            </div>


              <div className="text-2xl mt-4 border-b-2 text-primary font-semibold" >  Chart Analysis  </div>
                    <div className="flex sm:flex-row flex-col justify-center ">
                        {
                        mainChartAnalysis.map((item, index) => {
                            return (
                                <div key={index} id={`char_basic_donut_${index}`} className="w-full  h-80 mt-6">
                                    <DonutChartCard chartdata={item} />
                                </div>
                            )
                        })
                    }
                </div>

              <div className="text-2xl mt-4 border-b-2 text-primary font-semibold" >  Chart Overview  </div>
              <div className="flex sm:flex-row flex-col justify-center ">
                    {
                    DonotChartData.map((item, index) => {
                        return (
                            <div key={index} id={`char_basic_donut_${index}`} className="w-full  h-80 mt-6">
                                <DonutChartCard chartdata={item} />
                            </div>
                        )
                    })
                }
              </div>


            </div>
            
          
        </motion.div>
    )
}

 
export default AdminDashboard