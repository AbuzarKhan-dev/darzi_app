import React,{ useState, useEffect } from "react";
import "../../index.css";
import Input from "../../components/Input/Input";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber
  } from "firebase/auth";
  import { auth } from "../../firebase/firebaseConfig";
  import { useNavigate } from "react-router-dom";

  


const SignIn  = () => {
    const [phoneNumber, setPhoneNumber] = useState("+92");
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState<any>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  function settingCaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "captcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          //   onSignInSubmit();
        },
      },
      auth
    );
  }

  async function SignIn(e: any) {
    e.preventDefault();
    if(phoneNumber.length === 13 && phoneNumber[0] === "+" && phoneNumber[1] === "9" && phoneNumber[2] === "2" ){
    settingCaptcha();
    const appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setConfirmation(confirmationResult);
        console.log("phone verification is working");
        setLoading(false)
        navigate("/otp");
      })
      .catch((error) => {
        console.log(error);
        setError(true)
      });} else {
        console.log("wrong number")
        setError(true)
      }
  }

  useEffect(() => {
    setError(false)
  },[phoneNumber])
    
    return (
      <>
      {/* ??/* /* {loading === true ?  */}
        {/* <div className="w-full min-h-[100vh] flex justify-center items-center"> */}
          {/* <div className="border-t-[5px] border-green-400 rounded-[50%] w-[120px] h-[120px] animate-spin"></div> */}
        {/* </div> */}
        <div className="w-full min-h-[100vh]">
            <div className="w-[90%] max-w-[400px] py-[100px] min-h-[100vh] mx-auto flex flex-col justify-between">
            <header>
            <h1 className="text-[2rem] text-white text-center tracking-[1px] font-[700]">Darzi Record</h1>
            </header>
            <form className="min-h-[220px] translate-y-[-25px] flex flex-col justify-end" onSubmit={(e) => SignIn(e)}>
                {error === true ? <div className="mb-[10px] h-fit pl-[5px] py-[10px] border-[1px] border-red-500 rounded-[3px]"><h1 className="text-red-500 text-[1rem]">Please enter correct number</h1></div> : ""}
                <Input divClasses="w-full py-[10px] text-white" inputClasses="w-full mt-[10px] p-[10px] bg-[#404040] rounded-[5px] outline-[1px] outline-blue-400" label="Enter phone number" value={phoneNumber} onChange={(e: any) => setPhoneNumber(e.target.value)}/>
                <Input divClasses="w-full py-[10px]" inputClasses="w-full  p-[10px] bg-blue-400 rounded-[5px] cursor-pointer text-white font-[400] tracking-[1px] hover:bg-blue-500" type="Submit" value="SIGN IN"/>
            </form>
            <footer className="flex justify-center items-center">
                <h2 className="text-[white] tracking-[1px]">English</h2>
                <h2 className="ml-[10px] text-[white] tracking-[1px]">اردو</h2>
            </footer>
            </div>
            <div id="captcha-container"></div>
        </div>
        </>
    )
}

export default SignIn;