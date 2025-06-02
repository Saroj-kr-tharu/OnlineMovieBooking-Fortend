import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';

const initialState= {
    cinemaList: []
};

export const createCinema = createAsyncThunk('cinema/create', async(data) => {
        try {

            const response = axiosIntance.post('/booking/createCinema',data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Creating Cinema...',
                success: 'Created Cinema Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
            // console.log('status => ', result.status);

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Created Cinema');
           
        }
})

export const getAllCinema = createAsyncThunk('cinema/getAll', async() => {
        try {

            const response = axiosIntance.get('/booking/cinemas');
            toast.promise(response, {
                loading: 'Getting All Cinema...',
                success: 'Get All Cinema Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;

             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Getall Cinema');
           
        }
})


export const deleteCinema = createAsyncThunk('cinema/delete', async(data) => {
        try {
            console.log('data => ', data);
            const response = axiosIntance.delete(`/booking/deleteCinema?id=${data}`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Deleting cinema...',
                success: 'Deleted cinema Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Delete cinema');
           
        }
})


export const updateCinema = createAsyncThunk('cinema/update', async(data) => {
        try {
            
            console.log('data => ',data);
            const response = axiosIntance.patch(`/booking/updateCinema?id=${data.id}`,data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            
            toast.promise(response, {
                loading: 'updateing Cinema...',
                success: 'Updated Cinema Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to update Cinema');
           
        }
})


const cinemaSlice = createSlice({
    name: 'cinemaSlicer',
     initialState,
    reducers: {
      
    },
    extraReducers: (builder) => { 
        builder. 
        addCase(getAllCinema.fulfilled, (state,action) => {
            if(action?.payload?.data?.data){
                const data =  action?.payload?.data?.data;
                state.cinemaList= data;
            }
        })

         .addCase(updateCinema.fulfilled, (state,action) => {
                        
                        if(action?.payload?.data){
                            const data = action?.payload?.data?.data;
                           state.cinemaList =  state.cinemaList.map( (item) => item._id === data._id ? data : item  );
                        }
                    })
        
                    .addCase(deleteCinema.fulfilled, (state,action) => {
                        
                        if(action?.payload?.data){
                            const data = action?.payload?.data?.data;
                           state.cinemaList = state.cinemaList.filter((item) => item._id !== data._id);
                        }
                    })
        
                    .addCase(createCinema.fulfilled, (state,action) => {
                        
                        if(action?.payload?.data){
                            const data = action?.payload?.data?.data;
                            console.log(data);
                           state.cinemaList.push(data);
                        }
                    })
        
    }
    
});


export default cinemaSlice.reducer;
