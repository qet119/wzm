import { Result } from "@/entity/entity.result";
import { UserInfo } from "@/entity/entity.userinfo";

interface JSAPIError extends Error{
  code:string;
  message:string;
}
class Native_API {
  key = {
    app_key: "wzmcscsgn",
    version: "1.0.0",
  };

  private constructor() {}

  static api: Native_API;

  static instance() {
    if (Native_API.api) {
      return Native_API.api;
    } else {
      return new Native_API();
    }
  }

  private async promise<T>(apiName: string, obj: object): Promise<Result<T>> {
    return  new Promise<Result<T>>((resolve, reject) => {

      if (!window?.dsBridge ) {
        reject({ code: "1111", message: "dsBridge is undefined" } as JSAPIError);
        return;
      }
        // 调用原生方法
        window?.dsBridge?.call(apiName, JSON.stringify(obj), (response) => {
          try {
            const result = JSON.parse(response) as Result<T>;
            resolve(result);
          } catch {
            reject({ code: "1112", message: "JSON parsing error" } as JSAPIError);
          }
        });
    }).catch((e:JSAPIError)=>{
      return { code: e.code, msg: e.message}
    });
  }

  async setTitle(title: string) {
    const data = {
      title: title,
      bgColor: "#321232",
      textColor: "#321232",
      btnRightText: "右侧按钮文字",
      btnRightImg: "右侧按钮图片url",
      isHideRight: true,
    };

    // console.log('window.dsBridge',window.dsBridge)

    const obj = {
      ...this.key,
      data,
    };

    return await this.promise("UIApi.setTitle", obj);
  }
  async close() {

    const obj = {
      ...this.key,
    };

    return await this.promise("UIApi.closeWebview", obj);
  }

  async alert(content:string,title: string='提示') {
    const data = {
      title,
      content
    };

    // console.log('window.dsBridge',window.dsBridge)

    const obj = {
      ...this.key,
      data,
    };

    return await this.promise("UIApi.alert", obj);
  }


  async userInfo() {
    const data = {};

    // console.log('window.dsBridge',window.dsBridge)

    const obj = {
      ...this.key,
      data,
    };
    return await this.promise<UserInfo>("BusinessApi.getUserInfo", obj);
  }
  async chooseImage() {
    const data = {};

    // console.log('window.dsBridge',window.dsBridge)

    const obj = {
      ...this.key,
      data,
    };
    return await this.promise<any>("FunctionApi.chooseImage", obj);
  }
  async toast(tips:string){
    

    const obj = {
      ...this.key,
      data:{
        tips
      },
    };
    return await this.promise<any>("UIApi.toast", obj);
  }
  async setOnBackClickListener(){
    
    const obj = {
      ...this.key,
      data:{
        "isNeedBackClickListener":true
      },
    };
    // alert(JSON.stringify(obj))
    return await this.promise<any>("UIApi.setOnBackClickListener", obj);
  }

  async goBack(){
    
    const obj = {
      ...this.key,
    };
    // alert(JSON.stringify(obj))
    return await this.promise<any>("UIApi.goBack", obj);
  }

  

}

export default Native_API.instance();
