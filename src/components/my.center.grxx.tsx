"use client";
import { Divider, Form } from "antd";
import KzmInput from "./kzm.input";
import { useEffect } from "react";
import API from "../nativ_interface/api";
import useAppContext from "@/provider/provider.app";
export const Grxx = () => {
  const {userInfo} =   useAppContext()
  useEffect(() => {
    API.setTitle("个人信息");
  }, []);
  return (
    <Form className="bg-white h-full">
      <KzmInput label="姓名" name="xm" value={userInfo?.userRealName} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="身份证号" name="sfz" value={userInfo?.idCardNo} disabled />

      <div className="pl-5 pr-5 relative bg-transparent">
        <Divider className="m-0" />
      </div>

      <KzmInput label="联系方式" name="lxfs" value={userInfo?.phoneNo} disabled />

    </Form>
  );
};
