
export  interface WzmPage<T=any> {
    count?:number;
    pageNo?:number;
    pageSize?:number;
    sfzhm?:string;
    status?:string;
    data?:T
}