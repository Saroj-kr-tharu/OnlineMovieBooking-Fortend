
export default function InfoCard({data}) {
  // Add a check to ensure data exists
  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <div className=" w-1/3  sm:w-full flex flex-row justify-around ">
      {/* Single Card */}
      <div className="
        hover:cursor-pointer hover:shadow-lg hover:shadow-gray-400/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1

      bg-white/80 text-primary rounded-lg shadow-sm border-2 border-primary py-2 sm:p-6  w-full sm:w-8/12">
        <div className="flex items-center justify-center sm:justify-around mb-2">
          <div  className="  rounded-lg flex items-center justify-center mr-1 sm:mr-3 text-primary">
            {data.icon}
          </div>
          <span className="text-xl sm:text-lg font-normal sm:font-semibold text-neutral-800">{data.title}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{data.value}</div>
      </div>
    </div>
  );
}