import { RightOutlined } from "@ant-design/icons";
import { HtmlHTMLAttributes } from "react";

interface MyCenterItemProp extends HtmlHTMLAttributes<object>{
  img_url: string;
  title: string;
}

/**
 * 个人中心 内容区域的item
 * @param props 
 * @returns 
 */
const MyCenterItem = (props: MyCenterItemProp) => {
  const { img_url, title,onClick ,className} = props;

  return (
    <div className={"flex flex-row justify-around cursor-pointer "+className} onClick={onClick}>
      <div className="flex-1 flex flex-row items-center flex-nowrap gap-5">
        <img src={img_url}  className={`scale-75 ${title!=='我的证照'?'pr-2':'pr-0'}`}/>
        <span className="text-lg text-secondary7">{title}</span>
      </div>
      <RightOutlined style={{color:'black'}}  />
    </div>
  );
};

export default MyCenterItem;
