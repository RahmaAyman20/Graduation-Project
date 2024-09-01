import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
export default function Liked({key2,title,price,img}){
  const { IdHandler } = useContext(ProductContext);

return(
<>
<div className="row " style={{margin:"10px"}} key={key2}>
        <div className="col ">
                <img
                className="border rounded"
                  style={{width:"70px",height:"70px"}}
                  src={img}
                  alt="Card image cap"
                />
                
                <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                    <li className="fs-6" style={{textWrap:"nowrap",fontWeight:"bold"}}>{title}...</li>
                    <li className="text-muted">${price} </li>
                </ul>
                <NavLink
                  to="/ProductAnalysis"
                  style={{marginLeft:"160px"}}
                  className="view_details1"
                  type="button"
                  onClick={() => {
                    IdHandler(key2);
                  }}
                >
                  View details
                </NavLink>
              </div>
            </div>

</>);
}