import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddRoleReducer } from '../../../redux/Slices/AuthSlice';

function AddRole() {
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    role: 'custumer'
  });

  // reset form 
  function resetForm(){
      setFormData({
        email: '',
        role: 'custumer'
      });
  }

  // Handle input changes
  const handleChange = (e) => {
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

    console.log('form => ', formData);
    
  

    dispatch(AddRoleReducer(formData))
    // Here you would typically make an API call to add the role
    
    // Reset form after submission
    resetForm();
  };

  return (
    <motion.div 
    whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{
              y: { duration: 0.5, ease: "easeIn" },
              opacity: { duration: 0.5, ease: "easeIn" },
            }}


    className="w-full mx-auto rounded-xl max-w-sm shrink-0 shadow-2xl">
        <div className="text-xl font-semibold"> Add Role </div>
      <div className="flex justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <fieldset className="fieldset">
            
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <label className="label">Select Role</label>
            <select 
              name="role"
              className="select select-ghost w-full" 
              value={formData.role}
              onChange={handleChange}
            >
              <option disabled>Pick a Role</option>
              <option  value="custumer">Customer</option>
              <option  value="moderator">Moderator</option>
            </select>
            
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              ADD
            </button>
          </fieldset>
        </form>
      </div>
    </motion.div>
  );
}

export default AddRole;