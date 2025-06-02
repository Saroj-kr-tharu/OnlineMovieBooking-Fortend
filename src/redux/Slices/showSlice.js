import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';

const initialState= {
    showList: [],
    LocationListShow: [],
    selectLocation:'Kathmandu'
    
};

export const getAllShow = createAsyncThunk('show/getall', async(data) => {
        try {

            const response = axiosIntance.get('/booking/shows');
            toast.promise(response, {
                loading: 'Getting All shows...',
                success: 'All shows Loaded',
                error: 'Something went wrong '
            })
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Shows Loading Failed');
           
        }
})

export const createShow = createAsyncThunk('show/create', async(data) => {
        try {

            const response = axiosIntance.post('/booking/createshow',data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Creating Show...',
                success: 'Created Show Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Created show');
           
        }
})

export const deleteShow = createAsyncThunk('show/delete', async(data) => {
        try {
            const response = axiosIntance.delete(`/booking/deleteshow?id=${data}`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            toast.promise(response, {
                loading: 'Deleting show...',
                success: 'Deleted show Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to Delete Show');
           
        }
})


export const updateShow = createAsyncThunk('show/update', async(data) => {
        try {
            
            console.log('data => ',data);
            const response = axiosIntance.patch(`/booking/updateshow?id=${data.id}`,data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });
            
            toast.promise(response, {
                loading: 'updateing show...',
                success: 'Updated show Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to update Show');
           
        }
})
 

export const getShowByLocation = createAsyncThunk('show/location', async(data) => {
        try {
            
            const response = axiosIntance.get(`/booking/location?location=${data}`);
            
            toast.promise(response, {
                loading: 'getting Show  show...',
                success: 'geted show Sucessfully',
                error: 'Something went wrong '
            })
            const result = await response;
             return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Failed to get Show');
           
        }
})

const showSlice = createSlice({
    name: 'movieSlicer',
     initialState,
    reducers: {
    selectLocationFun: (state, action) => {
        state.selectLocation = action.payload;
    }
},
    extraReducers: (builder) => { 
            builder. 
            addCase(getAllShow.fulfilled, (state,action) => {
                if(action?.payload?.data){
                     const data = action?.payload?.data?.data; 
                    //  console.log('show data => ', data);
                     state.showList = data;
                }
            })

            .addCase(getShowByLocation.fulfilled, (state,action) => {
                if(action?.payload?.data){
                     const data = action?.payload?.data?.data; 
                          state.LocationListShow = []
                    data.forEach((showGroup, groupIndex) => {
                    showGroup.forEach((show, showIndex) => {
                        // Now you can access show properties like:
                       

                        // state.showCinema.push(show.cinemaId);
                        // state.showMovie.push(show.movieId);
                        state.LocationListShow.push(show);

                    });
                    });
                    
                }
            })

            .addCase(updateShow.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                   state.showList =  state.showList.map( (item) => item._id === data._id ? data : item  );
                }
            })

            .addCase(deleteShow.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                   state.showList = state.showList.filter((item) => item._id !== data._id);
                }
            })

            .addCase(createShow.fulfilled, (state,action) => {
                
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data;
                    console.log(data);
                   state.showList.push(data);
                }
            })

        }

    
});


export default showSlice.reducer;
