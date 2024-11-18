/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        _dsf: { [key: string]: any };
        _dsaf: { [key: string]: any };
        dscb: number;
        dsBridge: typeof bridge;
        _dsbridge?: any;
        _dswk?: any;
        _dsInit?: boolean;
        _handleMessageFromNative: (info: any) => void;
        [key: string]: any;
    }
}

interface Bridge {
    default: this;
    call: (method: string, args?: any, cb?: (data: any) => void) => any;
    register: (name: string, fun: Function | { [key: boolean]: Function }, asyn?: boolean) => void;
    registerAsyn: (name: string, fun: Function) => void;
    hasNativeMethod: (name: string, type?: string) => boolean;
    disableJavascriptDialogBlock: (disable: boolean) => void;
}

declare const bridge: Bridge;

export default bridge;