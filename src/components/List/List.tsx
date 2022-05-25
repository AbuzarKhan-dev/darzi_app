import React from "react";

interface PropsInterface {
    data?: []
}

// type data = {
//     doc?: any,
//     index?: number,
//     Discription?: string
// }

const List = ({data}: PropsInterface) => {
    <div>
        {/* <ul>
            {data?.map((doc,index}) => {
                <li>
                <h1>Discription</h1>
                <p>{doc?.Discription}</p> 
                <h1></h1>
                </li>

            })}
        </ul> */}
    </div>
}

export default List;