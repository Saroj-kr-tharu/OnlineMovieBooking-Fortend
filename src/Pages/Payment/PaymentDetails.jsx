import { useLocation } from 'react-router-dom';
import MovieDetailsLeft from '../../Components/NowShowing/MovieDetailsLeft';
import PaymentDetail from "../../Components/PaymentDetails/PaymentDetail";
import Layout from "../../Layout/Layout";

function PaymentDetails() {
    const {state} = useLocation();

    

    return(
       <>
         <Layout>
            <div className='flex sm:flex-row flex-col overflow-x-hidden'>
                <MovieDetailsLeft data={state.movieLeft} /> 
                <div className='flex ml-10 w-full flex-col'>
                    <div className='text-sm font-semibold px-2 text-primary ml-4 mt-4'>Payment Details</div>
                    <PaymentDetail data={state} />  
                </div>
            </div>
        </Layout>
        </>
    )
}

export default PaymentDetails;