import { Form, UploadFile, UploadProps, GetProp, Upload } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import API from "@/nativ_interface/api";
import { UploadOutlined } from "@ant-design/icons";
import { useDialogContext } from "ui";
import useAppContext from "@/provider/provider.app";
import { Url } from "@/gloable";
import { encrypt_aes, encrypt_aes_to_hex } from "@/lib/crypto";

/*     const handleUpload = (event: UploadRequestOption) => {
      const formData = new FormData();
      if (event.data) {
        Object.keys(event.data).forEach((key) => {
          formData.append(key, event?.data[key]);
        });
      }

      setUploading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${Url.upload}`, {
        method: "POST",
        headers: {
          secret: encrypt_aes(
            userInfo?.idCardNo!,
            process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
          ),
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          alert(JSON.stringify(result));
          if (result && result["success"]) {
            API.toast("上传成功");
          }
        })
        .catch((err) => {
          API.toast("上传失败" + JSON.stringify(err));
        })
        .finally(() => {
          setUploading(false);
        });
    }; */


type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface MyUploadProps {
  test?: string;
}

export interface UploadRefInter {
  fileList: () => string[];
  reset: () => void;

}
export const UploadItem = forwardRef(
  ({ test }: MyUploadProps, ref: ForwardedRef<UploadRefInter>) => {
    const { userInfo } = useAppContext();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const imagesRef = useRef<string[]>([]);
    // const { showDialog, hideDialog } = useDialogContext();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          fileList: () => {
            return imagesRef.current
          },
          reset:()=>{
            imagesRef.current = []
            setFileList([])
          }
        };
      },
      []
    );


    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ file }) => {
      // if (file.status === "uploading") { }

      if (file.status === "error") {
        // imagesRef.current= []
        API.toast("上传失败");
      }

      if (file.status === "done") {
        try{
          const path  = file['response']['data']['src']
          file['url'] = process.env.NEXT_PUBLIC_API_HOST+path
          imagesRef.current.push(path)

          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList([...newFileList,file]);

          API.toast("上传成功");
        }catch(exception){
          API.toast("上传失败");

        } 
      }
    };
    const props: UploadProps = {
      name: 'file',
      action: `${process.env.NEXT_PUBLIC_API_HOST}${Url.upload}`,
     /*  headers: {
        secret: encrypt_aes(
          userInfo?.idCardNo!,
          process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
        ),
      }, */
      listType: "picture-card",
      onPreview: handlePreview,
      onChange: handleChange,
       accept:"image/*",
      multiple: false,
      method: "post",
      maxCount: 2,
      onRemove: (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      },
      beforeUpload: (file) => {
        if (fileList.length === 2) {
          API.toast("最多只能上传两张图片");
          return Upload.LIST_IGNORE;
        }

        const isPNG = file.type === "image/png";
        const isJpg = file.type === "image/jpg";
        const isJpeg = file.type === "image/jpeg";

        if (isPNG || isJpeg || isJpg) {
          setFileList([...fileList, file]);
          return true;
        } else {
          API.toast("不支持的图片格式");
          return Upload.LIST_IGNORE;
        }
      },
      fileList,
    };
//bg-secondary1 
    return (
      <Form.Item
        label={
          <div
            className="flex flex-row justify-around w-screen
             text-secondary5 text-sm select-none "
          >
            <div className="flex grow ">上传身份证</div>
            <div className="flex justify-end pr-8">
              (申请人需要提供身份证正反两面)
            </div>
          </div>
        }
        name="idUpload"
        className="flex flex-col bg-secondary1 m-0 border-none pt-4 pb-6  pl-4"
      >
        <div className="flex flex-row gap-2">
          <Upload {...props}>
            <div
              className="border-1 border-secondary3 bg-secondary1 border-dashed w-24 h-24 
          flex flex-col justify-end items-center text-secondary8 text-lg pb-2 select-none cursor-pointer"
            >
              <UploadOutlined className="text-5xl text-secondary4" />
              上传附件
            </div>
          </Upload>
        </div>
      </Form.Item>
    );
  }
);
