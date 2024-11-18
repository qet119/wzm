import {
  Form,
  UploadFile,
  UploadProps,
  GetProp,
} from "antd";
import { useState } from "react";
import API from "@/nativ_interface/api";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { DialogComponent, useDialogContext } from "ui";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const UploadItem = () => {
  const [images, setImages] = useState<string[]>([]);

  const { showDialog, hideDialog } = useDialogContext();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (path: string) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://117.60.146.186:88/websites/login/jszwfw/api/save.jsp", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        API.toast("上传成功");
      })
      .catch(() => {
        API.toast("上传失败");
      })
      .finally(() => {
        setUploading(false);
      });
  };

 return <Form.Item
    label={
      <div
        className="bg-secondary1 flex flex-row justify-around w-dvw
             text-secondary5 text-sm select-none"
      >
        <span className="flex-1">上传身份证</span>
        <span className="flex-auto justify-end flex pr-8">
          (申请人需要提供身份证正反两面)
        </span>
      </div>
    }
    name="idUpload"
    className="flex flex-col bg-secondary1 m-0 border-none pt-4 pb-6  pl-6"
  >
    {/* 上传附件按钮，图片1,图片2 */}
    <div className="flex flex-row gap-2">
      <div
        className="border-1 border-secondary3 bg-secondary1 border-dashed w-24 h-24 
          flex flex-col justify-end items-center text-secondary8 text-lg pb-2 select-none cursor-pointer"
        onClick={async () => {
          if (images.length === 2) {
            API.toast("最多只能上传两张图片");
            return;
          }
          const img_base64 = await API.chooseImage();

          handleUpload(img_base64.data.path);

          setImages((imgs) => {
            if (img_base64.data && img_base64.data["imageBase64"]) {
              imgs.push(
                "data:image/jpeg;base64," + img_base64.data["imageBase64"]
              );
            }
            return [...imgs];
          });
        }}
      >
        <UploadOutlined className="text-5xl text-secondary4" />
        上传附件
      </div>

      {images.map((base64, index) => {
        return (
          <span className="relative">
            <img src={base64} className="w-24 h-24" />
            <CloseCircleOutlined
              className="absolute -bottom-2 -right-2  text-red-600 text-2xl bg-white rounded-xl"
              onClick={() => {
                const imgIndex = index;
                showDialog(DialogComponent, {
                  title: "提示",
                  children: "是否确认删除?",
                  width: "65%",
                  closable: false,
                  cancelText: "取消",
                  okText: "确定",
                  onCancel: () => {
                    hideDialog();
                  },
                  onOk: () => {
                    setImages((imgs) => {
                      return imgs.filter(
                        (exisImg, filterIndex) => imgIndex !== filterIndex
                      );
                    });
                    hideDialog();
                  },
                });
              }}
            />
          </span>
        );
      })}
    </div>
  </Form.Item>;
};
