import React,{ useState } from "react";
import "../../index.css";
import Input from "../../components/Input/Input";
import { useParams } from "react-router-dom";
import { useDataBase } from "../../context/bdContext";

interface PropsInterface {

}


const AddMeasurements = ({}: PropsInterface) => {
    const { orderID ,type } = useParams();
    const [ inputOne, setInputOne ] = useState("");
    const [ inputTwo, setInputTwo ] = useState("");
    const [ inputThree, setInputThree ] = useState("");
    const { newOrder } = useDataBase();



    function label () {
        if(type === "Kameez" || type === "Kurta") {
            return "Cuff,s"
        } else if( type === "Salwar" || type === "Pajama") {
            return "Poncha"
        } else {
            return ''
        }
    }

    function createOrder (e: any) {
        newOrder(e, orderID, type, inputOne, inputTwo, inputThree)
    }

    console.log("orderID:", orderID, "type:", type)

    return (
        <div className="min-h-[100vh] w-[100%] py-[50px]">
            <h1 className="text-[#404040] text-[28px] text-center mb-[30px]">{type}</h1>
          <form className="w-[94%] max-w-[400px] mx-auto px-[5px]" onSubmit={(e) => createOrder(e)}>
              <Input divClasses="w-[100%] py-[10px]" inputClasses="w-[100%] py-[10px] border-[1px] border-[#404040]" label="Width" value={inputOne} onChange={(e: any) => setInputOne(e.target.value)}/>
              <Input divClasses="w-[100%] py-[10px]" inputClasses="w-[100%] py-[10px] border-[1px] border-[#404040]" label="Length"value={inputTwo} onChange={(e: any) => setInputTwo(e.target.value)}/>
              <Input divClasses="w-[100%] py-[10px]" inputClasses="w-[100%] py-[10px] border-[1px] border-[#404040]" label={label()} value={inputThree} onChange={(e: any) => setInputThree(e.target.value)}/>
              <Input divClasses="w-[100%] py-[10px]" inputClasses="w-[100%] py-[10px] bg-blue-400" type="Submit" value="Submit"/>
          </form>
        </div>
    )
}

export default AddMeasurements;