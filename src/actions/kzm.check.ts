'use server'

import { post ,get} from "@/api/fetch"
import { Wzm } from "@/entity/entity.wzm"
import { ResultHelper } from "base"

//申请页面的是否重复开具的校验接口

const kzm_check = async (data:any,idCard?:string)=>{

    const {sfzhm,zmId} = data
    console.log('idCard',idCard)

    const response =  await get(`/websites/login/jszwfw/api/check.jsp`,{sfzhm,zmId})

    if(response.ok){
        const reulst = await response.json()
        console.log('kzm_check', reulst)

        if(reulst['success']&&!reulst['isExist']){
            return ResultHelper.success("",{isExist:false});
        }else{
            return ResultHelper.error("此证明不能重复开具",{isExist:true});
        }
    }else{
        return ResultHelper.error('证明重复检验失败',{isExist:true});
    }

}

export default kzm_check