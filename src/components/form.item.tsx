
import { HTMLAttributes } from "react"


interface ItemProps  extends HTMLAttributes<object>{
    title:string;
    desc:string;

}
const Item = (props:ItemProps)=>{

    const {title,desc} = props
    return <div className="flex flex-col rounded-2xl gap-5 p-7 pl-7 bg-secondary1" style={{borderLeftWidth:"12px",borderLeftColor:"#437EC7",borderLeftStyle:"solid"}}>
        <div className="text-black text-xl font-semibold">{title}</div>
        <div className="text-gray-500 text-md">{desc}</div>

    </div>
}


export default Item