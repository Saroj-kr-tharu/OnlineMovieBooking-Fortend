import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMovie } from '../../../redux/Slices/movieSlice';

function AddmovieCom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cast: '',
    director: '',
    duration: '',
    genre: '',
    releaseDate:'',
    image:'',
    slideImage:'',
  });

  // reset form 
  function resetForm(){
      setFormData({
    title: "",
    description: "",
    cast: '',
    director: '',
    duration: '',
    genre: '',
    releaseDate:'',
    image:'',
    slideImage:'',
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
    

    // console.log('from => ', formData);
    const response = await  dispatch(createMovie(formData));
    if(response?.payload?.data){
      navigate('/moderatorDashboard');
    }
    resetForm();

      
  };

  return (
    <div className=" w-full    rounded-xl max-w-sm shrink-0 shadow-2xl">
      <div className="flex justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <fieldset className="fieldset">
            
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input "
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            
            <label className="label">Description</label>
            <input
              type="text"
              name="description"
              className="input "
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            
            <label className="label">Cast</label>
            <input
              type="text"
              name="cast"
              className="input "
              placeholder="cast"
              value={formData.cast}
              onChange={handleChange}
              required
            />

            <label className="label">Duration</label>
            <input
              type="text"
              name="duration"
              className="input "
              placeholder="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />



            <label className="label">Director</label>
            <input
              type="text"
              name="director"
              className="input "
              placeholder="director"
              value={formData.director}
              onChange={handleChange}
              required
            />

             <label className="label">Genre</label>
            <input
              type="text"
              name="genre"
              className="input "
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />

            <label className="label">Release Date</label>
            <input
              type="text"
              name="releaseDate"
              className="input "
              placeholder="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />


            <label className="label">image</label>
            <input
              type="text"
              name="image"
              className="input "
              placeholder="image"
              value={formData.image}
              onChange={handleChange}
              required
            />


            <label className="label"> Slide Image  </label>
            <input
              type="text"
              name="slideImage"
              className="input "
              placeholder="slideImage"
              value={formData.slideImage}
              onChange={handleChange}
              required
            />

           
            
            <button 
              type="submit" 
              className="btn btn-primary  "
            > ADD
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default AddmovieCom;