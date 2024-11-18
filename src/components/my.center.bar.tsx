"use client";

import kzm_list from "@/actions/kzm.list";
import { WzmItem } from "@/entity/entity.wzm.item";
import useAppContext from "@/provider/provider.app";
import useRequestMethodContext from "@/provider/provider.fetch";
import { WzmPage } from "@/query/query.wzm.page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 个人中心 任务条
 * @returns
 */
const MyCenterBar = () => {
  const router = useRouter();

  const { userInfo } = useAppContext();
  const { idCardNo } = userInfo ?? {};
  const { actionWrap } = useRequestMethodContext();

  const [blCounts,setBlCounts] = useState<{clz:number,ybj:number,dcl:number}>()
  const onClick = () => {
    router.push("/wzm/bl");
  };

  useEffect(() => {

    async function fetch() {
      const counts ={
        clz:0,
        ybj:0,
        dcl:0
      }

      let pageQuery = {
        pageNo: 1,
        pageSize: 1,
        sfzhm: idCardNo,
        status: "处理中",
      };
      let result = await actionWrap<WzmPage<WzmItem[]>, WzmPage>(
        kzm_list,
        pageQuery
      );

      counts.clz = result.data?.count??0

      pageQuery.status = "已办结";

      result = await actionWrap<WzmPage<WzmItem[]>, WzmPage>(
        kzm_list,
        pageQuery
      );
      counts.ybj = result.data?.count??0

      pageQuery.status = "待处理";
      result = await actionWrap<WzmPage<WzmItem[]>, WzmPage>(
        kzm_list,
        pageQuery
      );
      counts.dcl = result.data?.count??0


      setBlCounts(counts)

    }

    fetch();
    // const pageQuery = { pageNo: pageNo.current, pageSize: 25, sfzhm: idCardNo, status };
    // const result = await actionWrap<WzmPage<WzmItem[]>, WzmPage>(
    //   kzm_list,
    //   pageQuery
    // );
  }, []);
  return (
    <div className="bg-[url('/img/grzxt.png')] bg-no-repeat w-full bg-cover flex flex-row justify-around items-center h-20 mt-10  text-secondary1">
      <Link
        href={"/wzm/bl?status=处理中"}
        className="no-underline text-secondary1"
      >
        <div className="flex flex-col items-center cursor-pointer gap-2">
          <span className="text-xl">{blCounts?.clz??0}</span>
          <span>办理中</span>
        </div>
      </Link>
      <Link
        href={"/wzm/bl?status=已办结"}
        className="no-underline text-secondary1 "
      >
        <div
          className="flex flex-col items-center  cursor-pointer gap-2"
          onClick={onClick}
        >
          <span className="text-xl">{blCounts?.ybj??0}</span>
          <span>已办理</span>
        </div>
      </Link>

      <Link
        href={"/wzm/bl?status=待处理"}
        className="no-underline text-secondary1 "
      >
        <div
          className="flex flex-col items-center cursor-pointer gap-2"
          onClick={onClick}
        >
          <span className="text-xl">{blCounts?.dcl??0}</span>
          <span>已退回</span>
        </div>
      </Link>
    </div>
  );
};

export default MyCenterBar;
