export interface BLDetailEntity {
    id: string;
    zmlid: string;
    zmmc: string;
    sqrxm: string;
    xb: string;
    sfzhm: string;
    lxfs: string;
    zmnr: string;
    sxcl: string;
    date: string;
    lcInfo: StepInfo[];
  }
  
 export interface StepInfo {
    orderNo: string;
    id: string;
    workEffortName: string;
    route: string;
    endTime: string;
    comments: string;
  }