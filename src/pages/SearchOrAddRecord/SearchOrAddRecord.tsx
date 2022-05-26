import React, { useState } from "react";
import "../../index.css";
import Input from "../../components/Input/Input";

const SearchOrAddRecord = () => {
    const [ inputDisplay, setInputDisplay ] = useState("none")
  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full min-h-[100vh] relative">
          <div style={{display: inputDisplay}} className="w-full h-[60px] py-[10px] flex items-center bg-[#1F1F21]">
          <div className="w-[92%] max-w-[400px] mx-auto flex text-[#FFCC66]">
          <Input divClasses="w-full" inputClasses="w-full p-[6px] bg-[#2E3037] outline-none"/>
          <div className="w-fit bg-[#2E3037] flex items-center px-[10px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="cursor-pointer" onClick={() => setInputDisplay("none")}><path fill="#FFFFFF" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z"/></svg>
          </div>
          </div>
          </div>
      <div className="fixed bottom-[80px] right-[24px] shadow-[15px 4px 4px rgb(0,0,0,0.5)] bg-[#404040] rounded-[50%] w-fit h-fit p-[10px] mr-[10px] cursor-pointer" onClick={() => setInputDisplay("block")}>
                <svg
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enable-background="new 0 0 48 48"
                  className="w-[20px] h-[20px]"
                >
                  <g fill="#FFFFFF">
                    <rect
                      fill="#FFFFFF"
                      x="34.6"
                      y="28.1"
                      transform="matrix(.707 -.707 .707 .707 -15.154 36.586)"
                      width="4"
                      height="17"
                    />
                    <circle cx="20" cy="20" r="16" />
                  </g>
                  <rect
                    x="36.2"
                    y="32.1"
                    transform="matrix(.707 -.707 .707 .707 -15.839 38.239)"
                    fill="#37474F"
                    width="4"
                    height="12.3"
                  />
                  <circle fill="#FFFFFF" cx="20" cy="20" r="13" />
                  <path
                    fill="#FFFFFF"
                    d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"
                  />
                </svg>
              </div>
        <div className="w-full fixed bottom-0 h-[60px] border-t-[1px] border-[#404040] py-[10px]">
          <div className="w-[90%] mx-auto flex justify-between items-center">
            <div className="cursor-pointer flex ">
              
              <div className="w-[fit]">
                <a className="flex flex-col justify-center items-center w-fit px-20px">
                  <span className="">
                    <svg
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-[22px] h-[22px]"
                      // enable-background="new 0 0 48 48"
                    >
                      <path
                        fill={"#FFFFFF"}
                        d="M38,44H12V4h26c2.2,0,4,1.8,4,4v32C42,42.2,40.2,44,38,44z"
                      />
                      <path
                        fill={"#404040"}
                        d="M10,4h2v40h-2c-2.2,0-4-1.8-4-4V8C6,5.8,7.8,4,10,4z"
                      />
                      <g fill={"#404040"}>
                        <circle cx="26" cy="20" r="4" />
                        <path d="M33,30c0,0-1.9-4-7-4c-5.1,0-7,4-7,4v2h14V30z" />
                      </g>
                    </svg>
                  </span>
                  <h2 className="text-[#FFFFFF] text-[12px]">RECORDS</h2>
                </a>
              </div>
            </div>
            <div className="cursor-pointer">
              <a className="flex flex-col justify-center items-center w-fit px-20px">
                <span className="">
                  <svg
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    enable-background="new 0 0 48 48"
                    className="w-[24px] h-[22px]"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"
                    />
                    <g fill="#404040">
                      <path d="M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z" />
                      <path d="M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z" />
                    </g>
                    <g fill="#404040">
                      <rect x="22" y="16" width="4" height="18" />
                      <rect x="15" y="23" width="18" height="4" />
                    </g>
                  </svg>
                </span>
                <h2 className="text-[#FFFFFF] text-[12px]">CREATE RECORD</h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOrAddRecord;
