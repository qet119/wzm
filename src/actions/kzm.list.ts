'use server'

import { get } from "@/api/fetch"
import { WzmPage } from "@/query/query.wzm.page"
import { ResultHelper } from "base"

//已开具证明列表接口

const kzm_list= async (wzmPage:WzmPage,idCard?:string)=>{

    const {pageNo,pageSize,sfzhm,status} = wzmPage
    console.log('idCard',idCard)
    console.log('pageNo',pageNo)
    console.log('pageSize',pageSize)

    const response =  await get(`/websites/login/jszwfw/api/getDzzmkjList.jsp`,wzmPage,idCard)
       
    if(response.ok){
        const reulst = await response.json()
        if(reulst['success']){
            console.log('kzm_list',reulst)
            const page:WzmPage = {data:reulst['data'],count:reulst['count'],status}
            return ResultHelper.success<WzmPage>(reulst['msg'],page);
        }else{
            return ResultHelper.error<WzmPage>(reulst['msg']);
        }
    }else{
        return ResultHelper.error<WzmPage>('数据查询异常');
    }

}

export default kzm_list