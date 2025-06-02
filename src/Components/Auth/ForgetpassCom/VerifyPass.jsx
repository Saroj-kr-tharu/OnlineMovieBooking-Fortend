
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetpassword_verifyReducer } from '../../../redux/Slices/AuthSlice';


function VerifyPass({token}) {
  const [formData, setFormData] = useState({
    
      newPassword: "",
      ConfirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // reset form 
  function resetForm(){
      setFormData({
        ConfirmPassword: "",
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
    if ( !formData.newPassword || !formData.ConfirmPassword) return;
        const finaldata = {token, password:formData.ConfirmPassword};
        console.log('final data => ', finaldata);
      const response = await dispatch(forgetpassword_verifyReducer(finaldata));
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
            
            
            
            <label className="label">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="input "
              placeholder="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            
            <label className="label"> Confirm Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              className="input "
              placeholder="confirm Password"
              value={formData.ConfirmPassword}
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

export default VerifyPass;