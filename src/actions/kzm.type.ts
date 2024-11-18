'use server'

import { get } from "@/api/fetch"
import { Wzm } from "@/entity/entity.wzm"
import { ResultHelper } from "base"

//申请页面  可开具证明列表接口
const kzm_type = async (idCard?:string)=>{

    console.log('idCard',idCard)

    const response =  await get(`/websites/login/jszwfw/api/getDzzmList.jsp`,{},idCard)
       
    if(response.ok){
        const reulst = await response.json()
        if(reulst['success']){
            console.log('reulst1',reulst)
            return ResultHelper.success<[]>(reulst['msg'],reulst['data']);
        }else{
            return ResultHelper.error<[]>(reulst['msg']);
        }
    }else{
        return ResultHelper.error<[]>('可开具证明列表获取失败');
    }

}

export default kzm_type