import { motion } from "motion/react";
import { useEffect } from "react";
import { MdLocalMovies } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from '../../Components/MovieCard/MovieCard';
import Slider from "../../Components/Slider/Slider";
import Layout from "../../Layout/Layout";
import { getShowByLocation } from '../../redux/Slices/showSlice';
 

function Homepage() {
    const dispatch = useDispatch();
    const LocationShowList = useSelector((state) => state.show.LocationListShow);
    const selectedLocation = useSelector((state) => state.show.selectLocation);
    
    
    
    function loadShowBylocation(){
      if(LocationShowList.length === 0 ){
        dispatch(getShowByLocation(selectedLocation))
      } 
      console.log('show =>',LocationShowList);
    }

    useEffect( ()=> { loadShowBylocation() }, [] )

  return (
    <>
      <Layout>
        <div className='h-full'>
          {" "}
          <div className=''>
            <Slider />{" "}
          </div>
         
        

         <div className="min-h-[60vh] my-10 flex items-start justify-center">
            <div className="w-4/5">   
                  <div className="flex items-center gap-x-2 mb-4" > 
                      <div> <MdLocalMovies className="text-white w-6 h-6" /> </div> 
                      <div className="text-xl capitalize text-primary"> Now Showing </div> 
                  </div>

                 <div className='flex flex-wrap gap-x-2 gap-y-6 px-2'>
                  {
                  // Filter for unique movies by movie ID
                  [...new Map(LocationShowList
                    .filter(item => item?.movieId) 
                    .map(item => [item.movieId._id || item.movieId.title, item]))
                    .values()]
                  .map((item, index) => (
                    
                    <motion.div
                      whileInView={{ y: 0, opacity: 1 }}
                      initial={{ y: 100, opacity: 0 }}
                      transition={{
                        y: { duration: 0.5, ease: "easeIn" },
                        opacity: { duration: 0.5, ease: "easeIn" },
                      }}
                      viewport={{ once: true }}
                      className="w-[48%] sm:w-[48%] md:w-[32%] lg:w-[19%]" 
                      key={item?.movieId?._id || item?.movieId?.title || index}
                    >
                      <MovieCard data={item.movieId} />
                    </motion.div> 
                  ))
                  }
                </div>

              </div>
         </div>
           
        </div>
      </Layout>
    </>
  );
}

export default Homepage;
