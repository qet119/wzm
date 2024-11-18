"use client";
import { Divider, Form, Timeline, Typography } from "antd";
import KzmInput from "./kzm.input";
import { useEffect, useState } from "react";
import API from "../nativ_interface/api";
import useAppContext from "@/provider/provider.app";
import { BLDetailEntity, StepInfo } from "@/entity/entity.bl.detail";
const { Text } = Typography;

export const BlDetail = ({ detail }: { detail: BLDetailEntity }) => {
  const { userInfo } = useAppContext();
  const [lc,setLc] = useState(()=>{

    return detail.lcInfo.map((info)=>{
      return {
        children: <div className="text-xl">{`${info.workEffortName}  ${info.endTime}`}</div>
      }
    })
  })
  useEffect(() => {
    API.setTitle("证明详情");
  }, []);
  return (
    <Form className="bg-white h-full">
      <KzmInput label="证明名称" name="zmmc" value={detail.zmmc} disabled />
      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>
      <KzmInput label="申请人姓名" name="sqrxm" value={detail.sqrxm} disabled />
      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>
      <KzmInput label="性别" name="xb" value={detail.xb} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="身份证号" name="sfzhm" value={detail.sfzhm} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="联系方式" name="lxfs" value={detail.lxfs} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="证明内容" name="zmnr" value={detail.zmnr} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="时间" name="date" value={detail.date} disabled />

      <Text className="pl-2 border-l-4 border-cyan-600 border-solid border-t-0 border-b-0 border-r-0 text-lg font-semibold m-6 p-0 mb-4 mt-4 block">
        办理流程
      </Text>

      <Timeline
        className="p-6"
        items={lc}
      />
    </Form>
  );
};
