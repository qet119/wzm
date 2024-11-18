import BL from "@/components/bl";
import { NextApiRequest } from "next";

/**
 * 个人中心的办理中，已办理，已退回
 */
export default async function page ({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }){

    const {status} = (await searchParams)

    return <BL  status={status as string}/>
}