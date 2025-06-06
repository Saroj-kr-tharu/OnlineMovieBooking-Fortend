import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../../redux/Slices/AuthSlice';


function RegisterCom() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setpassword] = useState();
    const [confirmPassword, confirmSetpassword] = useState();

    // Form states
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    // Error and loading states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // reset form 
    function restForm(){
        setFormData({
        email: "",
        password: "",
        confirmPassword: ""
        })
    }
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.email  || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const finalData = {
            email: formData.email,
            password: formData.confirmPassword ,
            isVerified: false
            
        }
        // console.log(formData)
        const response= await dispatch(register(finalData));
        if(response?.payload?.data){
            navigate('/login');
            restForm();
        }
    };

    return(
        <motion.div 
         whileInView={{ z: 0, opacity: 1 }}
              initial={{ z: -100, opacity: 0 }}
              transition={{
                z: { duration: 0.8, ease: "easeIn" },
                opacity: { duration: 0.8, ease: "easeIn" },
              }}
              viewport={{ once: true }}


        className="bg-base-100 w-full my-10 border-1 border-yellow-200  rounded-xl max-w-sm shrink-0 shadow-2xl">
            <div className="flex justify-center p-4">
                <form onSubmit={handleSubmit} className="w-full">
                    <fieldset className="fieldset" disabled={loading}>
                        <div className="text-4xl mx-auto font-semibold text-yellow-200"> Register  </div>
                        
                        <label className="label">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input" 
                            placeholder="Email" 
                        />

                        

                        <label className="label">Password</label>
                       

                        <div className="relative w-80">
                        <input
                          type={password ? "text" : "password"}
                          name="password"
                          className="input w-full"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setpassword(!password)} 
                          className="absolute inset-y-0 right-4 text-xl flex items-center cursor-pointer z-10"
                        >
                          {password ? 
                            <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : 
                            <FaEye className="text-gray-500 hover:text-gray-700" />
                          }
                        </button>
                         </div>



                        <label className="label">Confirm Password</label>
                       

                        <div className="relative w-80">
              <input
                type={confirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="input w-full"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => confirmSetpassword(!confirmPassword)} 
                className="absolute inset-y-0 right-4 text-xl flex items-center cursor-pointer z-10"
              >
                {confirmPassword ? 
                  <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : 
                  <FaEye className="text-gray-500 hover:text-gray-700" />
                }
              </button>
            </div>

                        

                        <div className="mt-2">
                            <Link to="/login" className="link btn btn-xs px-4 py-2 text-center link-hover">
                                Login?
                            </Link>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Registering...
                                </>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </fieldset>
                </form>
            </div>
        </motion.div>
    );
}

export default RegisterCom;