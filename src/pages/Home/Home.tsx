import React, { useEffect, useState } from "react";
import "../../index.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDataBase } from "../../context/bdContext";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface PropsInterface {
  divClasses?: string;
}

const Home = ({ divClasses }: PropsInterface) => {
  const [orders, setOrders] = useState<any>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useDataBase();

  function getCol() {
    setLoading(true);
    const colRef = collection(db, "Orders");
    onSnapshot(colRef, (snapShots) => {
      setOrders(snapShots.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  }

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

  useEffect(() => {
    getCol();
    updateDocument();
  }, [id]);

  console.log("loading:", loading)

  return (
    <>
      {loading === true ? (
        <div className="w-full min-h-[100vh] flex justify-center items-center">
          <div className="border-t-[5px] border-green-400 rounded-[50%] w-[120px] h-[120px] animate-spin"></div>
        </div>
      ) : (
        <div className={`w-full h-full ${divClasses} p-[20px]`}>
          <div
            className=" fixed bottom-[40px] right-[20px] cursor-pointer w-fit h-fit bg-green-500 flex justify-center items-center py-[20px] px-[20px] rounded-[50%] shadow-md shadow-[#404040]"
            onClick={() => navigate("/se-or-add")}
          >
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px]"
                  >
                    <path
                      fill={"#FFFFFF"}
                      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
                    />
                  </svg>
          </div>
          {orders?.map((order: any, index: number) => (
            <div
              key={index}
              className="w-fit h-fit cursor-pointer border-[1px] border-green-400 flex justify-center flex-col rounded-[4px] mt-[10px]"
              onClick={() => navigate(`/details/${order.DocID}`)}
            >
             <Card sx={{ minWidth: 275 , backgroundColor: "transparent"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: "#404040" }} color="text.secondary" gutterBottom>
                Name: {order.Name}
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#404040" }} color="text.secondary" gutterBottom>
                Contact: {order.PhoneNunmber}
              </Typography>
      </CardContent>
      </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
