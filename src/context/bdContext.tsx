import React, { useContext, createContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface AppContextInterface {
  createOrder?: any;
  id?: string;
  setDocId?: any;
  docid?: string;
}

export const dbContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export function useDataBase() {
  return useContext(dbContext);
}

// type createOrderParaTypes = {
//   discription?: string,
//   chooseFile?: string,
//   startdate?: any,
//   endDate?: string,
//   totalCost?: string,
//   advancePaid?: string,
//   leftPayment?: string

// }

interface PropsInterface {
  children?: React.ReactNode;
}

const DbProvider = ({ children }: PropsInterface) => {
  const [docid, setDocId] = useState("");
  const [id, setid] = useState("");

  async function createOrder(
    e: any,
    discription: string,
    chooseFile: string,
    startdate: any,
    endDate: string,
    totalCost: string,
    advancePaid: string,
    leftPayment: string
  ) {
    e.preventDefault();
    const colRef = collection(db, "Orders");
    try {
      const docRef = await addDoc(colRef, {
        Discription: discription,
        UploadedFile: chooseFile,
        Startdate: startdate,
        EndDate: endDate,
        TotalCost: totalCost,
        AdvancePaid: advancePaid,
        LeftPayment: leftPayment,
        DocID: "",
      });
      setid(docRef.id);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  const AppContextValue: AppContextInterface = {
    createOrder,
    id,
    setDocId,
    docid,
  };

  return (
    <dbContext.Provider value={AppContextValue}>{children}</dbContext.Provider>
  );
};

export default DbProvider;
