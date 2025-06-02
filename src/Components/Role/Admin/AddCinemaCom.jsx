import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCinema } from '../../../redux/Slices/CinemaSlice';

function ADDCom() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    managerId: "",
    screens: [
      {
        screenName: "",
        layout: "Standard",
        projectionType: "IMAX 2D",
        soundSystem: "Dolby Atmos",
        seatPricing: {
          premium: 100,
          platinum: 150
        },
        isOpen: true // Initially open (UI only)
      }
    ]
  });

  // reset form 
  function resetForm() {
    setFormData({
      name: "",
      location: "",
      managerId: "",
      screens: [
        {
          screenName: "",
          layout: "Standard", 
          projectionType: "IMAX 2D",
          soundSystem: "Dolby Atmos",
          seatPricing: {
            premium: 100,
            platinum: 150
          },
          isOpen: true
        }
      ]
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

  // Handle screen input changes
  const handleScreenChange = (index, e) => {
    const { name, value } = e.target;
    const updatedScreens = [...formData.screens];
    updatedScreens[index] = {
      ...updatedScreens[index],
      [name]: value
    };
    
    setFormData({
      ...formData,
      screens: updatedScreens
    });
  };

  // Handle seat pricing changes
  const handleSeatPricingChange = (screenIndex, seatType, value) => {
    const updatedScreens = [...formData.screens];
    updatedScreens[screenIndex].seatPricing = {
      ...updatedScreens[screenIndex].seatPricing,
      [seatType]: Number(value)
    };
    
    setFormData({
      ...formData,
      screens: updatedScreens
    });
  };

  // Toggle screen collapse
  const toggleScreenCollapse = (index) => {
    const updatedScreens = [...formData.screens];
    updatedScreens[index] = {
      ...updatedScreens[index],
      isOpen: !updatedScreens[index].isOpen
    };
    
    setFormData({
      ...formData,
      screens: updatedScreens
    });
  };

  // Add a new screen
  const addScreen = () => {
    setFormData({
      ...formData,
      screens: [
        ...formData.screens,
        {
          screenName: "",
          layout: "Standard",
          projectionType: "IMAX 2D",
          soundSystem: "Dolby Atmos",
          seatPricing: {
            premium: 100,
            platinum: 150
          },
          isOpen: true
        }
      ]
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.location || !formData.managerId) return;

    console.log('form => ', formData);
    dispatch(createCinema(formData));
    resetForm();
  };

  return (
    <div className="w-full rounded-xl max-w-sm shrink-0 shadow-2xl">
      <div className="flex justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <fieldset className="fieldset">
            
            <label className="label">Cinema Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Cinema"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              className="input"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label className="label">Manager ID</label>
            <input
              type="text"
              name="managerId"
              className="input"
              placeholder="Manager ID"
              value={formData.managerId}
              onChange={handleChange}
              required
            />
            
            <div className="divider mt-4 mb-4">Screens</div>
            
            {formData.screens.map((screen, index) => (
              <div key={index} className="mb-4 border rounded-lg">
                <div 
                  className="flex justify-between items-center p-2 cursor-pointer rounded-t-lg"
                  onClick={() => toggleScreenCollapse(index)}
                >
                  <span>Screen {index + 1} {screen.screenName && `- ${screen.screenName}`}</span>
                  <span className="text-xl font-bold">{screen.isOpen ? '−' : '+'}</span>
                </div>
                
                {screen.isOpen && (
                  <div className="p-3">
                    <label className="label">Screen Name</label>
                    <input
                      type="text"
                      name="screenName"
                      className="input"
                      placeholder="Screen Name"
                      value={screen.screenName}
                      onChange={(e) => handleScreenChange(index, e)}
                      required
                    />
                    
                    <label className="label">Layout</label>
                    <select 
                      name="layout"
                      className="select select-ghost w-full" 
                      value={screen.layout}
                      onChange={(e) => handleScreenChange(index, e)}
                    >
                      <option disabled>Pick a Layout</option>
                      <option>Standard</option>
                      <option>VIP</option>
                    </select>
                    
                    <label className="label">Projection Type</label>
                    <select 
                      name="projectionType"
                      className="select select-ghost w-full" 
                      value={screen.projectionType}
                      onChange={(e) => handleScreenChange(index, e)}
                    >
                      <option disabled>Pick a Projection Type</option>
                      <option>IMAX 2D</option>
                      <option>IMAX 3D</option>
                      <option>4DX</option>
                    </select>
                    
                    <label className="label">Sound System</label>
                    <select 
                      name="soundSystem"
                      className="select select-ghost w-full" 
                      value={screen.soundSystem}
                      onChange={(e) => handleScreenChange(index, e)}
                    >
                      <option disabled>Pick a Sound System</option>
                      <option>Dolby Atmos</option>
                      <option>IMAX Sound</option>
                      <option>DTS:X</option>
                    </select>

                    <div className="mt-4">
                      <label className="label">Seat Pricing</label>
                      
                      <div className="flex items-end gap-2 mb-2 p-2 border rounded-lg">
                        <div className="flex-1">
                          <label className="label text-sm">Premium Price</label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            value={screen.seatPricing.premium}
                            onChange={(e) => handleSeatPricingChange(index, 'premium', e.target.value)}
                            placeholder="Premium seat price"
                            min="0"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <label className="label text-sm">Platinum Price</label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            value={screen.seatPricing.platinum}
                            onChange={(e) => handleSeatPricingChange(index, 'platinum', e.target.value)}
                            placeholder="Platinum seat price"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="btn btn-outline mb-4 w-full"
              onClick={addScreen}
            >
              + Add Screen
            </button>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full"
            >
              ADD
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ADDCom;