"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const textShadow = { textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" };

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-center 
      relative
      bg-[url('/img/banner.png')] bg-no-repeat bg-top bg-background
      bg-[length:100%_30%] 
      lg:bg-[length:100%_50%] xl:bg-[length:100%_60%] md:bg-contain sm:bg-[length:100%_30%] 
    h-full"
    >
      <div className="absolute left-5 top-10 text-secondary1 ">
        <p className="text-3xl" style={textShadow}>
          欢迎使用
        </p>
        <p className="text-xl" style={textShadow}>
          灌南县电子证明平台
        </p>
      </div>

      <div className="justify-center content-center">
        <div className="flex flex-col gap-8 p-5 mt-14 lg:mt-96 md:mt-96">
          <Link
            href={{
              pathname: "/wzm/bl",
              query: { status: "已办结" },
            }}
            className="no-underline"
          >
            <div
              className="flex flex-row  justify-center items-center cursor-pointer 
        bg-[url('/img/wyyzz.png')] bg-no-repeat  bg-red h-28 bg-[length:100%_100%] lg:h-52
        "
              // onClick={() => {
              //   router.push("/wzm/bl?status=已办结");
              // }}
            >
              {/* lg:bg-[length:100%_100%] xl:bg-[length:100%_100%] md:bg-[length:100%_100%] sm:bg-[length:100%_100%]  */}
              <div className=" text-secondary7 flex flex-col pt-4">
                <p className="text-xl font-bold text-secondary11">我要用证照</p>
                <p className="text-secondary5">线上证件夹</p>
              </div>
            </div>
          </Link>

          <Link href="/wzm/kzm" className="no-underline">
            <div
              /*  onClick={() => {
              router.push("/wzm/kzm");
            }} */
              className="flex flex-row  justify-center items-center cursor-pointer 
        bg-[url('/img/kzm.png')] bg-no-repeat  bg-red h-28 bg-[length:100%_100%] lg:h-52
        "
            >
              {/* lg:bg-[length:100%_100%] xl:bg-[length:100%_100%] md:bg-[length:100%_100%] sm:bg-[length:100%_100%]  */}
              <div className=" text-secondary7 flex flex-col pt-4">
                <p className="text-xl font-bold text-secondary11">我要开证明</p>
                <p className="text-secondary5">便捷证明</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
