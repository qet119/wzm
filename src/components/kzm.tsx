"use client";

import React, { LegacyRef, useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Radio,
  RadioChangeEvent,
} from "antd";
import KzmInput from "./kzm.input";
import API from "@/nativ_interface/api";
import kzm_save from "@/actions/kzm.save";
import { Wzm } from "@/entity/entity.wzm";
import useAppContext from "@/provider/provider.app";
import { UploadItem, UploadRefInter } from "./form.item.upload";
import useRequestMethodContext from "@/provider/provider.fetch";
import kzm_type from "@/actions/kzm.type";
import { State } from "base";
import { useRouter } from "next/navigation";
import kzm_check from "@/actions/kzm.check";

const { Text } = Typography;

const titleCSS =
  "pl-2 border-l-4 border-cyan-600 border-solid border-t-0 border-b-0 border-r-0 text-lg font-semibold m-6 p-0 mb-4 mt-4 block";
/**
 *
 * 开证明表单
 */
const KZMForm = () => {
  const { userInfo } = useAppContext();
  const { actionWrap } = useRequestMethodContext();
  const [form] = Form.useForm();
  const uploadRef = useRef<UploadRefInter>();
  const [zmType, setZmType] = useState<[]>([]);
  const router = useRouter();

  useEffect(() => {
    API.setTitle("证明申请");

    async function fetch1() {

      //获取可开具类型
      const result = await kzm_type();
      const arr = result.data?.map((type: any) => {
        return {
          label: type["name"],
          value: type["id"],
          style: { fontSize: "1.1rem" },
          material: type["material"],
        };
      }) as [];

      setZmType(arr);
    }
    fetch1();
  }, []);
  const handleSubmit = async (values: Wzm & { zmId: string }) => {
    if (uploadRef?.current?.fileList().length !== 2) {
      API.toast("请上传身份证");
      return;
    }
    values["attachs"] = uploadRef?.current?.fileList().map((path) => {
      console.log(path);
      return path;
    });

    //重复检查
    const kzm_checkParams = { sfzhm: userInfo?.idCardNo, zmId: values["zmId"] };
    const kzm_check_result = await actionWrap(kzm_check, kzm_checkParams);
    console.log(kzm_check_result);
    if (
      kzm_check_result.state === State.SUCCESS &&
      kzm_check_result?.data?.isExist
    ) {
      API.alert("不能开具重复的证明");
      return;
    }

    const result = await actionWrap(kzm_save, values);
    console.log(result);
    if (result.state === State.SUCCESS) {
      router.push("/wzm/home");
      API.toast("保存成功");
    } else {
      API.alert("保存失败");
    }
  };

  return (
    <div
      className="flex flex-col bg-secondary12 select-none
    bg-[length:100%_30%] lg:bg-[length:100%_50%] xl:bg-[length:100%_60%] md:bg-contain sm:bg-[length:100%_30%] 
  h-screen w-screen"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="pb-10 bg-secondary12"
      >
        <Text className={titleCSS}>证明信息</Text>

        {/* <KzmInput label="申请证明名称"  name="zmmc" /> */}

        <Form.Item
          name={"zmId"}
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-end text-red-500 p-1">
                  该项为必选项
                </div>
              ),
            },
          ]}
        >
          <Radio.Group
            className="text-3xl m-0 border-none  bg-secondary1 pl-4 pb-3 pt-3 text-secondary7 "
            options={zmType}
            size="large"
            block
            onChange={(e: RadioChangeEvent) => {
              const type = zmType.find(
                (type) => type["value"] === e.target.value
              );
              if (type) {
                form.setFieldsValue({
                  sxcl: type["material"],
                });
              }
              // console.log(type)
            }}
          ></Radio.Group>
        </Form.Item>

        <div className="pl-5 pr-5 relative bg-transparent hidden">
          <Divider className="m-0" />
        </div>

        {/*    <KzmInput
          label="开具单位"
          disabled
          name="kjdw"
          className="hidden"
          rules={[{ required: false }]}
        /> */}

        <Text className={titleCSS}>申请信息</Text>

        <KzmInput label="申请人姓名" name="sqrxm" />

        <div className="pl-5 pr-5 relative bg-transparent">
          <Divider className="m-0" />
        </div>

        {/* <KzmInput label="性别" name="xb" /> */}

        <Form.Item
          name={"xb"}
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-end text-red-500 p-1">
                  该项为必选项
                </div>
              ),
            },
          ]}
        >
          <Radio.Group
            className="text-xl m-0 border-none  bg-secondary1 pl-7 pb-3 pt-3 text-secondary7 w-full flex"
            size="large"
            block
          >
            <span className="text-lg">性别</span>
            <div className="flex flexRow flex-nowrap grow justify-center">
              <Radio value={"男"} className="text-lg">
                男
              </Radio>
              <Radio value={"女"} className="text-lg">
                女
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        <div className="pl-5 pr-5 relative bg-transparent">
          <Divider className="m-0" />
        </div>

        <KzmInput
          label="身份证号码"
          name={"sfzhm"}
          value={userInfo?.idCardNo}
          inputMode="numeric"
        />

        <div className="pl-5 pr-5 relative bg-transparent">
          <Divider className="m-0" />
        </div>

        <KzmInput
          label="联系电话"
          name={"lxfs"}
          value={userInfo?.phoneNo}
          inputMode="numeric"
        />

        <div className="pl-5 pr-5 relative bg-transparent">
          <Divider className="m-0" />
        </div>

        <Form.Item
          name="reason"
          className="m-0 border-none"
          rules={[
            {
              required: false,
              message: (
                <div className="flex justify-end text-red-500 p-1">
                  该项为必选项
                </div>
              ),
            },
          ]}
        >
          <Input
            className="flex flex-col h-32 justify-between pl-4 pt-2 pb-2 m-0 border-none"
            prefix={
              <div className="text-lg absolute top-2 text-secondary7">
                {"申请理由"}
              </div>
            }
            size="large"
            maxLength={500}
            placeholder="请输入申请理由"
            showCount={{
              formatter: ({ count, maxLength }) => (
                <span className="text-secondary8 absolute right-2 top-2">
                  {count} / {maxLength}
                </span>
              ),
            }}
          />
        </Form.Item>

        <Text className={titleCSS}>所需材料</Text>

        <KzmInput disabled label="所需材料" name={"sxcl"} />

        <div className="pl-5 pr-5 relative bg-transparent">
          <Divider className="m-0" />
        </div>

        <UploadItem ref={uploadRef as LegacyRef<UploadRefInter>} />

        <div className="p-2 bg-white text-[#0000FF]">
          温馨提醒：网上申请证明开具，其办理时间限定于每个工作日（周一至周五，法定节假日除外）
        </div>
        <Form.Item>
          <div className="flex flex-row justify-center items-center boreder-0 flex-nowrap  pl-4 pr-4 mt-10 h-12">
            <Button
              type="default"
              style={{ marginRight: "10px" }}
              className="bg-[#80B336] text-secondary1 flex-1 h-full text-xl"
              onClick={() => {
                history.back();
                form.resetFields();
                uploadRef?.current?.reset();
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#1E92FC] text-secondary1 flex-1 h-full text-xl"
            >
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default KZMForm;
