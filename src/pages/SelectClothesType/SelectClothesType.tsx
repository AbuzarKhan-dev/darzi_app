import React, { useState, useEffect } from "react";
import "../../index.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDataBase } from "../../context/bdContext";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import { isTemplateTail } from "typescript";

interface measurementInterface {
  width: string,
  height: string,
  type: string,
  label: string

}

const SelectClothesType = () => {
  const [age, setAge] = React.useState("");
  const { orderId } = useDataBase();
  const { orderID } = useParams();
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState<any>([])

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  function getMeasurements() {
    // setLoading(true);
    const colRef = collection(db, "Records",orderID ? orderID : "","measurements");
    onSnapshot(colRef, (snapShots) => {
      setMeasurements(snapShots.docs.map((doc) => doc.data()));
      // setLoading(false);
    });
  }

  async function updateDocument() {
    if (orderId !== "") {
      try {
        const docRef = doc(collection(db, "order"), orderId);
        await updateDoc(docRef, { orderID: orderId });
      } catch (e) {
        console.log("error:", e);
      }
    } else {
      console.log("ID not found");
    }
  }

  useEffect(() => {
    updateDocument();
    getMeasurements();
  }, [orderId]);
  console.log("id: ", orderID);
  console.log('measurement: ', measurements)

  return (
    <div className="p-[20px]">
      <div className="flex flex-col max-w-[400px] py-[30px] gap-4">
      {measurements?.map((item:any,index:number) => 
        <Button variant="contained">{item.type}</Button>
      )}
      </div>
      <div className="w-[60%] max-w-[400px]">
        <FormControl
          fullWidth
          className="border-[1px] border-blue-400 rounded-[5px] text-[#000000]"
        >
          <InputLabel id="demo-simple-select-label" className="text-[#ffffff]">
            Cloth type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Cloth type"
            onChange={handleChange}
            className="text-[white]"
          >
            <MenuItem
              onClick={() => navigate(`/se-cl-type/${orderID}/Kameez`)}
              value={10}
            >
              Kameez Measurements
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/se-cl-type/${orderID}/Salwar`)}
              value={20}
            >
              Salwar Measurements
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/se-cl-type/${orderID}/Kurta`)}
              value={30}
            >
              Kurta Measurements
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/se-cl-type/${orderID}/Pajama`)}
              value={30}
            >
              Pajama Measurements
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
            className="fixed bottom-[60px] right-[16px] shadow-[15px 4px 4px rgb(0,0,0,0.5)] bg-[#404040] rounded-[50%] w-fit h-fit p-[10px] mr-[10px] cursor-pointer"
            onClick={() => navigate(`/create-order/${orderID}`)}
          >
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              className="w-[30px] [h-30px]"
            >
              <path
                fill="#000000"
                d="M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"
              />
              <path
                fill="#fff"
                d="M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"
              />
              <g fill="#000000">
                <path d="M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z" />
                <path d="M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z" />
              </g>
              <g fill="#404040">
                <rect x="22" y="16" width="4" height="18" />
                <rect x="15" y="23" width="18" height="4" />
              </g>
            </svg>
          </div>
    </div>
  );
};

export default SelectClothesType;
