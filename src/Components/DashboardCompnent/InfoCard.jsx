export default function InfoCard({data}) {
  // Add a check to ensure data exists
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full  sm:w-10/12">
      {/* Single Card */}
      <div className="
        hover:cursor-pointer hover:shadow-lg hover:shadow-gray-400/50 
        transition-all duration-300 ease-in-out transform hover:-translate-y-1
        bg-white/80 text-primary rounded-lg shadow-sm border-2 border-primary 
        p-4 sm:p-6 flex flex-col w-full sm:h-1/2 h-full min-h-[120px]
      ">
        <div className="flex items-center flex-col sm:flex-row justify-center sm:justify-between mb-3 flex-grow">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                         rounded-lg flex items-center justify-center 
                         mb-2 sm:mb-0 sm:mr-3 text-primary flex-shrink-0">
            {data.icon}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-center 
                         font-semibold text-neutral-800 leading-tight">
            {data.title}
          </div>
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl text-center sm:text-right font-bold text-gray-900 mt-auto">
          {data.value}
        </div>
      </div>
    </div>
  );
}