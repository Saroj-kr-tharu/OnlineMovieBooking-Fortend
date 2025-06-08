import esewa_logo from '../../assets/esewa-logo.jpg';
import khalti_logo from '../../assets/khalti_logo.png';
import stripe_logo from '../../assets/stripe-logo.png';
 
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BookingIntial } from '../../redux/Slices/bookingSlice';

function PaymentDetail({data}) { 
    useEffect(function() { console.log('received data => ', data) }, [])
    const dispatch = useDispatch();

    const gatewayPayment = [
        {image:esewa_logo, title:'esewa', alt:'esewa'},
        {image:khalti_logo, title:'khalti', alt:'khalti'},
        {image:stripe_logo, title:'stripe', alt:'stripe'},
    ];

    // Create and submit a form programmatically 
        const submitPayment = (paymentData) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
        form.target = '_blank'; // Opens in new tab
        
        // Add all required fields
        Object.keys(paymentData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = paymentData[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        };

    async function handlePayment(gateway){ 
        const finalData = {
        location: data?.filteredShowData?.[0]?.cinemaId?.location || 'Unknown', 
        cinema: data.cinema,
        movie: data.movieLeft.Movie, 
        screens: data?.filteredShowData?.[0]?.screenName || 'Unknown',
        seats: data.seats,
        Date: data.Date,
        Time: data?.Time || 'Unknown',
        gateway,
        userEmail: localStorage.getItem('email') || null,
    }

        console.log('final data  => ', finalData)
       const response = await dispatch(BookingIntial(finalData));
       if(gateway === 'esewa'){
           console.log('response => ', response?.payload?.data?.data?.data);
           let data1 =  response?.payload?.data?.data?.data;
           let finalDataesewa = {
            amount: data?.TotalPrice, 
            tax_amount: 0,
            total_amount:data?.TotalPrice ,
            transaction_uuid: data1.transactionId,  
            product_code: 'EPAYTEST' ,
            product_service_charge: 0,
            product_delivery_charge: 0, 
            success_url: 'http://156.67.110.130:9000/payment/complete-payment',
            failure_url: "https://developer.esewa.com.np/failure", 
            signed_field_names:  "total_amount,transaction_uuid,product_code", 
            signature: data1.hash.signature,
            secret: "8gBm/:&EnhH.1/q",
           }
           submitPayment(finalDataesewa)
        //    dispatch(ESEWAForm_Intialize(finalDataesewa));
       }
    }

    // Helper function to format date
    const formatDate = (dateString) => {
    // Parse the YYYY-MM-DD format
    const date = new Date(dateString);
    
    return {
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate(), // Get the day component from the date
        dayOfWeek: date.toLocaleString('default', { weekday: 'short' })
    };
};

    // Format the date if available
    const formattedDate = data?.Date ? formatDate(data.Date) : null;
    
    return(

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
        className={` w-4/5 sm:w-full  bg-neutral-700 rounded-sm py-4 px-6`}>
            <div 
                id="headerSection" 
                className={`flex text-xs md:text-xl font-semibold hover:cursor-pointer items-center justify-between}`}
            >   
                <div>3. Payment | Checkout </div>    
            </div>
            <>
                {/* Movie Title */}
                <div id="movieTitle" className="mt-4">
                    <div className="text-sm text-neutral-400 font-semibold">Movie</div>
                    <div className="text-lg font-bold text-white mt-1">
                        {data?.movieLeft?.Movie || 'Movie Title'}
                    </div>
                </div>

                <div id="selectDate" className="mt-4">
                    <div className="text-sm text-neutral-400 font-semibold">Selected date</div>
                    <div> 
                        <div className="mt-1 flex gap-4">
                        {formattedDate && (
                            <div 
                                className={`flex w-12 hover:cursor-pointer bg-primary border-primary flex-col items-center border-1 rounded-sm btn-xs space-y-[-2px]`}
                            > 
                                <span className="text-xs opacity-80">{formattedDate.month}</span>    
                                <span className="text-xl font-bold">{formattedDate.day}</span>    
                                <span className="text-xs opacity-80">{formattedDate.dayOfWeek}</span>    
                            </div>
                        )}
                        </div>    
                    </div>
                </div>

                <div id="selectLanguage" className="mt-4">
                    <div className="text-sm text-neutral-400 capitalize font-semibold">Selected Language</div>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2 text-sm">
                        <div 
                            className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-sm hover:btn-primary bg-primary`}
                        >
                            {data?.Language || 'Hindi'}
                        </div>
                    </div>
                </div>

                <div id="selectedSeats" className="mt-4">
                    <div className="text-sm text-neutral-400 capitalize font-semibold">Selected Seats</div>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2 text-sm">
                        {data?.seats && data.seats.map(seat => (
                            <div key={seat}
                                className={`px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-primary text-sm hover:btn-primary bg-primary`}
                            >
                                {seat}
                            </div>
                        ))}
                    </div>
                </div>

                <div id="cinema-with-time-table" className="mt-4 flex flex-col gap-y-8">
                    <div id="wrapper" className="flex flex-row gap-x-3 sm:gap-x-8">
                        <div className="text-sm uppercase">
                            <div className="font-semibold">{data?.cinema || 'Cinema'}</div>
                            <div className="text-yellow-400 font-semibold">({data?.Language?.charAt(0) || 'Hin'})</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            <div className="indicator indicator-xs group">
                                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary badge-xs uppercase">2D</span>
                                <button 
                                    className={`btn btn-xs text-sm btn-success`}
                                >
                                    {data?.Time ? data.Time.split('-')[1]?.trim() : ''}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="totalPrice" className="mt-4">
                    <div className="text-sm text-neutral-400 capitalize font-semibold">Total Price</div>
                    <div className="text-xl font-bold text-green-500 mt-1">
                        Rs. {data?.TotalPrice || 0}
                    </div>
                </div>

                <div id="select Payment Gateway" className="mt-6">
                    <div className="text-sm text-neutral-400 capitalize font-semibold">Choose Payment Gateway </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2 text-xs">
                        {gatewayPayment.map((item) => (
                            <button key={item.title}
                                className={`flex items-center justify-center overflow-hidden px-4 py-3 rounded-md hover:cursor-pointer transition-all btn bg-white shadow-md`}
                                onClick={() => handlePayment(item.title)}
                            >
                                <img className='w-18 sm:w-20 h-auto object-contain' src={item.image} alt={item.alt} /> 
                            </button>
                        ))}
                    </div>
                </div>
            </>
        </motion.div>
    );
}

export default PaymentDetail;