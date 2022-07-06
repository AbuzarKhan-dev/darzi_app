import React, { useState } from "react";
import "../../index.css";
import { FormControl, Input, InputLabel } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDataBase } from "../../context/bdContext";

interface stylesInterface {
  mainDiv: string;
  mainHeading: string;
  formDiv: string;
  form: {
    width: string;
    maxWidth: string;
    margin: string;
  };
  input: {
    width: string;
    color: string;
  };
  submit: {
    marginTop: any;
    backgroundColor: any;
    padding: any;
    color: any;
    width: string;
  };
  mbClass: string;
  labelPos: {
    position: any;
    top: any;
    left: any;
  };
}

const styles: stylesInterface = {
  mainDiv: "py-[50px] px-[10px]",
  mainHeading:
    "text-[#000000] mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]",
  formDiv: "w-[98%] p-[5px] mx-auto flex justify-center",
  form: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    width: "100%",
    color: "#000000",
  },
  submit: {
    marginTop: "10px",
    backgroundColor: "#0189ff",
    padding: "8px 0px",
    color: "white",
    width: "100%",
  },
  mbClass: "mb-[20px] relative",
  labelPos: {
    position: "absolute",
    top: "0",
    left: "-12px",
  },
};

const AddMeasurements = () => {
  const { orderID, type } = useParams();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const { newOrder } = useDataBase();
  const navigate = useNavigate();

  function label() {
    if (type === "Kameez" || type === "Kurta") {
      return "Cuff,s";
    } else if (type === "Salwar" || type === "Pajama") {
      return "Poncha";
    } else {
      return "";
    }
  }

  function createOrder(e: any) {
    console.log("event fired");
    newOrder(e, orderID, type, inputOne, inputTwo, inputThree);
    navigate(`/se-cl-type/${orderID}`);
  }

  console.log("orderID:", orderID, "type:", type);

  return (
    <div className="min-h-[100vh] w-[100%] max-w-[400px] mx-auto py-[50px]">
      <h1 className="text-[#404040] text-[28px] text-center mb-[50px]">
        {type}
      </h1>
      <FormControl style={styles.form}>
        <div className={styles.mbClass}>
          <InputLabel htmlFor="name-input" style={styles.labelPos}>
            Enter width
          </InputLabel>
          <Input
            value={inputOne}
            onChange={(e: any) => setInputOne(e.target.value)}
            style={styles.input}
            name="name-input"
          />
        </div>
        <div className={styles.mbClass}>
          <InputLabel htmlFor="phonenumber-input" style={styles.labelPos}>
            Enter length
          </InputLabel>
          <Input
            value={inputTwo}
            onChange={(e: any) => setInputTwo(e.target.value)}
            style={styles.input}
            name={"phonenumber-input"}
          />
        </div>
        <div className={styles.mbClass}>
          <InputLabel htmlFor="discripition-input" style={styles.labelPos}>
            Enter extra
          </InputLabel>
          <Input
            value={inputThree}
            onChange={(e: any) => setInputThree(e.target.value)}
            style={styles.input}
            name="discripition-input"
          />
        </div>
        <Input
          style={styles.submit}
          type="Submit"
          value="Submit"
          onClick={(e) => createOrder(e)}
        />
      </FormControl>
    </div>
  );
};

export default AddMeasurements;
