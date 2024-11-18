"use client";


import { useEffect } from "react";
import WdzmItem from "./form.item";
import API from "@/nativ_interface/api";


const WDZM = ()=>{

    useEffect(()=>{
        API.setTitle('我的证明')
    },[])
    return <div className="flex flex-col bg-background h-full p-6 gap-6">
    
    <WdzmItem title={'中华人民共和国居民身份证'} desc={'开具单位: 江苏省公安厅'} />

    <WdzmItem title={'中华人民共和国机动车驾驶证'} desc={'开具单位: 江苏省公安厅'} />

    <WdzmItem title={'居民户口簿'} desc={'开具单位: 江苏省公安厅'} />

    <WdzmItem title={'江苏省电动自行车驾驶证'} desc={'开具单位: 江苏省公安厅'} />

    </div>
}

export default WDZM;