import { useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import seats from '../../assets/seats.png';
import './curveDisplay.css';

function PickUpScreens() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStyle = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    if (selectedSeats.includes(seatId)) {
      return { filter: "invert(81%) sepia(53%) saturate(629%) hue-rotate(359deg) brightness(105%) contrast(101%)" };
    }
    return { filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(100deg) brightness(118%) contrast(95%)" };
  };

  const handleBuyClick = () => {
    setShowSummary(true);
  };

 const seatInfo = [
  { style: { filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(100deg) brightness(118%) contrast(95%)" }, title: 'Available', image: seats },
  { style: { filter: "invert(34%) sepia(66%) saturate(4099%) hue-rotate(213deg) brightness(101%) contrast(101%)" }, title: 'Reserved', image: seats },
  { style: { filter: "invert(15%) sepia(95%) saturate(6932%) hue-rotate(359deg) brightness(94%) contrast(112%)" }, title: 'Sold Out', image: seats },
  { style: { filter: "invert(81%) sepia(53%) saturate(629%) hue-rotate(359deg) brightness(105%) contrast(101%)" }, title: 'Pick Seats', image: seats },
  { style: {}, title: 'Unavailable', image: seats }
]

  return (
    <div 
      className={`
        sm:w-full 
        w-4/5
         
        ${!isCollapsed ? 'bg-neutral-700' : ''} 
        rounded-sm 
        py-4 
        px-6
      `}
    >
      <div 
        id="headerSection" 
        className={`
          flex 
          font-semibold 
          hover:cursor-pointer 
          items-center 
          justify-between 
          
          ${isCollapsed ? 'bg-neutral-700 px-4 py-2 rounded-sm' : ''}
        `}
        onClick={toggleCollapse}
      >
        <div className="text-xs  sm:text-xl">2. Choose Seats</div>    
        <div className=" text-xs md:text-xl">
          {isCollapsed ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
        </div>  
      </div> 

      {!isCollapsed && (
        <>
          <div className="w-full flex flex-col items-center">
            <div className="text-xl font-semibold">Screen</div>
            <div className="w-1/2">
              <div className="curved-divider"></div>
            </div>
          </div>

          <div id="seats" className="flex flex-col gap-y-4">
            <div className="flex justify-center border-b-2 border-primary">
              <div className="uppercase text-xs font-semibold">Platinum npr 380</div>
            </div>

            <div id="seats-layout" className="flex flex-col gap-y-2">
              <div className="flex">
                <div>A</div>
                <div className="ml-10 flex gap-x-2">
                  {[1, 2, 3, 4].map((seatNumber) => (
                    <img  
                      key={`A${seatNumber}`}
                      src={seats} 
                      className="w-6 sm:w-8  hover:cursor-pointer" 
                      style={getSeatStyle('A', seatNumber)} 
                      onClick={() => handleSeatClick('A', seatNumber)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex">
                <div>B</div>
                <div className="ml-10 flex gap-x-2">
                  {[1, 2, 3, 4].map((seatNumber) => (
                    <img  
                      key={`B${seatNumber}`}
                      src={seats} 
                      className="w-6 sm:w-8 hover:cursor-pointer" 
                      style={getSeatStyle('B', seatNumber)} 
                      onClick={() => handleSeatClick('B', seatNumber)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div id="notice" className="flex border-t-2 border-primary pt-4 gap-x-4 justify-center mt-10">
           
            

            {seatInfo.map( (item) => (
              <div className="flex flex-col items-center">
                <img  
                  src={item.image} 
                  className="w-5 sm:w-7 " 
                  style={item.style} 
                /> 
                <div className="text-[8px] sm:text-xs font-semibold">{item.title}</div>
            </div>
            ) )}

          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-4 p-2 bg-neutral-800 rounded-md">
              <div className="font-semibold mb-1">Selected Seats:</div>
              <div className="flex gap-2">
                {selectedSeats.sort().map(seat => (
                  <span key={seat} className="px-2 py-1 bg-primary rounded-md text-sm">{seat}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleBuyClick}
              disabled={selectedSeats.length === 0}
            >
              Buy now
            </button>
          </div>

          {showSummary && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-neutral-800 p-6 rounded-md max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <div className="mb-4">
                  <div className="font-semibold">Selected Seats:</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSeats.sort().map(seat => (
                      <span key={seat} className="px-2 py-1 bg-primary rounded-md">{seat}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold">Price:</div>
                  <div>NPR {selectedSeats.length * 380}</div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowSummary(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PickUpScreens;