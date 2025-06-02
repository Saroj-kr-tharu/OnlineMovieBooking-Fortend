import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../redux/Slices/AuthSlice';
import bookingSliceReducer from '../redux/Slices/BookingSlice';
import cinemaSliceReducer from '../redux/Slices/CinemaSlice';
import movieSliceReducer from '../redux/Slices/movieSlice';
import showSliceReducer from '../redux/Slices/showSlice';

export default configureStore({
    reducer:{
        auth: authSliceReducer,
        booking: bookingSliceReducer,
        cinema: cinemaSliceReducer,
        movie: movieSliceReducer,
        show: showSliceReducer,
    },
    devTools: true,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})