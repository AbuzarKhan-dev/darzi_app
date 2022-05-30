import React,{ useState, useEffect } from "react";
import "../../index.css";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDataBase } from "../../context/bdContext";
import { collection,doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";





const SelectClothesType = () => {
    const [age, setAge] = React.useState('');
    const { orderId } = useDataBase();
    

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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

  },[orderId])


    return (
        <div className="p-[20px]">
        <div className="w-[60%] max-w-[400px]">
        <FormControl fullWidth className="border-[1px] border-blue-400 text-[white]">
        <InputLabel id="demo-simple-select-label" >Cloth type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Cloth type"
          onChange={handleChange}
        >
          <MenuItem value={10}>Kameez Measurements</MenuItem>
          <MenuItem value={20}>Salwar Measurements</MenuItem>
          <MenuItem value={30}>Kurta Measurements</MenuItem>
          <MenuItem value={30}>Pajama Measurements</MenuItem>          
        </Select>
      </FormControl>
        </div>
        </div>
    )
}

export default SelectClothesType;