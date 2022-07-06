import React, { useState, useEffect } from "react";
import "../../index.css";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDataBase } from "../../context/bdContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface stylesInterface {
  mainDiv: string;
  wrapperDiv: string;
  insideWrapDiv: string;
  cardMainDiv: string;
  list: string;
  listItem: string;
  svgDiv: string;
}

const styles: stylesInterface = {
  mainDiv: "w-full min-h-[100vh]",
  wrapperDiv: "w-full min-h-[100vh] relative",
  insideWrapDiv: "w-[92%] max-w-[400px] mx-auto pt-[20px]",
  cardMainDiv:
    "mx-auto cursor-pointer border-[1px] border-blue-400 rounded-[4px] mt-[10px] bd-green-400",
  list: "w-[100%] py-[5px]",
  listItem: "px-[10px]",
  svgDiv:
    "fixed bottom-[60px] right-[16px] shadow-[15px 4px 4px rgb(0,0,0,0.5)] bg-[#404040] rounded-[50%] w-fit h-fit p-[10px] mr-[10px] cursor-pointer",
};

const SearchOrAddRecord = () => {
  const [inputDisplay, setInputDisplay] = useState("none");
  const [inputSearch, setInputSearch] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any>([]);
  const { redocId } = useDataBase();
  const navigate = useNavigate();

  function getRecords() {
    setLoading(true);
    const colRef = collection(db, "Records");
    onSnapshot(colRef, (snapShots) => {
      setRecords(snapShots.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  }

  async function updateDocument() {
    if (redocId !== "") {
      try {
        const docRef = doc(collection(db, "Records"), redocId);
        await updateDoc(docRef, { redocid: redocId });
      } catch (e) {
        console.log("error:", e);
      }
    } else {
      console.log("ID not found");
    }
  }

  useEffect(() => {
    getRecords();
    updateDocument();
  }, [redocId]);
  console.log("input: ", records);

  return (
    <div className={styles.mainDiv}>
      <div className="">
        <div className={styles.wrapperDiv}>
          <div className={styles.insideWrapDiv}>
            <Box
              component="form"
              sx={{
                width: "100",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-name"
                label="Search Record"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-[100%]"
              />
              <List className={styles.list}>
                {records?.map((record: any, index: number) => (
                  <div
                    key={index}
                    className={styles.cardMainDiv}
                    onClick={() => navigate(`/se-cl-type/${record.redocid}`)}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                      className={styles.listItem}
                      disablePadding
                    >
                      <ListItemText className="w-fit" primary={record.Name} />
                      <ListItemText
                        className="w-fit"
                        primary={record.PhoneNumber}
                      />
                    </ListItem>
                  </div>
                ))}
              </List>
            </Box>
          </div>

          <div
            className={styles.svgDiv}
            onClick={() => navigate("/create-record")}
          >
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              className="w-[30px] [h-30px]"
            >
              <path
                fill="#000000"
                d="M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"
              />
              <path
                fill="#fff"
                d="M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"
              />
              <g fill="#000000">
                <path d="M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z" />
                <path d="M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z" />
              </g>
              <g fill="#404040">
                <rect x="22" y="16" width="4" height="18" />
                <rect x="15" y="23" width="18" height="4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOrAddRecord;
