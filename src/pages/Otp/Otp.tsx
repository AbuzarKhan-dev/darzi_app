import React, { useState } from "react";
import "../../index.css";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface styleInterface {
  mainDiv: string;
  wrapperDiv: string;
  header: string;
  headingOne: string;
  form: { transform: any };
  input: {
    width: string;
  };
  submit: { marginTop: any; backgroundColor: any; padding: any; color: any };
}

const styles: styleInterface = {
  mainDiv: "w-full min-h-[100vh]",
  wrapperDiv:
    "w-[90%] max-w-[400px] py-[100px] min-h-[100vh] mx-auto flex flex-col justify-around",
  header: "translate-y-[-10px]",
  headingOne:
    "text-[2rem] text-[#000000] text-center tracking-[2px] font-[700]",
  form: { transform: "translateY(-45px)" },
  input: {
    width: "100%",
  },
  submit: {
    marginTop: "20px",
    backgroundColor: "#0189ff",
    padding: "8px 0px",
    color: "white",
  },
};

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  function conf(e: any, otpNumber: string) {
    e.preventDefault();
    console.log("code => ", otpNumber);
    window.confirmationResult
      .confirm(otpNumber)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        navigate("/home");

        console.log("user is signedIN", user);
        // ...
      })
      .catch((error: any) => {
        console.log("failed to signIN");
        // ...
      });
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.wrapperDiv}>
        <header className={styles.header}>
          <h1 className={styles.headingOne}>OTP</h1>
        </header>
        <FormControl style={styles.form}>
          <InputLabel htmlFor="my-input">Enter OTP</InputLabel>
          <Input
            autoFocus={true}
            value={otp}
            onChange={(e: any) => setOtp(e.target.value)}
            style={styles.input}
          />
          <Input
            style={styles.submit}
            type="Submit"
            value="Submit"
            onClick={(e) => conf(e, otp)}
          />
        </FormControl>
      </div>
      <div id="captcha-container"></div>
    </div>
  );
};

export default Otp;
