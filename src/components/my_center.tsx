import MyCenterAvatar from "./my.center.avatar";
import MyCenterBar from "./my.center.bar";
import MyCenterContent from "./my.center.content";

/**
 * 个人中心
 * @returns 
 */
const MyCenter = () => {
  return (
    <div className="bg-[url('/img/my_center.png')] bg-no-repeat h-full w-full p-4 bg-cover sm:bg-cover md:bg-[length:100%_100%]">
      <MyCenterAvatar />

      <MyCenterBar />

        <MyCenterContent className="mt-8"/>

    </div>
  );
};

export default MyCenter;
