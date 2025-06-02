import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../../redux/Slices/AuthSlice';


function LoginCom() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // reset form 
  function resetForm(){
      setFormData({
         email: "",
        password: "",
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
    if (!formData.email || !formData.password) return;

    // console.log(formData);
    // reset form 

      // resetForm();
      const response = await dispatch(login(formData));
     if(response?.payload?.data){
            navigate('/');
            resetForm();
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
            
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input "
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <div className="mt-2">
              <Link to={'/forgetpassword'} className="link link-hover">Forgot password?</Link>
            </div>
            
            <div className="mt-2">
              <Link to={"/register"} className="link btn btn-xs px-4 py-2 text-center link-hover">
                Signup?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary  "
            > Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default LoginCom;