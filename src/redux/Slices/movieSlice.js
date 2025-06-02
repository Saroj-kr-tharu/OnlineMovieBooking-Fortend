import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';

const initialState= {
    movieList: []
};

export const getAllMovie = createAsyncThunk('movie/getall', async(data) => {
        try {

            const response = axiosIntance.get('/booking/movies');
            toast.promise(response, {
                loading: 'Getting All Movie...',
                success: 'All Movie Loaded',
                error: 'Something went wrong '
            })
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Movie Loading Failed');
           
        }
})

export const createMovie = createAsyncThunk('movie/create', async(data) => {
        try {
            console.log('data received => ', data);

            const response = axiosIntance.post('/booking/create',data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Creating Movie...',
                success: 'Created Movie Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Created Cinema');
           
        }
})

export const deleteMovie = createAsyncThunk('movie/delete', async(data) => {
        try {
            const response = axiosIntance.delete(`/booking/delete?id=${data}`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Deleting Movie...',
                success: 'Deleted Movie Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Delete Movie');
           
        }
})


export const updateMovie = createAsyncThunk('movie/update', async(data) => {
        try {
            

            const response = axiosIntance.patch(`/booking/update?id=${data.id}`,data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            
            toast.promise(response, {
                loading: 'Deleting Movie...',
                success: 'Deleted Movie Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to update Movie');
           
        }
})


const movieSlice = createSlice({
    name: 'movieSlicer',
     initialState,
    extraReducers: (builder) => { 
            builder. 
            addCase(getAllMovie.fulfilled, (state,action) => {
                if(action?.payload?.data){
                     const data = action?.payload?.data?.data; 
                     console.log('data => ',data);
                     state.movieList = data;
                }
            })
            .addCase(updateMovie.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                   state.movieList =  state.movieList.map( (item) => item._id === data._id ? data : item  );
                }
            })

            .addCase(deleteMovie.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                   state.movieList = state.movieList.filter((item) => item._id !== data._id);
                }
            })

            .addCase(createMovie.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                    console.log(data);
                   state.movieList.push(data);
                }
            })

        }

    
});


export default movieSlice.reducer;
