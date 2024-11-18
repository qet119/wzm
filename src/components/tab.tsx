"use client";

export enum TabType {
  HOME = "HOME",
  CARD = "CARD",
  MY = "MY",
}

export interface TabProps {
  title: string;
  checkimg: string;
  uncheckimg: string;
  checked?: boolean;
  tabType?:TabType;
  onClick?: (tabP: TabProps) => void;
}

const Tab = (props: TabProps) => {
  const { title, checkimg, uncheckimg, checked = false, onClick } = props;
  return (
    <div
      className="flex flex-col justify-center gap-1 cursor-pointer"
      onClick={() => {
        if(onClick){
          onClick(props);
        }
      }}
    >
      <div className="flex flex-row justify-center">
        <img src={checked ? checkimg : uncheckimg}  className="h-7 w-7" />
      </div>
      <div className={checked ? 'text-secondary8' :'text-secondary9'}>
        <span className="text-base md:text-base lg:text-lg">
        {title}
        </span>
      </div>
    </div>
  );
};

export default Tab;
