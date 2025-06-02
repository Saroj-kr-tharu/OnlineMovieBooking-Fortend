import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';



const initialState= {
    BookingList: []
};

export const BookingIntial = createAsyncThunk('Booking/getall', async(data) => {
        try {
            console.log('booking data slice => ', data)
            const response = axiosIntance.post('/booking/FinalIntial', data);
            toast.promise(response, {
                loading: 'Booking Intializing...',
                success: 'Sucessfully Booked',
                error: 'Something went wrong '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Booking  Failed');
           
        }
})

export const FindDataByBookingId = createAsyncThunk('Booking/getById', async(data) => {
        try {
            const response = axiosIntance.get(`/booking/findByIDFinalComplete?id=${data}`);
            toast.promise(response, {
                loading: 'Getting Booking Data Intializing...',
                success: 'Sucessfully Get  Book Data ',
                error: 'Something went wrong '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Getting Boking Data  Failed');
           
        }
})




const BookingSlice = createSlice({
    name: 'BookingSlicer',
     initialState,
    extraReducers: (builder) => { 
            builder
            .addCase(BookingIntial.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    
                    
                     if(action.meta.arg.gateway === 'khalti'){
                      
                        window.open(data?.data?.payment_url, '_blank');
                    }
                    else if(action.meta.arg.gateway === 'stripe'){
                    
                        window.open(data?.data, '_blank');

                    }
                }
            })


            // .addCase(FindDataByBookingId.fulfilled, (state,action) => {
            //     if(action?.payload?.data){
            //         const data = action?.payload?.data?.data; 
                    
            //         state.BookingList = data;
                   
            //     }
            // })
            

        }

    
});


export default BookingSlice.reducer;
