import React,{ useState } from "react";
import "../../index.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

  


const Otp  = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  function conf(e: any,otp:string) {
      e.preventDefault();
    console.log("code => ", otp);
      window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        navigate("/home")

        console.log("user is signedIN", user);
        // ...
      })
      .catch((error: any) => {
        console.log("failed to signIN");
        // ...
      });
  }

    
    return (
        <div className="w-full min-h-[100vh]">
            <div className="w-[90%] max-w-[400px] py-[100px] min-h-[100vh] mx-auto flex flex-col justify-around">
            <header className="translate-y-[-35px]">
            <h1 className="text-[2rem] text-white text-center tracking-[2px] font-[700]">OTP</h1>
            </header>
            <form className="min-h-[220px] translate-y-[-105px] flex flex-col justify-end" onSubmit={(e) => conf(e, otp)}>
                <Input divClasses="w-full py-[10px] text-white" inputClasses="w-full mt-[10px] p-[10px] bg-[#404040] rounded-[5px] outline-[1px] outline-blue-400" label="Enter OTP" value={otp} onChange={(e: any) => setOtp(e.target.value)}/>
                <Input divClasses="w-full py-[10px]" inputClasses="w-full  p-[10px] bg-blue-400 rounded-[5px] cursor-pointer text-white font-[400] tracking-[1px] hover:bg-blue-500" type="Submit" value="SUBMIT"/>
            </form>
            </div>
            <div id="captcha-container"></div>
        </div>
    )
}

export default Otp;