import React, { useState } from "react";
import "../../index.css";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useDataBase } from "../../context/bdContext";
import { useNavigate } from "react-router-dom";

interface stylesInterface {
  mainDiv: string;
  mainHeading: string;
  formDiv: string;
  form: {
    width: string,
    maxWidth: string,
    margin: string,
  },
  input: {
    width: string,
    color: string,
  };
  submit: { marginTop: any; backgroundColor: any; padding: any; color: any, width: string };
  mbClass: string,
  labelPos: {
    position: any,
    top: any,
    left: any
  }
}

const styles: stylesInterface = {
  mainDiv: "py-[50px] px-[10px]",
  mainHeading:
    "text-[#000000] mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]",
  formDiv: "w-[98%] p-[5px] mx-auto flex justify-center",
  form : {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    width: "100%",
    color: '#000000'
  },
  submit: {
    marginTop: "30px",
    backgroundColor: "#0189ff",
    padding: "8px 0px",
    color: "white",
    width: '100%'
  },
  mbClass: 'mb-[20px] relative',
  labelPos: {
    position: 'absolute',
    top: '0',
    left: '-12px'
  }
};

const CreateRecord = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discription, setDiscripotion] = useState("");
  const { createRecord } = useDataBase();
  const navigate = useNavigate();

  function newRecord(e: any) {
    createRecord(e, name, phoneNumber, discription);
    navigate("/se-or-add");
  }

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.mainHeading}>CREATE RECORD</h1>
      <div className={styles.formDiv}>
        <FormControl style={styles.form}>
          <div className={styles.mbClass}>
          <InputLabel htmlFor="name-input" style={styles.labelPos}>Enter name</InputLabel>
          <Input
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            style={styles.input}
            name="name-input"
          />
          </div>
          <div className={styles.mbClass}>
          <InputLabel htmlFor="phonenumber-input" style={styles.labelPos}>Enter phone number</InputLabel>
          <Input
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
            style={styles.input}
            name={"phonenumber-input"}
          />
          </div >
          <div className={styles.mbClass}>
          <InputLabel htmlFor="discripition-input" style={styles.labelPos}>Enter discription</InputLabel>
          <Input
            value={discription}
            onChange={(e: any) => setDiscripotion(e.target.value)}
            style={styles.input}
            name='discripition-input'
          />
          </div>
          <Input
            style={styles.submit}
            type="Submit"
            value="Submit"
            onClick={(e) => newRecord(e)}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default CreateRecord;
