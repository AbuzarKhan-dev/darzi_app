import React, { useEffect, useState } from "react";
import "../../index.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot,  doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDataBase } from "../../context/bdContext";

interface PropsInterface {
  divClasses?: string;
}

const Home = ({ divClasses }: PropsInterface) => {
  const [orders, setOrders] = useState<any>();
  const navigate = useNavigate();
  const { id, setDocId } = useDataBase();

  function getCol() {
    const colRef = collection(db, "Orders");
    onSnapshot(colRef, (snapShots) => {
      setOrders(snapShots.docs.map((doc) => doc.data()));
    });
  }

  function viewOrderDetail(docid: string) {
    setDocId(docid);
    navigate(`./${docid}`);
  }

  async function updateDocument() {
    if(id !== ""){
      try {
        const docRef = doc(collection(db, "Orders"), id);
        await updateDoc(docRef, { DocID: id });
      } catch (e) {
        console.log("error:", e);
      }  
    } else {
      console.log("ID not found")
    }
    
}

  useEffect(() => {
    getCol();
    updateDocument();
  }, [id]);

  return (
    <div className={`w-full h-full ${divClasses} p-[20px]`}>
      <div
        className="cursor-pointer w-fit h-fit bg-[#F44250] flex justify-center items-center py-[10px] px-[50px] rounded-[4px]"
        onClick={() => navigate("/create_order")}
      >
        <Button
          divClasses=""
          title="CREATE ORDER"
          buttonClasses="bg-transparent flex justify-center items-center text-white font-[500]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="w-[14px] h-[14px]"
        >
          <path
            fill="#ffffff"
            d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
          />
        </svg>
      </div>
      {orders?.map((order: any, index: number) => (
        <div
          key={index}
          className="w-fit h-fit cursor-pointer bg-blue-400 flex justify-center items-center py-[10px] px-[50px] rounded-[4px] mt-[20px]"
          onClick={() => viewOrderDetail(order.DocID)}
        >
          <Button
            divClasses=""
            title="CHECK DETAILS"
            buttonClasses="bg-transparent flex justify-center items-center text-white font-[500]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-[14px] h-[14px]"
          >
            <path
              fill="#ffffff"
              d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Home;
