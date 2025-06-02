import { motion } from "motion/react";
import { useSelector } from "react-redux";
import SchedulesCard from "../../Components/SchedulesCard/SchedulesCard";
import Layout from "../../Layout/Layout";

function SchedulePage() {
   const LocationShowList = useSelector((state) => state.show.LocationListShow);
   




  return (
    <>
      <Layout>
        <div className="min-h-[60vh] my-10 flex items-start justify-center">
            <div className="w-10/12">   
                  
 
                  <motion.div
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                   initial={{ y: 0, opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing function
                    staggerChildren: 0.1,
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.6 }
                  }}
                  className='flex flex-col rounded-sm gap-4'>
                    {LocationShowList.map((item, index) => (
                      <SchedulesCard key={ index} data={item} />
                  ))}
                    
                  </motion.div>

              </div>
         </div>


      </Layout>
    </>
  );
}

export default SchedulePage;
