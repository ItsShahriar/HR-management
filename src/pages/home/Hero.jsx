import { useEffect, useState } from "react";

import { heroData, heroHeader } from "./header";
import { profileGif, searchImage } from "./imageFiles";

const Hero = () => {
  const [selectedTab, setSelectedTab] = useState("it");
  const [selectedResult, setSelectedResult] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const value = heroData.filter((item) => item.type === selectedTab);
    setSelectedResult(value);
  }, [selectedTab]);

  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center my-8 md:my-20">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-[54px] font-bold leading-9 md:leading-[64px]">
           Best Hr Management System
            <br />
           <p className="md:text-[24px]">ComfortZone Of Admin</p>
          </h1>
        </div>
        <div className="text-sm w-11/12 md:w-96 whitespace-normal text-center mb-6">
          With our rigorous pre-vetting process, you'll never have to worry
          about finding the ideal candidate ever again.
        </div>
        
      </div>

      <div className="flex justify-center items-center">
        <div
          className="px-5 py-5 rounded-lg w-full md:w-3/5"
          style={{ backgroundColor: "rgb(248, 248, 248)" }}
        >
          <div
            className="flex flex-wrap justify-between rounded-[15px] mb-4 mx-auto"
            style={{ backgroundColor: "rgb(210, 210, 210)", maxWidth: "26rem" }}
          >
            {heroHeader?.map((item, idx) => (
              <button
                key={idx}
                className="px-5 py-2 rounded-[15px] w-1/2 cursor-pointer text-sx sm:text-base font-medium"
                style={{
                  backgroundColor:
                    selectedTab === item.id
                      ? "rgb(199, 244, 194)"
                      : "rgb(210, 210, 210)",
                }}
                onClick={() => setSelectedTab(item.id)}
                onMouseOver={() => setSelectedTab(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-3 mx-auto">
            <div className="flex flex-wrap justify-between w-full max-w-3xl">
              {selectedResult?.map((item, idx) => (
                <div className="w-full md:w-1/3 px-2" key={idx}>
                  <p
                    className={`text-left mt-3 text-lg leading-4 py-1 cursor-pointer ${
                      item.isSelected
                        ? "text-[#202229] font-semibold"
                        : "text-[#959595] font-normal"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;