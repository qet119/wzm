"use client";

import useAppContext from "@/provider/provider.app";
import Home from "./home";
import MyCenter from "./my_center";
import Tabs from "./tabs";
import { ReactElement, useEffect, useState } from "react";
import { TabType } from "./tab";
import API from "@/nativ_interface/api";
import { useDialogContext } from "ui";

const App = () => {
  const [content, setContet] = useState<ReactElement>(<Home></Home>);
  const [tabType, setTabType] = useState<TabType>();

  const { currentTab, setCurrentTab } = useAppContext();
  const { showDialog } =useDialogContext()

  useEffect(() => {
    if (currentTab === TabType.HOME) {
      setContet(<Home></Home>);
      setTabType(TabType.HOME);
       API.setTitle("首页");

    } else if (currentTab === TabType.CARD) {
      setTabType(TabType.CARD);
    } else if (currentTab === TabType.MY) {
      setTabType(TabType.MY);
      setContet(<MyCenter></MyCenter>);
      API.setTitle("个人中心");

    }

  }, []);

  const onChecked = async (tabType: TabType) => {
    if (tabType === TabType.HOME) {
      setCurrentTab(TabType.HOME);
      setContet(<Home></Home>);
      await API.setTitle("首页");
    } else if (tabType === TabType.CARD) {
      setCurrentTab(TabType.CARD);
      API.setTitle("我的卡包");
    }
    if (tabType === TabType.MY) {
      setCurrentTab(TabType.MY);
      setContet(<MyCenter></MyCenter>);
      API.setTitle("个人中心");
    }
  };

  return (
    // container mx-auto
    <div className="flex flex-col  bg-background p-0 m-0 h-full w-0d container mx-auto">
      <div className="flex-1">{content}</div>
      <Tabs checkedtabType={tabType} onchecked={onChecked} />
    </div>
  );
};

export default App;
