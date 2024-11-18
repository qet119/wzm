"use client";

import kzm_list from "@/actions/kzm.list";
import useAppContext from "@/provider/provider.app";
import useRequestMethodContext from "@/provider/provider.fetch";
import { WzmPage } from "@/query/query.wzm.page";
import { Divider, List, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { State } from "base";
import { WzmItem } from "@/entity/entity.wzm.item";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ListScroll = ({ status }: { status: string }) => {
  const [page, setPage] = useState<WzmPage<WzmItem[]> | undefined>();
  const pageNo = useRef<number>(0);
  const { actionWrap } = useRequestMethodContext();
  const { userInfo } = useAppContext();
  const { idCardNo } = userInfo ?? {};
  // const router =useRouter()
  const loadMoreData = async () => {
    console.log("loadMoreDataloadMoreData");
    pageNo.current++;
    const pageQuery = {
      pageNo: pageNo.current,
      pageSize: 25,
      sfzhm: idCardNo,
      status,
    };
    const result = await actionWrap<WzmPage<WzmItem[]>, WzmPage>(
      kzm_list,
      pageQuery
    );
    if (result.state === State.SUCCESS) {
      console.log("wzmPage", result.data);
      setPage(result.data);
    }
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      className="h-full"
      style={{
        overflow: "auto",
        // height:'200px',
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={page?.data?.length ?? 0}
        next={loadMoreData}
        hasMore={(page?.data?.length ?? 0) < (page?.count ?? 0)}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={page?.data}
          renderItem={(item) => (
            <Link
            href={{ pathname: "/wzm/bl/detail", query: { id: item.id } }}
          >
            <List.Item key={item.id}>
              {/* <List.Item.Meta title={item.date} /> */}
             
                <div
                  className="flex flex-row w-full items-center p-2" /* onClick={()=>{
                router.push('/wzm/bl/detail?id='+item.id)
              }} */
                >
                  <div className="text-xl flex flex-row justify-start grow ">
                    {item.zmmc ? item.zmmc : "暂无证明名称"}
                  </div>
                  <div className="flex flex-row justify-end">
                    {item?.date ?? ""}
                  </div>
                </div>
            </List.Item>
            </Link>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
