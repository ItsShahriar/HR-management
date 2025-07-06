const Footer = () => {
    return (
      <div
        className="relative pt-10"
        style={{
          marginTop: "80px",
          background: "linear-gradient(rgb(12, 12, 12) 0%, rgb(12, 12, 12) 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-48 bg-blue-500 transform -skew-y-2 origin-top-left"
          style={{ zIndex: 10, backgroundColor: "rgb(12, 12, 12)" }}
        ></div>
        <div className="mx-auto w-5/6 relative mt-10">
          <div
            className="absolute top-0 left-0 w-full h-48 bg-blue-500 transform -skew-y-2 origin-top-left"
            style={{ zIndex: 10, backgroundColor: "rgb(82, 90, 160)" }}
          ></div>
          <div
            className="relative z-10 mx-auto w-full px-10 flex items-center justify-center pt-20 pb-5 mt-20"
            style={{ backgroundColor: "rgb(82, 90, 160)", zIndex: 20 }}
          >
            <div className="flex flex-col justify-center items-center">
              <div
                className="font-bold text-center text-white"
                style={{ fontSize: "2rem", lineHeight: "1.3" }}
              >
                Need a job done, and done <br /> well? Get started
              </div>
              <div className="flex gap-3 items-center mt-5 cursor-pointer">
                <div
                  className="flex justify-center items-center rounded-full overflow-hidden bg-black h-11 w-11"
                  style={{ borderRadius: "35%" }}
                >
                  <svg
                    width="16"
                    height="26"
                    viewBox="0 0 16 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.36366 14.22C4.8405 14.22 1.98442 11.2404 1.98442 7.56486C1.98442 3.8893 4.8405 0.909667 8.36366 0.909668C11.8868 0.909668 14.7429 3.8893 14.7429 7.56486C14.7429 11.2404 11.8868 14.22 8.36366 14.22Z"
                      fill="#EDEFFF"
                    />
                    <path
                      d="M0.890834 12.5087L15.8365 12.5087L8.36366 25.8191L0.890834 12.5087Z"
                      fill="#EDEFFF"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full mx-auto mt-20 text-white">
            <div className="w-full md:w-2/6">
             
  
              <div className="mt-5" style={{ color: "rgb(209, 209, 209)" }}>
                We take complex hiring processes - and simplify them. Connecting
                you to the world’s highly qualified talent pool.
              </div>
              <div className="mt-10">
                <div style={{ color: "rgb(118, 118, 121)" }}>
                  LINKS AND REDIRECTS
                </div>
                <div className="flex gap-5 mt-3">
                  <button
                    className="px-8 py-2 text-xs rounded-lg cursor-pointer whitespace-nowrap bg-gray-800 hover:bg-gray-700"
                  >
                    Hire Now
                  </button>
                  <button
                    className="px-8 py-2 text-xs rounded-lg cursor-pointer whitespace-nowrap bg-gray-800 hover:bg-gray-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/6">
              <div
                className="text-white font-bold"
                style={{ fontSize: "2.5rem", lineHeight: "1.3" }}
              >
                Connecting the right people to <br /> the right businesses.
              </div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-28 mt-20">
                <div className="flex flex-col gap-5">
                  <div style={{ color: "rgb(118, 118, 121)" }}>PLATFORM</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Find Work
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Find Talent
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Categories
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">About Us</div>
                </div>
                <div className="flex flex-col gap-5">
                  <div style={{ color: "rgb(118, 118, 121)" }}>CATEGORIES</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Data Science
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    IT & Networking
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Web & Mobile
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div style={{ color: "rgb(118, 118, 121)" }}>HELP</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">FAQ's</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Contact Us
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div style={{ color: "rgb(118, 118, 121)" }} className="whitespace-nowrap">GET IN TOUCH</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">
                    Instagram
                  </div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">LinkedIn</div>
                  <div className="cursor-pointer whitespace-nowrap text-sm md:text-base">Twitter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10" style={{ borderColor: "rgb(118, 118, 121)" }} />
        <div
          className="w-5/6 mt-3 pb-3 flex flex-col md:flex-row justify-between mx-auto"
          style={{ color: "rgb(118, 118, 121)" }}
        >
          <div>All rights reserved by ORCID</div>
          <div className="flex gap-5">
            <div className="underline cursor-pointer">Privacy Policy</div>
            <div className="underline cursor-pointer">Terms and Conditions</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;