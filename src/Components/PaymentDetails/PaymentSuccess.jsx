import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FindDataByBookingId } from '../../redux/Slices/bookingSlice';


function PaymentSuccess() {
    const {data} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookingData, setBookingData] = useState(null);
   

    async function fetchBookingData(id) {
        try {
          
            const res = await dispatch(FindDataByBookingId(id));
            // console.log('from payment success => ', res?.payload?.data?.data);
            
            if (res?.payload?.data?.data) {
                setBookingData(res.payload.data.data);
               
               
            }
        } catch (error) {
            console.error("Error fetching booking data:", error);
        } finally {
           
        }
    }

    useEffect(() => {
        if (data) {
            fetchBookingData(data);
        }
    }, [data]);


    
    const goHome = () => {
        navigate('/');
    };

    

    if (!bookingData) {
        return (
            <div className="max-w-5xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg font-sans text-center">
                <div className="text-red-500 text-xl mb-4">Booking data is not available</div>
                <button 
                    className="flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-gray-100 py-3 px-6 rounded-lg font-medium transition-colors mx-auto"
                    onClick={goHome}
                >
                    <FaHome /> Return to Home
                </button>
            </div>
        );
    }

    return (
        <motion.div 
        whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
            transition={{
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, ease: "easeIn" },
            }}

            
        className="max-w-5xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg font-sans">
            {/* Success Header */}
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FaCheckCircle className="text-white text-4xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600">Your movie tickets have been confirmed.</p>
            </div>

            {/* Ticket Details */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                {/* QR Code */}
                <div className="flex-none md:w-64 flex flex-col items-center">
                    <img 
                        src={bookingData.ticketQRCode} 
                        alt="Ticket QR Code" 
                        className="w-full rounded-lg border border-gray-200 mb-4"
                    />
                    <div className="bg-blue-50 rounded-lg p-3 w-full border-l-4 border-blue-500 flex flex-col items-center">
                        <span className="text-xs font-medium text-gray-500 uppercase mb-1">Your Seats</span>
                        <span className="text-2xl font-semibold text-blue-600">{bookingData.seats.join(", ")}</span>
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="flex-1">
                    <div className="border-b border-gray-200 pb-5 mb-6">
                        <div className='flex gap-x-2'>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            { "Booking Confirmed | "}
                        </h2>
                        <h2 className="text-2xl font-bold text-primary mb-2">
                            { " Ticket will be Sent to Email "}
                        </h2>
                        
                        </div>
                    </div>

                  

                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-indigo-600">
                        <div className="mb-4">
                            <span className="block text-xs text-gray-500 uppercase mb-1">Amount</span>
                            <span className="text-gray-800 font-medium">
                                {bookingData.totalPrice} NPR
                            </span>
                        </div>
                        <div className="mb-4">
                            <span className="block text-xs text-gray-500 uppercase mb-1">Transaction ID</span>
                            <span className="font-mono text-sm tracking-wider text-gray-800">
                                {bookingData._id}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase mb-1">Status</span>
                            <span className="text-green-600 font-semibold">
                                {bookingData.paymentStatus.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button 
                    className="flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-gray-100 py-3 px-6 rounded-lg font-medium transition-colors"
                    onClick={goHome}
                >
                    <FaHome /> Return to Home
                </button>
            </div>
        </motion.div>
    );
}

export default PaymentSuccess;