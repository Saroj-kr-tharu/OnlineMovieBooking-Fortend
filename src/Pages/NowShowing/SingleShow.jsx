import { useLocation } from 'react-router-dom';
import SelectDateSection from '../../Components/NowShowing/MovieBookingComponent';
import MovieDetailsLeft from '../../Components/NowShowing/MovieDetailsLeft';

import Layout from "../../Layout/Layout";
function SingleShow() {
    const {state} = useLocation();


    return(
        <>
        
         <Layout>
            <div className='flex  sm:flex-row flex-col  '>
                    <MovieDetailsLeft data={state} />  
                    <div className='flex ml-10  w-full flex-col'>
                        <div className='text-sm font-semibold px-2 text-primary ml-4 mt-4 '>Now Showing</div>
                        < SelectDateSection  data={state} /> 
                    </div>
            </div>
        </Layout>
        </>
    )
}

export default SingleShow;