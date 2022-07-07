import React, { useEffect, useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDataBase } from "../../context/bdContext";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface stylesInterface {
  loaderDiv: string;
  loader: string;
  mainDiv: string;
  buttonDiv: string;
  cardMainDiv: string;
  list: {
    width: any,
    display: any,
    flexDirection: any,
    justifyContent: any,
    alignItems: any,
  }
  listItem: string;
  
}

const styles: stylesInterface = {
  loaderDiv: "w-full min-h-[100vh] flex justify-center items-center",
  loader:
    "border-t-[5px] border-green-400 rounded-[50%] w-[120px] h-[120px] animate-spin",
  mainDiv: "w-full h-full p-[20px]",
  buttonDiv:
    "fixed bottom-[40px] right-[20px] cursor-pointer bg-blue-600 flex justify-center items-center py-[5px] px-[40px] shadow-sm shadow-[#404040]",
  cardMainDiv:
    "w-[100%] cursor-pointer border-b-[1px] border-[#e5e5e5]",
    list: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  listItem: "w-[100%]",
};
interface PropsInterface {
  divClasses?: string;
}

const Home = ({ divClasses }: PropsInterface) => {
  const [orders, setOrders] = useState<any>();
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  const { id } = useDataBase();

  async function updateDocument() {
    if (id !== "") {
      try {
        const docRef = doc(collection(db, "Orders"), id);
        await updateDoc(docRef, { DocID: id });
      } catch (e) {
        console.log("error:", e);
      }
    } else {
      console.log("ID not found");
    }
  }

  function getOrdersCollection() {
    
    const colRef = collection(db, "new_order");
     onSnapshot(colRef, (snapShots) => 
       setOrders(snapShots.docs.map((doc) => (doc.data()))
      ));
      setLoading(false);
}

  useEffect(() => {
    updateDocument();
    getOrdersCollection();
  }, [id]);

  return (
    <>
      {loading === true ? (
        <div className={styles.loaderDiv}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={`${styles.mainDiv} ${divClasses}`}>
          <div
            className={styles.buttonDiv}
            onClick={() => navigate("/se-or-add")}
          >
            <span className="text-white">Create Order</span>
          </div>
          <div className="px-[0px]">
            <h1 className="text-[2rem]">Orders</h1>
          </div>
          {orders?.map((order: any) => (
            <div
              className={styles.cardMainDiv}
              onClick={() => navigate(`/details/${order.DocID}`)}
            >
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <List style={{ width: "100%", paddingTop: '8px', paddingBottom:'0px', paddingLeft:'14px'}}>
                  <ListItem
                    style={styles.list}
                    className={styles.listItem}
                    disablePadding
                  >
                    <ListItemText className={styles.listItem} primary={order?.Name} />
                    <ListItemText className={styles.listItem} primary={order?.Number} />
                  </ListItem>
                </List>
              </Box>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
