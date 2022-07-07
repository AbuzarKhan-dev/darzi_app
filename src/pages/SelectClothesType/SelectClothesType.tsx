import React, { useState, useEffect } from "react";
import "../../index.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDataBase } from "../../context/bdContext";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc, query, where } from "firebase/firestore";
import Button from "@mui/material/Button";

interface measurementInterface {
  width: string;
  height: string;
  type: string;
  label: string;
}

const SelectClothesType = () => {
  const [age, setAge] = React.useState("");
  const { orderId } = useDataBase();
  const { orderID } = useParams();
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  function getMeasurements() {
    // setLoading(true);
    const colRef = collection(
      db,
      "measurements",);
      const q = query(colRef , where("uid","==", orderID))
    onSnapshot(q, (snapShots) => {
      setMeasurements(snapShots.docs.map((doc) => doc.data()));
      // setLoading(false);
    });
  }

  console.log('measure: ', measurements)

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
  console.log("measurement: ", measurements);

  return (
    <div className="p-[20px]">
      <div className="flex flex-col max-w-[400px] py-[30px] gap-4">
        {measurements?.map((item: any, index: number) => (
          <Button variant="contained">{item.type}</Button>
        ))}
      </div>
      <div className="w-[100%] max-w-[400px]">
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
        className="fixed bottom-[60px] right-[16px] shadow-[15px 4px 4px rgb(0,0,0,0.5)] bg-blue-600 py-[5px] px-[20px] mr-[10px] cursor-pointer"
        onClick={() => navigate(`/create-order/${orderID}`)}
      >
        <span className="text-white">Create Order</span>
      </div>
    </div>
  );
};

export default SelectClothesType;
