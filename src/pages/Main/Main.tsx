import React from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();


  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-[full] relative">
        <div className="fixed w-full bottom-0 h-[60px] border-t-[1px] border-[#404040]">
          <div className="w-[94%] mx-auto p-[10px] flex justify-center relative">
            <div className="px-[20px] cursor-pointer" onClick={() => navigate("/create_order")}>
              <a className="flex flex-col justify-center items-center w-fit">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="w-[19px] h-[19px] mb-[3px]"
                  >
                    <path
                      fill={"#FFFFFF"}
                      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
                    />
                  </svg>
                </span>
                <h1 className="text-[#FFFFFF] text-[12px]">CREATE ORDER</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
