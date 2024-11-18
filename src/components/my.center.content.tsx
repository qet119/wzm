import { HtmlHTMLAttributes } from "react";
import { Divider } from "antd";
import MyCenterItem from "./my.center.item";
import { useRouter } from "next/navigation";

/**
 * 个人中心 内容区域
 * @param props 
 * @returns 
 */
const MyCenterContent = (props: HtmlHTMLAttributes<object>) => {

  const router =  useRouter()
  return (
    <div
      className={`w-full rounded-xl ${props.className}`}
      style={{
        boxShadow:
          "0px 0px 6px 2px rgb(0 0 0 / 0.04), 0px 0px 4px 1px rgb(0 0 0 / 0.04)",
      }}
    >
      <div className="p-4 flex flex-col gap-x-5">
        

        <MyCenterItem img_url="/img/grxx.png" title="个人信息"  onClick={()=>{
            router.push('/wzm/grxx')
        }}/>

        <Divider />

        <MyCenterItem img_url="/img/wdzz.png" title="我的证照" className="hidden"/>

        <Divider className="hidden"/>
        <MyCenterItem img_url="/img/wdzm.png" title="我的证明" onClick={()=>{
            // router.push('/wzm/wdzm')
            router.push("/wzm/bl?status=已办结");
        }}/>


      </div>
    </div>
  );
};

export default MyCenterContent;
