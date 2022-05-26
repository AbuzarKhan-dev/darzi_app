import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../index.css";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import moment from "moment";


const ViewOrderDetail = () => {
  const [docDetails, setdocDetails] = useState<any>();
  const [date, setdate] = useState();
  const { docid } = useParams();

  function getDoc() {
    const colRef = collection(db, "Orders");
    const docRef = doc(colRef, docid);
    onSnapshot(docRef, (snapShots) => {
      setdocDetails(snapShots.data());
    });
  }

  useEffect(() => {
    getDoc();
    setdate(docDetails?.Startdate);
  }, []);

  return (
    <div className="w-full h-[100vh]">
      <div className="py-[50px] px-[10px]">
        <ul className="px-[10px] py-[40px] border-2 border-white">
          <div className="mb-[10px] mt-[10px]">
            <li className=" flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                Discription{" "}
              </h1>
              <p className="text-[#FFCC66]">{docDetails?.Discription}</p>
            </li>
          </div>
          <div className="mb-[10px] mt-[10px]">
            <li className=" flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                Start-date{" "}
              </h1>
              <p className="text-[#FFCC66]">
                {moment(date).format("MMM Do YY")}
              </p>
            </li>
          </div>
          <div className="mb-[10px]">
            <li className="flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                End-date{" "}
              </h1>
              <p className="text-[#FFCC66]">{docDetails?.EndDate}</p>
            </li>
          </div>
          <div className="mb-[10px]">
            <li className="flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                Total cost{" "}
              </h1>
              <p className="text-[#FFCC66]">{docDetails?.TotalCost}</p>
            </li>
          </div>
          <div className="mb-[10px]">
            <li className="flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                Advance paid{" "}
              </h1>
              <p className="text-[#FFCC66]">{docDetails?.AdvancePaid}</p>
            </li>
          </div>
          <div className="mb-[10px]">
            <li className="flex">
              <h1 className="w-[150px] text-[#FFCC66] text-[16px] font-[500]">
                Left payment{" "}
              </h1>
              <p className="text-[#FFCC66]">{docDetails?.LeftPayment}</p>
            </li>
          </div>
          <li className="">
            <img
              src={docDetails?.UploadedFile}
              className="w-[240px] h-[120px]"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
