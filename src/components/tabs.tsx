"use client";

import { useEffect, useState } from "react";
import Tab, { TabProps, TabType } from "./tab";
import API from "@/nativ_interface/api";

const mData = [
  {
    checkimg: "/img/home_check.png",
    uncheckimg: "/img/home_uncheck.png",
    title: "首页",
    checked: true,
    tabType: TabType.HOME,
  },
  {
    checkimg: "/img/card_check.png",
    uncheckimg: "/img/card_uncheck.png",
    title: "我的卡包",
    tabType: TabType.CARD,
  },
  {
    checkimg: "/img/my_check.png",
    uncheckimg: "/img/my_uncheck.png",
    title: "个人中心",
    tabType: TabType.MY,
  },
];
const Tabs = ({
  onchecked,
  checkedtabType,
}: {
  onchecked: (tabType: TabType) => void;
  checkedtabType?: TabType;
}) => {
  useEffect(() => {
    if (checkedtabType) {
      update(checkedtabType);
    }
  }, [checkedtabType]);

  const [data, setData] = useState<TabProps[]>(mData);

  const update = (tabType: TabType) => {
    setData((datas) => {
      const newData = datas.map((data) => {
        if (data.tabType === tabType) {
          data.checked = true;
        } else {
          data.checked = false;
        }
        return data;
      });
      return [...newData];
    });
  };
  return (
    <div className="flex flex-row justify-around p-3 bg-white rounded-t-2xl shadow-2xl shadow-black">
      {data.map((item, index) => {
        return (
          <Tab
            key={index}
            title={item.title}
            checkimg={item.checkimg}
            uncheckimg={item.uncheckimg}
            checked={item.checked}
            tabType={item.tabType}
            onClick={({tabType}) => {

              if(tabType===TabType.CARD){
                API.alert('该功能正在开发中，敬请期待！')
                return;
              }

              onchecked(tabType!);
              update(tabType!);
            }}
          ></Tab>
        );
      })}
    </div>
  );
};

export default Tabs;
