
import {DateUtil} from "base"
import { UserOutlined } from "@ant-design/icons";
import useAppContext from "@/provider/provider.app";
import { Avatar } from "./avatar";

/**
 * 个人中心 头像区域
 * @returns 
 */
const MyCenterAvatar = ()=>{

   const {userInfo} = useAppContext()


    return <div className="m-6 flex flex-row gap-5">
    {/* <Avatar
      // size={{  sm: 12,md: 12,lg:12,xl:12}}
      // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      src={userInfo?.headImg}
      // icon={<UserOutlined />}
      style={{ border: "1px solid white" }}
    /> */}
    <Avatar src={userInfo?.headImg??""}/>

    <div className="flex flex-col justify-around text-weig">
      <p className="text-secondary7 font-semibold">{`${userInfo?userInfo.userRealName+"，"+DateUtil.getTimePeriod()+"好":""}`}</p>
      <div className="text-secondary8 bg-secondary1 rounded-lg text-center text-sm">
        实名认证用户
      </div>
    </div>
  </div>
}

export default MyCenterAvatar