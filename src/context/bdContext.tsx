import React, { useContext, createContext, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface AppContextInterface {
  createRecord?: any;
  createOrder?: any;
  newOrder?: any;
  redocId?: string;
  orderId?: string,
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

interface PropsInterface {
  children?: React.ReactNode;
}

const DbProvider = ({ children }: PropsInterface) => {
  const [docid, setDocId] = useState("");
  const [id, setid] = useState("");
  const [ redocId, setredocId ] = useState("");
  const [orderId, setOrderId ] = useState<any>("");


  async function createRecord(e: any,name: string, phoneNumber: string, discription: string ) {
    e.preventDefault();
    try {
      const colRef = collection(db, "Records");
      const docRef = await addDoc(colRef, {
        Name: name,
        PhoneNumber: phoneNumber,
        discrition: discription,
        redocid: "",
      });
      console.log("Document written with ID: ", docRef.id);
      setredocId(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function createOrder(
    e: any,
    name: string,
    phoneNumber: string,
    discription: string,
    chooseFile: string,
    startdate: any,
    endDate: string,
    totalCost: string,
    advancePaid: string,
    leftPayment: string,
    orderID: string,
  ) {
    e.preventDefault();
    const colRef = collection(db, "Records", orderID, "new_order");
    
    try {
      const docRef = await addDoc(colRef, {
        Name: name,
        Number: phoneNumber,
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

    // async function newOrder (name: string, phoneNumber: string) {
    //   const colRef = collection(db, "order");
    //   try {
    //     const docRef = await addDoc(colRef, {
    //       name,
    //       phoneNumber,
    //       orderID: "",
    //     })
    //    setOrderId(docRef.id)
    //   }
    //   catch (e) {
    //      console.log("error:", e)
    //   }
    // }

    async function newOrder (e: any, orderID: string, type: string, inputOne: string, inputTwo: string, inputThree: string) {
      e.preventDefault();
      const colRef = collection(db, "Records", orderID, 'measurements');
      try {
          await addDoc(colRef, {
          type: type,
          width: inputOne,
          height: inputTwo,
          label : inputThree
        })
      }
      catch (e) {
         console.log("error:", e)
      }
    }

  const AppContextValue: AppContextInterface = {
    createRecord,
    createOrder,
    newOrder,
    redocId,
    orderId,
    id,
    setDocId,
    docid,
  };

  return (
    <dbContext.Provider value={AppContextValue}>{children}</dbContext.Provider>
  );
};

export default DbProvider;
