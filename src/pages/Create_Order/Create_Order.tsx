import React, { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import { useDataBase } from "../../context/bdContext";
import { useNavigate } from "react-router-dom";


// interface PropsInterface {

// }

const CreateOrder = () => {
  let defaultDate = new Date();
  const [startdate, setStartDate] = useState(defaultDate);
  const [chooseFile, setChooseFile] = useState("");
  const [discription, setDiscripotion] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");
  const [leftPayment, setLeftPayment] = useState("");
  const { createOrder } = useDataBase();
  const navigate = useNavigate();

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

  async function newOrder(e: any) {
      createOrder(
        e,
        discription,
        chooseFile,
        startdate,
        endDate,
        totalCost,
        advancePaid,
        leftPayment
      );
    navigate("/");
  }


  return (
        <div className="py-[50px] px-[10px]">
          <h1 className="text-green-400 mb-[30px] w-fit mx-auto text-[2rem] tracking-[1px]">
            Create Order
          </h1>
          <div className="w-[98%] p-[5px] mx-auto">
            <form
              className=" w-full max-w-[500px] py-[20px] px-[5px] mx-auto"
              onSubmit={(e: any) => newOrder(e)}
            >
              <div className="w-100%">
                <Input
                  divClasses="w-[100%] text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="Discripition"
                  value={discription}
                  onChange={(e: any) => setDiscripotion(e.target.value)}
                />
              </div>
              <div className="mt-[20px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px] "
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-none mt-[10px]"
                  type="file"
                  name="filename"
                  onChange={(e: any) => handleInput(e)}
                />
              </div>
              <div className="mt-[14px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="Start Date"
                  type="date"
                  value={startdate.toLocaleDateString("en-CA")}
                />
              </div>
              <div className="mt-[14px] w-100%">
                <Input
                  divClasses="w-[100%] text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="End Date"
                  type="date"
                  onChange={(e: any) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mt-[14px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="Total Cost"
                  value={totalCost}
                  onChange={(e: any) => setTotalCost(e.target.value)}
                />
              </div>
              <div className="mt-[14px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="Advance Paid"
                  value={advancePaid}
                  onChange={(e: any) => setAdvancePaid(e.target.value)}
                />
              </div>
              <div className="mt-[14px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px]"
                  inputClasses="w-[100%] p-[10px] bg-[#2E3037] rounded-[3px] outline-green-400 mt-[10px]"
                  label="Left Payment"
                  value={leftPayment}
                  onChange={(e: any) => setLeftPayment(e.target.value)}
                />
              </div>
              <div className="mt-[20px] w-100%">
                <Input
                  divClasses="w-[100%]  text-[white] text-[500] rounded-[3px] "
                  inputClasses="w-[100%] p-[10px] bg-green-500 rounded-[3px] outline-none mt-[10px]"
                  type="Submit"
                  value="SUBMIT"
                />
              </div>
            </form>
          </div>
        </div>      
  );
};

export default CreateOrder;
