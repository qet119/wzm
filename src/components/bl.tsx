"use client";


import { useEffect, useState } from "react";
import API from "@/nativ_interface/api";
import { ListScroll } from "./list.scroll";


const BL = ({status}:{status:string})=>{
    useEffect(()=>{
        API.setTitle(status)
    },[])

    return <div className="h-full flex flex-col bg-background">

        {/* <Item title="无犯罪记录证明" desc="开具单位: 江苏省公安厅" />
        <Item title="独生子女证明" desc="开具单位: 江苏省公安厅" /> */}
        <ListScroll status={status} />

    </div>
}

export default BL