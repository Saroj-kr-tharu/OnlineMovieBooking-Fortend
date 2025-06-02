import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';

const initialState= {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false , 
    username: localStorage.getItem('username') || false , 
    role: localStorage.getItem('role') || false , 
    email: localStorage.getItem('email') || false,
    token: localStorage.getItem('token') || false,
};

export const register = createAsyncThunk('auth/register', async(data) => {
        try {
                // console.log('data in slice => ', data);

            const response = axiosIntance.post('/authservice/signup',data);
            toast.promise(response, {
                loading: 'Registering...',
                success: 'Successfull Registered',
                error: 'Something went wrong '
            })
            const result = await response;
            // console.log('status => ', result.status);

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Registration failed');
           
        }
})


export const login = createAsyncThunk('auth/login', async(data) => {
        try {

            const response = axiosIntance.post('/authservice/signin',data);
            toast.promise(response, {
                loading: 'Logining...',
                success: 'Successfull Login',
                error: 'Something went wrong '
            })
            const result = await response;

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Login failed');
            
        }
})

export const changePasswordReducer = createAsyncThunk('auth/changepassword', async(data) => {
        try {

            const response = axiosIntance.post('/authservice/changepassword', data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                            }
                    });

            toast.promise(response, {
                loading: 'changing...',
                success: 'Successfull Change Password',
                error: 'Something went wrong '
            })
            const result = await response;

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.data?.message || 'Change Password Failed');
            
        }
})

export const forgetPasswordReducer = createAsyncThunk('auth/forgetpassword', async(data) => {
        try {

            const response = axiosIntance.post('/authservice/sendResetLink', data);

            toast.promise(response, {
                loading: 'Forgetting Password...',
                success: 'Successfull send Reset Link To Email',
                error: 'Something went wrong '
            })
            const result = await response;

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.data?.message || 'Forget Process Failed');
           
        }
})


export const forgetpassword_verifyReducer = createAsyncThunk('auth/verifyForgetpassword', async(data) => {
        try {
            console.log('data => ',data);
            const response = axiosIntance.post('/authservice/resetPassword', {password: data.password}, {
                    headers: {
                        'x-access-token': data.token,
                            }
                    });

            toast.promise(response, {
                loading: 'changing...',
                success: 'Successfull Change Password',
                error: 'Something went wrong '
            })
            const result = await response;

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.data?.message || 'Change Password Failed');
           
        }
})


export const AddRoleReducer = createAsyncThunk('auth/AddRole', async(data) => {
        try {
            console.log('data => ',data);
            const response = axiosIntance.post('/authservice/addRole', data, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });

            toast.promise(response, {
                loading: 'Adding Role...',
                success: 'Successfull Change Role',
                error: 'Something went wrong '
            })
            const result = await response;

            if(result.status == 201 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.data?.message || 'Role Change Failed');
           
        }
})

export const CheckTokenReducer = createAsyncThunk('auth/checkToken', async(_, { rejectWithValue }) => {
        try {
            const response = axiosIntance.get('/authservice/checkToken', {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                            }
                    });

            toast.promise(response, {
                loading: 'Checking  Token...',
                success: 'Successfull Check Token',
                error: 'Something went wrong '
            })
            const result = await response;

           return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.data?.message || 'Token Check Failed');
            // This will properly trigger the rejected case with your error data
            return rejectWithValue(error.response?.data || error.message);
        }
})





const authSlice = createSlice({
    name: 'authSlicer',
     initialState,
    reducers: {
        logoutUser: (state) => {
            state.email = '';
            state.token = '';
            state.isLoggedIn = false; 
            state.role = '';
            state.username = '';
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
    builder 
        .addCase(login.fulfilled, (state,action) => {
            if(action?.payload?.data){
                const data = action?.payload?.data?.data;
                
                state.email = data.email;
                state.token = data.token;
                state.isLoggedIn = true; 
                state.role = data.role;
                state.username = data.email;

                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('username', data.email)
                localStorage.setItem('email', data.email)
                localStorage.setItem('role', data.role)
                localStorage.setItem('token', data.token)
            }
        })
        .addCase(CheckTokenReducer.rejected, (state,action) => {
            if(action?.payload?.err){
                state.isLoggedIn = false; 
                state.username = false; 
                state.role = false; 
                state.email = false;
                state.token = false;
                
                localStorage.clear();
            }
        })
}
   
});


export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;
