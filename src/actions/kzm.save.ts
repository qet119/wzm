'use server'

import { post ,get} from "@/api/fetch"
import { Wzm } from "@/entity/entity.wzm"
import { ResultHelper } from "base"

//申请页面上报接口
const kzm_save = async (wzm:Wzm,idCard?:string)=>{

    console.log('idCard',idCard)

    const response =  await get(`/websites/login/jszwfw/api/save.jsp`,wzm)

    if(response.ok){
        const reulst = await response.json()
        console.log('kzm_save', reulst)

        if(reulst['success']){
            console.log('reulst1',reulst)
            return ResultHelper.success(reulst['msg']);
        }else{
            return ResultHelper.error(reulst['msg']);
        }
    }else{
        return ResultHelper.error('保存失败');
    }

}

export default kzm_save