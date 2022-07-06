import React, { useState, useEffect } from "react";
import { FormControl, Input, InputLabel } from "@mui/material";
import "../../index.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

interface styleInterface {
  loaderDiv: string;
  loader: string;
  mainDiv: string;
  wrapperDiv: string;
  logoHeading: string;
  errorDiv: string;
  errorLabel: string;
  form: {
    minHeight: any;
    transform: any;
    display: any;
    justifyContent: any;
    flexDirection: any;
  };
  input: {
    width: string;
  };
  submit: { marginTop: any; backgroundColor: any; padding: any ; color:any, cursor:any};
  ftHeadingEn: string;
  ftHeadingUr: string;
}

const styles: styleInterface = {
  loaderDiv: "w-full min-h-[100vh] flex justify-center items-center",
  loader:
    "border-t-[5px] border-blue-400 rounded-[50%] w-[120px] h-[120px] animate-spin",
  mainDiv: "w-full min-h-[100vh]",
  wrapperDiv:
    "w-[90%] max-w-[400px] py-[100px] min-h-[100vh] mx-auto flex flex-col justify-between",
  logoHeading:
    "text-[2rem] text-[#000000] text-center tracking-[1px] font-[700]",
  errorDiv:
    "mb-[14px] h-fit pl-[5px] py-[10px] border-[1px] border-red-500 rounded-[3px]",
  errorLabel: "text-red-500 text-[1rem]",
  form: {
    minHeight: "220px",
    transform: "translateY(-25px)",
    display: "flex",
    justifyContent: "end",
    flexDirection: "column",
  },
  input: {
    width: "100%",
  },
  submit: { marginTop: "10px", backgroundColor: "#0189ff", padding: "8px 0px", color:'white', cursor: 'pointer' },
  ftHeadingEn:
    "text-[#000000] tracking-[1px] hover:underline hover:cursor-pointer",
  ftHeadingUr:
    "ml-[10px] text-[#000000] tracking-[1px] hover:underline hover:cursor-pointer",
};

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('+92');
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(false);
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
    if (
      phoneNumber.length === 13 &&
      phoneNumber[0] === "+" &&
      phoneNumber[1] === "9" &&
      phoneNumber[2] === "2"
    ) {
      settingCaptcha();
      setdisable(true);
      const appVerifier = window.recaptchaVerifier;
      await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setConfirmation(confirmationResult);
          console.log("phone verification is working");
          setLoading(false);
          navigate("/otp");
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    } else {
      console.log("wrong number");
      setError(true);
    }
  }

  useEffect(() => {
    setError(false);
    console.log('new patch')
  }, [phoneNumber]);
  
  return (
    <>
      {loading === true ? (
        <div className={styles.loaderDiv}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.mainDiv}>
          <div className={styles.wrapperDiv}>
            <header>
              <h1 className={styles.logoHeading}>Darzi Record</h1>
            </header>
            {
              <div style={styles.form}>
                {error === true ? (
                  <div className={styles.errorDiv}>
                    <h1 className={styles.errorLabel}>
                      Please enter correct number
                    </h1>
                  </div>
                ) : (
                  ""
                )}
                <FormControl>
                  <InputLabel htmlFor="my-input">Enter Phone Number</InputLabel>
                  <Input
                    autoFocus={true}
                    value={phoneNumber}
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                    style={styles.input}
                  />
                  <Input
                    style={styles.submit}
                    type="Submit"
                    value="Sign in"
                    onClick={(e) => SignIn(e)}
                    disabled={disable}
                  />
                </FormControl>
              </div>
            }
            <footer className="flex justify-center items-center">
              <h2 className={styles.ftHeadingEn}>English</h2>
              <h2 className={styles.ftHeadingUr}>اردو</h2>
            </footer>
          </div>
        </div>
      )}
      <div id="captcha-container"></div>
    </>
  );
};

export default SignIn;
