
export interface Result <T = void>{

    code:string;
    msg:string;
    data?:T
}