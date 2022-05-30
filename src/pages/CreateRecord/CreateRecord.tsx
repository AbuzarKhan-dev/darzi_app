import React,{ useState } from "react";
import "../../index.css";
import Input from "../../components/Input/Input";
import { useDataBase } from "../../context/bdContext";
import { useNavigate } from "react-router-dom";


const CreateRecord = () => {
    const [ name, setName ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ discription, setDiscripotion ] = useState("")
    const { createRecord } = useDataBase();
    const navigate = useNavigate();
    
    function newRecord (e: any) {
        createRecord(e,name,phoneNumber,discription)
        navigate("/se-or-add")
    }

    return (
        <div className="py-[50px] px-[10px]">
        <h1 className="text-green-400 mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]">
          CREATE RECORD
        </h1>
        <div className="w-[98%] p-[5px] mx-auto">
          <form
            className=" w-full max-w-[500px] py-[20px] px-[5px] mx-auto"
            onSubmit={(e) => newRecord(e)}
          >
            <div className="w-100%">
              <Input
                divClasses="w-[100%] text-[white] text-[500] rounded-[3px]"
                inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                label="Name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
           
           
            <div className="mt-[14px] w-100%">
              <Input
                divClasses="w-[100%] text-[white] text-[500] rounded-[3px]"
                inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                label="Phone number"
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mt-[14px] w-100%">
              <Input
                divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                label="Discripition"
                value={discription}
                onChange={(e: any) => setDiscripotion(e.target.value)}
              />
            </div> 
            <div className="mt-[34px] w-100%">
              <Input
                divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-none mt-[10px] bg-green-400 text-center"
                value="SUBMIT"
                type="Submit"
              />
            </div>           
          </form>
        </div>
      </div>   
    )
}

export default CreateRecord;