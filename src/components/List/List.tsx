import React from "react";
import { useNavigate } from "react-router-dom";
import { useDataBase } from "../../context/bdContext";

interface PropsInterface {
  data?: [{ Name: string; PhoneNumber: string; redocid: string }];
  divClasses?: string;
  ulClasses?: string;
  insideDivClasses?: string;
  liClasses?: string;
  hClasses?: string;
  pClasses?: string;
}

const List = ({
  data,
  divClasses,
  ulClasses,
  insideDivClasses,
  liClasses,
  hClasses,
  pClasses,
}: PropsInterface) => {
  const navigate = useNavigate();
  const { newOrder } = useDataBase();

  function createOrder(name: string, number: string, id: string) {
    newOrder(name, number);
    navigate(`/se-cl-type/${id}`);
  }
  return (
    <div className={divClasses}>
      <ul className={ulClasses}>
        {data?.map((doc, index) => (
          <div
            className={insideDivClasses}
            key={index}
            onClick={() => createOrder(doc?.Name, doc?.PhoneNumber, doc?.redocid)}
          >
            <li className={liClasses}>
              <h1 className={hClasses}>{doc?.Name}</h1>
              <p className={pClasses}>{doc?.PhoneNumber}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default List;
