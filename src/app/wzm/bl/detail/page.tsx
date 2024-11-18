import { get } from "@/api/fetch";
import BL from "@/components/bl";
import { BlDetail } from "@/components/bl.detail";
import {  BLDetailEntity} from "@/entity/entity.bl.detail";
import { NextApiRequest } from "next";

/**
 * 已开具证明详情页
 */
export default async function page ({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }){

    const {id} = (await searchParams)

    const response =  await get(`/websites/login/jszwfw/api/getDzzmkjView.jsp`,{id})

    const result  = await response.json()

    if(result['success']){
      
      return <BlDetail detail={result as BLDetailEntity}></BlDetail>

    }else{

    }
}