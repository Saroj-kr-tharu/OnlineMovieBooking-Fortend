import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import SelectDateSection from '../../Components/NowShowing/MovieBookingComponent';
import MovieDetailsLeft from '../../Components/NowShowing/MovieDetailsLeft';
import Layout from "../../Layout/Layout";

function SingleShow() {
    const {state} = useLocation();
    

    return(
        <>
        
         <Layout>
            <div className='flex flex-col sm:flex-row  overflow-x-hidden    '>

                    <motion.div 
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    transition={{
                        x: { duration: 0.5, ease: "easeIn" },
                        opacity: { duration: 0.5, ease: "easeIn" },
                    }}
                    viewport={{ once: true }}
                    className=' w-full sm:w-1/4 sm:mt-6 '> <MovieDetailsLeft data={state} />   </motion.div>
                    

                    <motion.div 
                     whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{
                        x: { duration: 0.5, ease: "easeIn" },
                        opacity: { duration: 0.5, ease: "easeIn" },
                    }}
                    viewport={{ once: true }}

                    className='flex ml-4  w-full flex-col'>
                        <div className='text-sm font-semibold px-2 text-primary ml-4 mt-4 '>Now Showing</div>
                        < SelectDateSection  data={state} /> 
                    </motion.div>
            </div>
        </Layout>
        </>
    )
}

export default SingleShow;