import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CheckTokenReducer } from '../../redux/Slices/AuthSlice';

  const ProtectedRoute = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const authState = useSelector( (state) => state.auth ); 
  const isAuthenticated = authState.isLoggedIn ||  localStorage.getItem("token") !== null;
  
  async  function checkTokenfun() {
   const res = await  dispatch(CheckTokenReducer());
}

useEffect(() => {
  checkTokenfun();
}, []);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
   
  if (requiredRole) {
    
    const userRole = authState.role || localStorage.getItem('role') || 'unKnown';
    
    if (userRole !== requiredRole) {
      return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;