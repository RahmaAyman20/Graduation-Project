import { useState } from "react";
import {ProductContext} from "./ProductContext";

export function ProductProvider(props) {
  let [id, setid] = useState(5);
  const IdHandler = (id1) => {
    setid(id1);
  };
  let myValues = {
    id,
    IdHandler,
  };
  return (
    <ProductContext.Provider value={myValues}>
     {props.children}
    </ProductContext.Provider>
  );
}

