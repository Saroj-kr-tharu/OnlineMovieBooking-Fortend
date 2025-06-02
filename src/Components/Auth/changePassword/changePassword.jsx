
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordReducer } from '../../../redux/Slices/AuthSlice';


function ChangePassword() {
  const [formData, setFormData] = useState({
     email: localStorage.getItem('email'),
      oldPassword: "",
      newPassword: "",
  });
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
    
    // console.log('fomr data => ', formData);
    // Basic validation
    if (!formData.email || !formData.newPassword || !formData.oldPassword) return;
      const response = await dispatch(changePasswordReducer(formData));
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
              disabled
              required
            />
            
            <label className="label">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              className="input "
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
            
            <label className="label">Password</label>
            <input
              type="password"
              name="newPassword"
              className="input "
              placeholder="new Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            
            
            
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