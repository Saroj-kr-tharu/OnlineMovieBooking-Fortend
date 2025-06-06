import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
   const [showPassword, setShowPassword] = useState(false);

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
    <motion.div
    whileInView={{ z: 0, opacity: 1 }}
              initial={{ z: -100, opacity: 0 }}
              transition={{
                z: { duration: 0.8, ease: "easeIn" },
                opacity: { duration: 0.8, ease: "easeIn" },
              }}
              viewport={{ once: true }}

    className="bg-base-100 w-full  mt-20  rounded-xl border-1 border-yellow-200 max-w-sm shrink-0 shadow-2xl">

      <div className="flex justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full ">
          <fieldset className="fieldset">
            <div className="text-4xl mx-auto font-semibold text-yellow-200"> Login  </div>
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
            <div className="relative w-80">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input w-full"
                placeholder="Password"
                value={formData.password}
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

    </motion.div>
  );
}

export default LoginCom;