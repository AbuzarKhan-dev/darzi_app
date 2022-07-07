import React, { useState, useEffect } from "react";
// import Input from "../../components/Input/Input";
import { useDataBase } from "../../context/bdContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { FormControl, Input, InputLabel } from "@mui/material";

// interface PropsInterface {

// }
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
  mainDiv: "py-[50px] px-[30px]",
  mainHeading:
    "text-[#000000] mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]",
  formDiv: "w-[100%]",
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

const CreateOrder = () => {
  let defaultDate = new Date();
  const [startdate, setStartDate] = useState(defaultDate);
  const [chooseFile, setChooseFile] = useState("");
  const [discription, setDiscripotion] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");
  const [leftPayment, setLeftPayment] = useState("");
  const [docDetails, setdocDetails] = useState<any>();
  const [records, setRecords] = useState<any>([]);
  const { createOrder } = useDataBase();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleInput(e: any) {
    const file = e.target.files;
    console.log("FileInfo:", file);
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      console.log("Results:", e.target.result);
      const inputData = e.target.result;
      setChooseFile(inputData);
    };
  }

  function getDoc() {
    const colRef = collection(db, "Records");
    const docRef = doc(colRef, id);
    onSnapshot(docRef, (snapShots) => {
      setdocDetails(snapShots.data());
    });
  }

  const name = docDetails?.Name;
  const number = docDetails?.PhoneNumber;

  async function newOrder(e: any) {
    createOrder(
      e,
      name,
      number,
      discription,
      chooseFile,
      startdate,
      endDate,
      totalCost,
      advancePaid,
      leftPayment,
      id
    );
    navigate("/home");
  }

  useEffect(() => {
    getDoc();
  }, []);
  console.log("id:", id);
  console.log('name:',name);
  console.log('num:',number);

  return (
    <div className="py-[50px] px-[10px]">
      <h1 className="text-[#000000] mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]">
        CREATE ORDER
      </h1>
      <div className="w-[98%] p-[5px] mx-auto">
        <FormControl style={styles.form}>
          <div className={styles.mbClass}>
            <InputLabel htmlFor="name-input" style={styles.labelPos}>
              Discrition
            </InputLabel>
            <Input
              value={discription}
              onChange={(e: any) => setDiscripotion(e.target.value)}
              style={styles.input}
              name="name-input"
            />
          </div>
          <div className={styles.mbClass}>
            <Input
              type="file"
              onChange={(e: any) => handleInput(e)}
              style={styles.input}
              name={"phonenumber-input"}
            />
          </div>
          <div className={styles.mbClass}>
            <Input
              type="date"
              value={startdate.toLocaleDateString("en-CA")}
              style={styles.input}
              name="discripition-input"
            />
          </div>
          <div className={styles.mbClass}>
            <Input
              type="date"
              onChange={(e: any) => setEndDate(e.target.value)}
              style={styles.input}
              name="discripition-input"
            />
          </div>
          <div className={styles.mbClass}>
            <InputLabel htmlFor="discripition-input" style={styles.labelPos}>
              Total Cost
            </InputLabel>
            <Input
              type="text"
              value={totalCost}
              onChange={(e: any) => setTotalCost(e.target.value)}
              style={styles.input}
              name="discripition-input"
            />
          </div>
          <div className={styles.mbClass}>
            <InputLabel htmlFor="discripition-input" style={styles.labelPos}>
              Advance Paid
            </InputLabel>
            <Input
              type="text"
              value={advancePaid}
              onChange={(e: any) => setAdvancePaid(e.target.value)}
              style={styles.input}
              name="discripition-input"
            />
          </div>
          <div className={styles.mbClass}>
            <InputLabel htmlFor="discripition-input" style={styles.labelPos}>
              left Payment
            </InputLabel>
            <Input
              type="Left Payment"
              value={leftPayment}
              onChange={(e: any) => setLeftPayment(e.target.value)}
              style={styles.input}
              name="discripition-input"
            />
          </div>
          <Input
            style={styles.submit}
            type="Submit"
            value="Submit"
            onClick={(e) => newOrder(e)}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default CreateOrder;
