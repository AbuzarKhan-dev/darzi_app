import React from "react";
import "../../index.css";
import List from "../List/List";


interface PropsInterface {
    data ?: [{Name: string, PhoneNumber: string, redocid: string}]
}

const Records = ({data}: PropsInterface) => {
    return (
        <div>
            <List data={data} divClasses="w-[90%] mx-auto max-w-[400px] px-[10px] pt-[20px] pb-[100px]" ulClasses="" insideDivClasses="px-[15px] py-[5px] rounded-[3px] mt-[5px] cursor-pointer border-[1px] border-green-400" hClasses="text-[16px] font-[500] tracking-[0.8px] text-[#ffffff]" pClasses="text-[14px] font-[400] tracking-[0.8px] text-[#ffffff]"/>   
        </div>
    )
}

export default Records;