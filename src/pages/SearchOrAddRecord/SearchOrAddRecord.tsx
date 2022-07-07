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
  textFeild: { paddingTop: any; paddingBottom: any };
  cardMainDiv: string;
  list: string;
  listPadding: { paddingTop: any; paddingBottom: any };
  listItem: string;
  listItemsFlex: {
    display: any;
    flexDirection: any;
    justifyContent: any;
    alignItems: any;
  };
  svgDiv: string;
}

const styles: stylesInterface = {
  mainDiv: "w-full min-h-[100vh]",
  wrapperDiv: "w-full min-h-[100vh] relative",
  insideWrapDiv: "w-[92%] max-w-[400px] mx-auto pt-[20px]",
  textFeild: { paddingTop: "0px", paddingBottom: "0px" },
  cardMainDiv:
    "mx-auto cursor-pointer border-b-[1px] border-[#e5e5e5] bd-green-400",
  list: "w-[100%] py-[5px]",
  listPadding: { paddingTop: "8px", paddingBottom: "0px" },
  listItem: "px-[10px]",
  listItemsFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  svgDiv:
    "fixed bottom-[40px] right-[20px] cursor-pointer bg-blue-600 flex justify-center items-center py-[5px] px-[30px] shadow-sm shadow-[#404040]",
};

const SearchOrAddRecord = () => {
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
            <h1 className="text-[1.2rem] mb-[6px]">
              Search customer to add record
            </h1>
            <Box
              component="form"
              sx={{
                width: "100",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={styles.textFeild}
                id="outlined-name"
                label="Search Record"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-[100%]"
              />
              <List style={styles.listPadding} className={styles.list}>
                {records?.map((record: any, index: number) => (
                  <div
                    key={index}
                    className={styles.cardMainDiv}
                    onClick={() => navigate(`/se-cl-type/${record.redocid}`)}
                  >
                    <ListItem
                      style={styles.listItemsFlex}
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
            <span className="text-white">Create Record</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOrAddRecord;
