import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function MovieCard({ data }) {
    const navigate = useNavigate();
 
    function  HandleBuyFun(){
        const finalData = {
            Movie: data?.title
        }
        navigate('/nowShowing', {state: finalData});
        //  console.log('data in movieCard => ', finalData);
    }

    return (
        <div   onClick={()=> HandleBuyFun()}  className="relative min-w-11/12 h-96 gap border-1 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group">
            {/* Movie poster with consistent sizing */}
            <div className="relative h-80 w-full overflow-hidden">
                {/* Rating badge */}
                <div className="badge badge-secondary font-bold z-20 absolute right-2 top-2 px-2 py-1">
                    {data.pg || 'PG'}
                </div>
                
                {/* Poster image */}
                <img 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={data.image}
                    alt={data.title} 
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <motion.button
                        
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary font-semibold px-6 py-2 rounded-full"

                        onClick={()=> HandleBuyFun()}
                    >
                        Buy Now
                    </motion.button>
                </div>
            </div>
            
            {/* Movie info section */}
            <div className="bg-white dark:bg-gray-800 p-3">
                <h2 className="text-base font-bold capitalize truncate">{data.title}</h2>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Array.isArray(data.genre) && data.genre.length > 0 
                            ? data.genre.slice(0, 2).join(' • ')
                            : 'No genre'}
                    </span>
                    
                </div>
            </div>
        </div>
    );
}

export default MovieCard;