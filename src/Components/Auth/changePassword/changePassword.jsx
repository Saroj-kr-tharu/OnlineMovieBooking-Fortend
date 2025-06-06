
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordReducer, logoutUser } from '../../../redux/Slices/AuthSlice';

function ChangePassword() {
  const [formData, setFormData] = useState({
     email: localStorage.getItem('email'),
      oldPassword: "",
      newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [oldshowPassword, oldsetShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // reset form 
  function resetForm(){
      setFormData({
        email: localStorage.getItem('email'),
        oldPassword: "",
        newPassword: "",
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
    
    console.log('fomr data => ', formData);
    // Basic validation
    if (!formData.email || !formData.newPassword || !formData.oldPassword) return;
      const response = await dispatch(changePasswordReducer(formData));
      resetForm();
     if(response?.payload?.data){
            dispatch(logoutUser())
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
              disabled
              required
            />
            
            <label className="label">Old Password</label>
            <div className="relative w-80">
                <input
                  type={oldshowPassword ? "text" : "password"}
                  name="oldPassword"
                  className="input w-full"
                  placeholder="old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => oldsetShowPassword(!oldshowPassword)} 
                  className="absolute inset-y-0 right-4 text-xl flex items-center cursor-pointer z-10"
                >
                  {oldsetShowPassword ? 
                    <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : 
                    <FaEye className="text-gray-500 hover:text-gray-700" />
                  }
                </button>
              </div>


            <label className="label">new Password</label>
  

           <div className="relative w-80">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                className="input w-full"
                placeholder="new Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-4 text-xl flex items-center cursor-pointer z-10"
              >
                {showPassword ? 
                  <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : 
                  <FaEye className="text-gray-500 hover:text-gray-700" />
                }
              </button>
            </div>
            
            
            
            <div className="mt-2">
              <Link to={"/register"} className="link btn btn-xs px-4 py-2 text-center link-hover">
                Signup?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary  "
            > Change Password
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;