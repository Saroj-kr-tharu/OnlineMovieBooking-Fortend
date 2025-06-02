import { Route, Routes } from "react-router-dom";

import PaymentSuccess from "../Components/PaymentDetails/PaymentSuccess";
import ChangePass from "../Pages/Auth/changepassword/changePass";
import ForgetPassword from "../Pages/Auth/ForgetPassword/ForgetPassword";
import ForgetPassword_verify from "../Pages/Auth/ForgetPassword/ForgetPassword_verify";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import NotFound from "../Pages/NotFound/NotFound";
import SingleShow from "../Pages/NowShowing/SingleShow";
import PaymentDetails from "../Pages/Payment/PaymentDetails";
import ProtectedRoute from "../Pages/ProtectedRoute/ProtectedRoute";
import Admin from "../Pages/Role/Admin/Admin";
import Moderator from "../Pages/Role/Moderator/Moderator";
import SchedulePage from "../Pages/Schudeles/SchedulePage";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/movie" element={<Homepage />} />
      <Route path="/Schedules" element={<SchedulePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/forgetpass-verifyToken/:token" element={<ForgetPassword_verify />} />
      <Route path="/nowShowing" element={<SingleShow />} />

      <Route path="/paymentsucess/:data" element={ <ProtectedRoute> <PaymentSuccess /> </ProtectedRoute>} />
      <Route path="/changePassword" element={ <ProtectedRoute> <ChangePass /> </ProtectedRoute>} />
      <Route path="/payment" element={ <ProtectedRoute> <PaymentDetails /> </ProtectedRoute>} />
      <Route path="/adminDashboard" element={ <ProtectedRoute requiredRole="ADMIN"> <Admin /> </ProtectedRoute>} />
      <Route path="/moderatorDashboard" element={ <ProtectedRoute requiredRole="MODERATOR"> <Moderator /> </ProtectedRoute>} />
    </Routes>
  );
}

export default MainRoutes;
