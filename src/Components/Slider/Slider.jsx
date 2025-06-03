import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMovie } from '../../redux/Slices/movieSlice';

function Slider() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MoviesList = useSelector((state) => state.movie.movieList);
    
  function loadShowBylocation(){
      if(MoviesList.length === 0 ){
        dispatch(getAllMovie())
      }
    }
 
    useEffect( ()=> { loadShowBylocation() }, [] )


    
  function BuyFun(iteam){
      const movie = MoviesList.find((item) => item._id === iteam);


    // console.log('The Movie iteam is ', movie.title );
    const finalData = {
            Movie: movie?.title
        }
       navigate('/nowShowing', {state: finalData});
  }

 

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to navigate to a specific slide
  const navigateToSlide = (index) => {
    setCurrentIndex(index);
    const slideElement = document.getElementById(`slide${index}`);
    if (slideElement) {
      const container = document.querySelector('.carousel');
      if (container) {
        container.scrollTo({
          left: slideElement.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  // Auto-rotate slides every 5 seconds (5000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate next slide index with wrapping
      const nextIndex = currentIndex === MoviesList.length - 1 ? 0 : currentIndex + 1;
      navigateToSlide(nextIndex);
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex, MoviesList.length]);

  return ( 
     <motion.div
             whileInView={{ y: 0, opacity: 1, scale: 1 }}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
            staggerChildren: 0.1,
            opacity: { duration: 0.8 },
            scale: { duration: 0.6 }
          }}
              viewport={{ once: true }}> 
      <div className="carousel w-full h-[300px] sm:h-[70vh]">
        {MoviesList.length > 0 &&  MoviesList.map((item, index) => {
          // Calculate previous and next slide indexes with wrapping
          const prevIndex = index === 0 ? MoviesList.length - 1 : index - 1;
          const nextIndex = index === MoviesList.length - 1 ? 0 : index + 1;
          
          return (
            <div  id={`slide${index}`} key={index} className="carousel-item hover:cursor-pointer relative h-full w-full overflow-hidden">
              <img  
              
                src={item.slideImage} 
                alt={item.alt} 
                className="w-full h-full object-cover object-center z-10 transition-transform duration-700 ease-in-out" 
                loading="eager"
              />

              <div onClick={()=> BuyFun(item._id)} className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

              <div className='absolute flex-col  left-5 sm:left-20 bottom-0 sm:bottom-8 gap-y-3 text-black card-title z-20'>
                <div className='text-white text-xs sm:text-3xl font-semibold capitalize px-2'>{item.title}</div>
                <div className='btn text-xs sm:text-sm btn-sm sm:btn-md btn-primary ml-2' onClick={()=> BuyFun(item._id)} >Buy Now</div>
              </div>
              
              <div className="absolute z-20 left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button 
                  className="btn w-6 h-6 sm:w-8 sm:h-8 btn-soft btn-circle opacity-80 hover:opacity-100"
                  onClick={() => navigateToSlide(prevIndex)}
                >❮</button>
                <button 
                  className="btn w-6 h-6 sm:w-8 sm:h-8 btn-soft btn-circle opacity-80 hover:opacity-100"
                  onClick={() => navigateToSlide(nextIndex)}
                >❯</button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dot indicators with animation */}
      <div className="flex justify-center w-full py-2 gap-3">
        {MoviesList.map((_, index) => (
          <button 
            key={`indicator-${index}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => navigateToSlide(index)}
            className="relative border-none bg-transparent p-0 focus:outline-none"
          >
            <span 
              className={`block rounded-full transition-all duration-300 ease-in-out
                ${currentIndex === index 
                  ? 'bg-primary w-3 h-3 animate-pulse' 
                  : 'bg-gray-400 w-2 h-2'}`}
            ></span>
          </button>
        ))}
      </div>
      
    </motion.div>
  );
}

export default Slider;