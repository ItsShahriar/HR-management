import DesignAndCreative from "./DesignAndCreative";
import { zipDesign } from "./imageFiles";

const MarketPlace = () => {
  return (
    <div className="mt-20">
        <img src="https://images.pexels.com/photos/5673502/pexels-photo-5673502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"   width="40"
                    className="w-40 h-120"  alt="layout-design" />
      <img src={zipDesign} alt="layout-design" />

      <div className="relative" style={{ marginTop: "-35px" }}>
        <div
          className="absolute top-0 left-0 w-full h-48 bg-blue-500 transform -skew-y-3 origin-top-left"
          style={{ zIndex: 0, backgroundColor: "rgb(237, 239, 255)" }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center py-16 mt-20 bg-[#EDEFFF]">
        
        <img src="https://media.istockphoto.com/id/1451866097/photo/hrm-or-human-resource-management-businessman-holding-magnifier-select-and-accept-to-manager.jpg?s=1024x1024&w=is&k=20&c=LZqy135nv3Nhc9aNjJu8vq12VLZfRj3jg9md8m8WPrQ="   width="40"
                    className="w-40 h-120" alt="layout-design" />
      
          <br />
          <br />
          <div
            className="w-11/12 sm:w-5/6 lg:w-5/6 lg:mt-20 px-5 md:px-10 flex flex-col md:flex-row justify-between items-center pb-16"
            style={{ marginTop: "-20px" }}
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center mb-10 md:mb-0 cursor-pointer">
              <div className="flex items-center">
                <div className="flex justify-center items-center rounded-full overflow-hidden bg-black h-16 w-16">
                  <svg
                    width="25"
                    height="15"
                    viewBox="0 0 25 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3588 7.5C13.3588 11.036 10.3683 13.9024 6.67939 13.9024C2.99046 13.9024 -2.2912e-08 11.036 -1.55709e-08 7.5C-8.22979e-09 3.96403 2.99046 1.09756 6.67939 1.09756C10.3683 1.09756 13.3588 3.96403 13.3588 7.5Z"
                      fill="#EDEFFF"
                    />
                    <path
                      d="M11.6412 15L11.6412 2.41685e-08L25 7.5L11.6412 15Z"
                      fill="#EDEFFF"
                    />
                  </svg>
                </div>
                <span className="ml-3 font-bold">Explore More</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left cursor-pointer">
              <span className="font-bold">30 more</span> to explore
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;