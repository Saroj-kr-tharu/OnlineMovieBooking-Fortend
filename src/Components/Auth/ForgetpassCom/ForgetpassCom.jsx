
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordReducer } from '../../../redux/Slices/AuthSlice';


function ForgetpassCom() {
  const [formData, setFormData] = useState({
     email: '',
   
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // reset form 
  function resetForm(){
      setFormData({
        email: '',
      });
  }

  // Handle input changes
  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email) return;
      const response = await dispatch(forgetPasswordReducer(formData));
      resetForm();
     if(response?.payload?.data){
            navigate('/login');
        }
  };

  return (
    <div className="bg-base-100 w-full  mt-20  rounded-xl max-w-sm shrink-0 shadow-2xl">
      <div className="flex justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <fieldset className="fieldset">
            
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input "
              placeholder="Email"
              value={formData.email}
               onChange={handleChange}
              required
            />
            
            
            
            
            
            <div className="mt-2">
              <Link to={"/login"} className="link btn btn-xs px-4 py-2 text-center link-hover">
                Signin?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary  "
            > Send Reset Password Link
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ForgetpassCom;